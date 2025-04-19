import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Client, Databases } from 'appwrite';
import { 
  DATABASE_ID, 
  DATABASE_ROUTE_COLLECTION_ID, 
  STRIPE_WEBHOOK_SECRET 
} from '$env/static/private';
import { PUBLIC_APPWRITE_URL, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import {stripe} from '$lib/stripe';

// Initialiser Stripe avec votre clé secrète
//const stripe = new Stripe(STRIPE_SECRET_KEY);

// Initialiser le client Appwrite (serveur)
const client = new Client();
client.setEndpoint(PUBLIC_APPWRITE_URL);
client.setProject(PUBLIC_APPWRITE_PROJECT_ID);
// Pour le webhook, nous utiliserons une clé API plutôt qu'un JWT
//client.setKey(process.env.APPWRITE_API_KEY || '');
const database = new Databases(client);

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    console.log('Webhook Stripe reçu');

    if (!signature) {
        console.error('Signature manquante');
        return json({ success: false, error: 'Signature manquante' }, { status: 400 });
    }

    let event;

    try {
        // Vérifier la signature de l'événement
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error('Erreur de vérification de signature:', error);
        return json({ success: false, error: 'Signature invalide' }, { status: 400 });
    }

    // Traiter l'événement de paiement réussi
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object ; //as tripe.Checkout.Session;
        
        console.log('Session complétée, métadonnées:', session.metadata);
        
        // Vérifier que le paiement est bien confirmé
        if (session.payment_status === 'paid') {
            try {
                const routeId = session.metadata?.routeId;
                
                if (!routeId) {
                    console.error('ID de route manquant dans les métadonnées');
                    return json({ success: false, error: 'ID de route manquant' }, { status: 400 });
                }
                
                // Mettre à jour le statut de paiement dans Appwrite
                await updateRoutePaymentStatus(routeId);
                console.log(`Route ${routeId} marquée comme payée avec succès`);
                
                return json({ success: true });
            } catch (error) {
                console.error('Erreur lors de la mise à jour du statut de paiement:', error);
                return json(
                    { success: false, error: 'Erreur interne lors de la mise à jour' },
                    { status: 500 }
                );
            }
        } else {
            console.log('Paiement non encore finalisé, statut:', session.payment_status);
        }
    }

    // Pour tous les autres types d'événements
    return json({ success: true, received: true });
};

async function updateRoutePaymentStatus(routeId: string) {
    try {
        // Vérifier d'abord que la route existe
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
        
        // Mettre à jour le document avec le statut payé
        const result = await database.updateDocument(
            DATABASE_ID,
            DATABASE_ROUTE_COLLECTION_ID,
            routeId,
            {
                is_paid: true,
                payment_date: new Date().toISOString(),
                payment_status: 'paid'
            }
        );
        
        return result;
    } catch (error) {
        console.error('Erreur Appwrite lors de la mise à jour:', error);
        throw error;
    }
}