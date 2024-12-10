import { j as json } from './index-BIAFQWR9.js';
import { ID } from 'appwrite';
import { d as database } from './appwrite-C6ua4n9k.js';

const DATABASE_ID = "67191662002c0864f95c";
const DATABASE_ROUTE_COLLECTION_ID = "6738e84d001e20e49755";
const POST = async ({ request }) => {
  try {
    const routeInfo = await request.json();
    console.log("REQUEST : ", routeInfo);
    const newRoute = await database.createDocument(
      DATABASE_ID,
      DATABASE_ROUTE_COLLECTION_ID,
      ID.unique(),
      routeInfo
    );
    return json({ success: true, route: newRoute });
  } catch (error) {
    console.error("Erreur lors de la création de la route:", error);
    return json(
      { success: false, error: "Erreur lors de la création de la route" },
      { status: 500 }
    );
  }
};

export { POST };
//# sourceMappingURL=_server.ts-r-qqAO17.js.map
