import config from "@/app/config";
import Stripe from "stripe";

export const stripe = new Stripe(config.stripeApiKey);
