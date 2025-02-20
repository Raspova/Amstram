import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ID , Databases , Client, Account, Role , Permission} from 'appwrite';
import { DATABASE_ID, DATABASE_ROUTE_COLLECTION_ID } from '$env/static/private';
import type { IAppwriteRoute, IRoute } from '$lib/appwrite';
import { PUBLIC_APPWRITE_URL, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
//import { database  } from '$lib/appwrite';

const client = new Client();
const account = new Account(client);
client.setProject(PUBLIC_APPWRITE_PROJECT_ID);
const database = new Databases(client);

 

export const GET: RequestHandler = async ({ request, params }) => {
    try {
        const jwt = request.headers.get('X-Appwrite-JWT');
        if (!jwt) {
            return json({ success: false, error: 'JWT not found' }, { status: 404 });
        }
        
        client.setJWT(jwt);
        const route_id = params.id;
        const route = await database.getDocument(DATABASE_ID, DATABASE_ROUTE_COLLECTION_ID, route_id);
        
        return json({ success: true, route: route }, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la récupération de la route:', error);
        return json(
            { success: false, error: 'Erreur lors de la récupération de la route' },
            { status: 500 }
        );
    }
}