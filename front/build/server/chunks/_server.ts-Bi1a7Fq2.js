import Stripe from 'stripe';
import { p as private_env } from './hooks.server-BgaRuYhF.js';
import { c as contenu } from './contenu-CVz-VG3i.js';

const stripe = new Stripe(private_env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia"
});
const POST = async ({ request }) => {
  const data = await request.json();
  data.price;
  const id = data.id;
  let vehicleTypeIndex = -1;
  for (const lang of Object.keys(contenu)) {
    const types = contenu[lang].vehicleTypes;
    if (types) {
      vehicleTypeIndex = types.indexOf(data.vType);
      if (vehicleTypeIndex !== -1) break;
    }
  }
  if (vehicleTypeIndex > 3)
    vehicleTypeIndex = 1;
  const image = "https://amstram.eu/service/" + vehicleTypeIndex + ".png";
  const lineItems = [{
    price_data: {
      currency: "EUR",
      product_data: {
        name: "Amstram - Prise en charge de véhicule sur mesure",
        images: [image]
      },
      unit_amount: data.price * 100
    },
    quantity: 1
  }];
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: ["NO"]
    },
    mode: "payment",
    success_url: `https://amstram.eu/route/${id}`,
    //cancel_url: `https://amstram.eu/cancel`,
    cancel_url: `http://localhost:5173/cancel`,
    phone_number_collection: {
      enabled: true
    }
  });
  console.log(session.status);
  return new Response(
    JSON.stringify({
      url: session.url
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export { POST };
//# sourceMappingURL=_server.ts-Bi1a7Fq2.js.map
