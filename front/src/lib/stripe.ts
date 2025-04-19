import Stripe from "stripe";
import { STRIPE_SECRET_KEY, SECRET_TEST } from "$env/static/private";


export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});