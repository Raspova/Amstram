import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ID } from 'appwrite';
import { DATABASE_ID, DATABASE_ROUTE_COLLECTION_ID } from '$env/static/private';
import type { IRoute } from '$lib/appwrite';
import { database } from '$lib/appwrite';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const routeInfo: IRoute = await request.json();
        console.log("REQUEST : ", routeInfo);
        const newRoute = await database.createDocument(
            DATABASE_ID,
            DATABASE_ROUTE_COLLECTION_ID,
            ID.unique(),
            routeInfo
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