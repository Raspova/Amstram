import { stripe } from "$lib/stripe";
import type { RequestHandler } from "@sveltejs/kit";
//import { env } from "$env/dynamic/private";
import { contenu } from "$lib/contenu";
import type { List } from "lucide-svelte";


export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const cartItems: number = data.price;
  const routId: string = data.id;
  let customerId;
  
    const customer = await stripe.customers.create({
      email: data.customerEmail || "",
      name: data.customerName || "",
      phone: data.customerPhone || ""
    });
    customerId = customer.id;
 
  // Parcourir les langues pour trouver l'index
  let vehicleTypeIndex = -1;
  for (const lang of Object.keys(contenu)) {
    const types = contenu[lang].vehicleTypes;
    if (types) {
      vehicleTypeIndex = types.indexOf(data.vType);
      if (vehicleTypeIndex !== -1) break;
    }
  }
  console.log(vehicleTypeIndex, data.vType)  
  if (vehicleTypeIndex > 3 || vehicleTypeIndex == -1)
    vehicleTypeIndex = 1
    
  const image: List[string] = [
    "https://fra.cloud.appwrite.io/v1/storage/buckets/6719048c00128afaa04d/files/moto/view?project=6718cd3b00059671fa73&mode=admin",
    "https://fra.cloud.appwrite.io/v1/storage/buckets/6719048c00128afaa04d/files/67fe89550014ed478d56/view?project=6718cd3b00059671fa73&mode=admin",
    "https://fra.cloud.appwrite.io/v1/storage/buckets/6719048c00128afaa04d/files/67fe895d00276a83e2e5/view?project=6718cd3b00059671fa73&mode=admin",
    "https://fra.cloud.appwrite.io/v1/storage/buckets/6719048c00128afaa04d/files/67fe896c000260529edd/view?project=6718cd3b00059671fa73&mode=admin"
  ];
  
  // Create session for redirecting users
  const lineItems = [{
    price_data: {
      currency: "EUR",
      product_data: {
        name: "Amstram - Prise en charge de véhicule sur mesure",
        images: [image[vehicleTypeIndex]],
        description: `Transport de votre ${data.vType || 'véhicule'} de ${data.origin || ''} à ${data.destination || ''}`,
      },
      unit_amount: data.price * 100,
    },
    quantity: 1,
  }];
   
  // Create session
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    //shipping_address_collection: {
    //  allowed_countries: ["FR", "BE", "LU", "CH", "DE", "ES", "IT"],
    //},
    billing_address_collection: 'required',
    mode: "payment",
    success_url: `https://amstram.eu/route/${routId}?success=true`,
    cancel_url: `https://amstram.eu/route/${routId}?canceled=true`,
   // customer: customerId,

    phone_number_collection: {
      enabled: true,
    },
    locale: 'fr',
    //allow_promotion_codes: true,
    custom_text: {
      submit: {
        message: "Nous vous contacterons pour confirmer les détails du trajet après votre paiement."
      },
      //shipping_address: {
      //  message: "Veuillez fournir l'adresse où le véhicule sera pris en charge."
      //}
    },
    payment_method_types: ['card'],
    metadata: {
      jwt:data.jwt,
      vehicleType: data.vType,
      routeId: routId,
      origin: data.origin,
      destination: data.destination,
      date: data.date
    },
  });
  
  console.log(session.status);
  session.id
  return new Response(
    JSON.stringify({
      url: session.url,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};