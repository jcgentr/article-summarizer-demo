import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import config from "@/app/config";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");
  const endpointSecret = config.stripeWebhookSecret;

  let event;

  try {
    if (!signature || !endpointSecret) {
      return new NextResponse("Webhook signature or secret missing", {
        status: 400,
      });
    }

    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`⚠️ Webhook signature verification failed:`, error.message);
      return new NextResponse(`Webhook Error: ${error.message}`, {
        status: 400,
      });
    }
    return new NextResponse(`Webhook Error: Unknown error occurred`, {
      status: 400,
    });
  }

  const supabase = await createClient(true); // Use service role for webhook

  try {
    console.log(event.type);
    switch (event.type) {
      case "customer.subscription.created": {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        // Get customer email from Stripe
        const customer = (await stripe.customers.retrieve(
          customerId
        )) as Stripe.Customer;
        if (customer.deleted) {
          throw new Error(`Customer ${customerId} was deleted`);
        }

        // Get user by email from user_metadata
        const { data: userData, error: userError } = await supabase
          .from("user_metadata")
          .select("user_id")
          .eq("email", customer.email)
          .single();

        if (userError || !userData) {
          throw new Error(`No user found for email ${customer.email}`);
        }

        // Create initial user metadata with Stripe customer ID
        await supabase
          .from("user_metadata")
          .update({
            plan_type: "pro",
            stripe_customer_id: customerId,
            summaries_generated: 0,
            billing_cycle_start: new Date().toISOString(),
          })
          .eq("user_id", userData.user_id);

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        // Get user directly by Stripe customer ID
        const { data: userData, error: userError } = await supabase
          .from("user_metadata")
          .select("user_id, plan_type")
          .eq("stripe_customer_id", customerId)
          .single();

        if (userError || !userData) {
          throw new Error(`No user found for customer ${customerId}`);
        }

        // Only update if plan status actually changed
        const newPlanType = subscription.status === "active" ? "pro" : "free";
        if (newPlanType !== userData.plan_type) {
          await supabase
            .from("user_metadata")
            .update({
              plan_type: newPlanType,
              summaries_generated: 0,
              billing_cycle_start: new Date().toISOString(),
            })
            .eq("user_id", userData.user_id);
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        // Get user by Stripe customer ID
        const { data: userData, error: userError } = await supabase
          .from("user_metadata")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (userError || !userData) {
          throw new Error(`No user found for customer ${customerId}`);
        }

        // Revert to free plan
        await supabase
          .from("user_metadata")
          .update({
            plan_type: "free",
            summaries_generated: 0,
            billing_cycle_start: new Date().toISOString(),
          })
          .eq("user_id", userData.user_id);

        break;
      }

      //   case "customer.subscription.trial_will_end": {
      //     const subscription = event.data.object;
      //     // Handle trial ending notification if needed
      //     console.log("Trial will end for subscription:", subscription.id);
      //     break;
      //   }

      default: {
        console.log(`Unhandled event type ${event.type}`);
      }
    }

    return new NextResponse("Webhook processed successfully", { status: 200 });
  } catch (error: unknown) {
    console.error("Webhook processing error:", error);
    if (error instanceof Error) {
      return new NextResponse(`Webhook Error: ${error.message}`, {
        status: 400,
      });
    }
    return new NextResponse("Unknown webhook error occurred", { status: 400 });
  }
}
