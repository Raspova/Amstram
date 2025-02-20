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


export const POST: RequestHandler = async ({ request }) => {
    try {
        const routeInfo: IRoute = await request.json();
        const jwt = request.headers.get('X-Appwrite-JWT');
        if (!jwt) {
            return json({ success: false, error: 'JWT not found' }, { status: 404 });
        }
        
        client.setJWT(jwt);
        const newRoute = await database.createDocument(
            DATABASE_ID,
            DATABASE_ROUTE_COLLECTION_ID,
            ID.unique(),
            routeInfo,
            [Permission.read(Role.user(routeInfo.owner))]
        );
        return json({ success: true, route: newRoute });
    } catch (error) {
        console.error('Erreur lors de la création de la route:', error);
        return json(
            { success: false, error: 'Erreur lors de la création de la route' },
            { status: 500 }
        );
    }
}; 

export const GET: RequestHandler = async ({ request }) => {
    try {
    
    const jwt = request.headers.get('X-Appwrite-JWT');
    if (!jwt) {
        return json({ success: false, error: 'JWT not found' }, { status: 404 });
    }
    client.setJWT(jwt);
    const routes = await database.listDocuments(DATABASE_ID, DATABASE_ROUTE_COLLECTION_ID);
    return json({ success: true, route: routes } , { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la récupération des routes:', error);
        return json(
            { success: false, error: 'Erreur lors de la récupération des routes' },
            { status: 500 }
        );
    }
}
 
 

export const PATCH: RequestHandler = async ({ request, params }) => {
    
    const jwt = request.headers.get('X-Appwrite-JWT');
    if (!jwt) {
        return json({ success: false, error: 'JWT not found' }, { status: 404 });
    }
    try {

        client.setJWT(jwt);
        //const routeId = params.id;
        //console.log(routeId)
        const routeInfo: IAppwriteRoute = await request.json();
        // remove   '$databaseId': field
        delete routeInfo.$databaseId;
        delete routeInfo.$collectionId;
        console.log(routeInfo);
        const route = await database.updateDocument(DATABASE_ID, DATABASE_ROUTE_COLLECTION_ID, routeInfo.$id, routeInfo);
        console.log("route response", route);
        return json({ success: true });
    } catch (error) {
        console.error('Erreur lors de la modification:', error);
        return json(
            { success: false, error: 'Erreur lors de la modification' },
            { status: 500 }
        );
    }

}