import { j as json } from './index-BIAFQWR9.js';
import { Client, Databases } from 'appwrite';
import { S as STRIPE_WEBHOOK_SECRET, D as DATABASE_ID, a as DATABASE_ROUTE_COLLECTION_ID } from './private-CAcCAeN2.js';
import { a as PUBLIC_APPWRITE_URL, P as PUBLIC_APPWRITE_PROJECT_ID } from './public-CBphmMCZ.js';
import { s as stripe } from './stripe-BrSPpy83.js';
import 'stripe';

const client = new Client();
client.setEndpoint(PUBLIC_APPWRITE_URL);
client.setProject(PUBLIC_APPWRITE_PROJECT_ID);
const database = new Databases(client);
const POST = async ({ request }) => {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  console.log("Webhook Stripe reçu");
  if (!signature) {
    console.error("Signature manquante");
    return json({ success: false, error: "Signature manquante" }, { status: 400 });
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Erreur de vérification de signature:", error);
    return json({ success: false, error: "Signature invalide" }, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Session complétée, métadonnées:", session.metadata);
    if (session.payment_status === "paid") {
      try {
        const routeId = session.metadata?.routeId;
        if (!routeId) {
          console.error("ID de route manquant dans les métadonnées");
          return json({ success: false, error: "ID de route manquant" }, { status: 400 });
        }
        await updateRoutePaymentStatus(routeId);
        console.log(`Route ${routeId} marquée comme payée avec succès`);
        return json({ success: true });
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut de paiement:", error);
        return json(
          { success: false, error: "Erreur interne lors de la mise à jour" },
          { status: 500 }
        );
      }
    } else {
      console.log("Paiement non encore finalisé, statut:", session.payment_status);
    }
  }
  return json({ success: true, received: true });
};
async function updateRoutePaymentStatus(routeId) {
  try {
    try {
      await database.getDocument(
        DATABASE_ID,
        DATABASE_ROUTE_COLLECTION_ID,
        routeId
      );
    } catch (error) {
      console.error(`Route ${routeId} non trouvée dans la base de données`);
      throw new Error(`Route ${routeId} non trouvée`);
    }
    const result = await database.updateDocument(
      DATABASE_ID,
      DATABASE_ROUTE_COLLECTION_ID,
      routeId,
      {
        is_paid: true,
        payment_date: (/* @__PURE__ */ new Date()).toISOString(),
        payment_status: "paid"
      }
    );
    return result;
  } catch (error) {
    console.error("Erreur Appwrite lors de la mise à jour:", error);
    throw error;
  }
}

export { POST };
//# sourceMappingURL=_server.ts-BEmcqMPa.js.map
