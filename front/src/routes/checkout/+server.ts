import { stripe } from "$lib/stripe";
import type { RequestHandler } from "@sveltejs/kit";
//import { env } from "$env/dynamic/private";
import { contenu } from "$lib/contenu";
import type { List } from "lucide-svelte";


export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  //const cartItems: number = data.price;
  const routId: string =  data.route_id;
  let customerId;
  
  if (data.price < 1) {
    return new Response(JSON.stringify({ error: 'Le prix doit être supérieur à 1' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  if (data.customerEmail) {
    const existingCustomers = await stripe.customers.list({
      email: data.customerEmail,
      limit: 1
    });
    
    if (existingCustomers.data.length > 0) {
      // Customer exists, use existing ID
      customerId = existingCustomers.data[0].id;
 //     // Optionally update customer data if needed
 //     if (data.customerName || data.customerPhone) {
 //       await stripe.customers.update(customerId, {
 //         name: data.customerName || existingCustomers.data[0].name,
 //         phone: data.customerPhone || existingCustomers.data[0].phone
 //       });
 //     }
    } else {
      // Create new customer if not found
      const customer = await stripe.customers.create({
        email: data.customerEmail,
        name: data.customerName || "",
        phone: data.customerPhone || ""
      });
      customerId = customer.id;
    }
  } else {
    // Create new customer if no email; should not happen
    const customer = await stripe.customers.create({
      email: data.customerEmail || "",
      name: data.customerName || "",
      phone: data.customerPhone || ""
    });
    customerId = customer.id;
  }
    
 
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
  
  // Service name based on type
  const serviceName = data.service === 'car' ? 'Le Pilote Express' : 'Le Cocon Roulant';
  
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
   //console.log("EMAIL:", data.customerEmail, data)
   
  // Create session with invoice creation enabled
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    client_reference_id: routId + "_checkout",
    billing_address_collection: 'required',
    mode: "payment",
    success_url: `https://amstram.eu/route/${routId}?success=true`,
    cancel_url: `https://amstram.eu/route/${routId}?canceled=true`,
    customer: customerId,
    phone_number_collection: {
      enabled: true,
    },
    locale: 'fr',
    custom_text: {
      submit: {
        message: "Nous vous contacterons pour confirmer les détails du trajet après votre paiement."
      }
    },
    payment_method_types: ['card'],
    metadata: {
      jwt: data.jwt,
      vehicleType: data.vType,
      routeId: routId,
      origin: data.origin,
      destination: data.destination,
      date: data.date
    },
    // Add invoice creation configuration
    invoice_creation: {
      enabled: true,
      invoice_data: {
        description: `Transport de véhicule Amstram - ${serviceName}`,
        footer: "Merci de votre confiance. Pour toute question, contactez-nous à administration@amstram.eu",
        //issuer: {
        //  name: "Amstram",
        ////  address: "123 Avenue de la Mobilité, 75001 Paris, France",
        // // phone: "+33 1 23 45 67 89"
        //},
        custom_fields: [
          {
            name: "Trajet",
            value: `${data.origin || ''} → ${data.destination || ''}`
          },
          {
            name: "Véhicule",
            value: data.vType || ''
          },
          {
            name: "Date",
            value: new Date(data.date || Date.now()).toLocaleDateString('fr-FR', {
              year: 'numeric', 
              month: 'long', 
              day: 'numeric'
            })
          }
        ],
        rendering_options: {
          amount_tax_display: "include_inclusive_tax"
        }
      }
    }
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