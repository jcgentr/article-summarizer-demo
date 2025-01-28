import { createCheckoutSession } from "@/app/(protected)/actions";

export default async function CheckoutPage() {
  // This will trigger the Stripe redirect
  await createCheckoutSession();

  // We won't actually render anything here since we'll be redirected
  return null;
}
