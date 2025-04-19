import Stripe from 'stripe';
import { b as STRIPE_SECRET_KEY, c as SECRET_TEST } from './private-CAcCAeN2.js';

console.log("Stripe key is present:", STRIPE_SECRET_KEY, SECRET_TEST);
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia"
});

export { stripe as s };
//# sourceMappingURL=stripe-BrSPpy83.js.map
