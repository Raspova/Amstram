import { j as json } from './index-BIAFQWR9.js';
import { Client, Account, Databases, ID, Permission, Role } from 'appwrite';
import { D as DATABASE_ID, a as DATABASE_ROUTE_COLLECTION_ID } from './private-Br0gTHzt.js';
import { P as PUBLIC_APPWRITE_PROJECT_ID } from './public-CNzjf1yT.js';

const client = new Client();
new Account(client);
client.setProject(PUBLIC_APPWRITE_PROJECT_ID);
const database = new Databases(client);
const POST = async ({ request }) => {
  try {
    const routeInfo = await request.json();
    const jwt = request.headers.get("X-Appwrite-JWT");
    if (!jwt) {
      return json({ success: false, error: "JWT not found" }, { status: 404 });
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
    console.error("Erreur lors de la création de la route:", error);
    return json(
      { success: false, error: "Erreur lors de la création de la route" },
      { status: 500 }
    );
  }
};
const GET = async ({ request }) => {
  try {
    const jwt = request.headers.get("X-Appwrite-JWT");
    if (!jwt) {
      return json({ success: false, error: "JWT not found" }, { status: 404 });
    }
    client.setJWT(jwt);
    const routes = await database.listDocuments(DATABASE_ID, DATABASE_ROUTE_COLLECTION_ID);
    return json({ success: true, route: routes }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des routes:", error);
    return json(
      { success: false, error: "Erreur lors de la récupération des routes" },
      { status: 500 }
    );
  }
};
const PATCH = async ({ request, params }) => {
  const jwt = request.headers.get("X-Appwrite-JWT");
  if (!jwt) {
    return json({ success: false, error: "JWT not found" }, { status: 404 });
  }
  try {
    client.setJWT(jwt);
    const routeInfo = await request.json();
    delete routeInfo.$databaseId;
    delete routeInfo.$collectionId;
    console.log(routeInfo);
    const route = await database.updateDocument(DATABASE_ID, DATABASE_ROUTE_COLLECTION_ID, routeInfo.$id, routeInfo);
    console.log("route response", route);
    return json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la modification:", error);
    return json(
      { success: false, error: "Erreur lors de la modification" },
      { status: 500 }
    );
  }
};

export { GET, PATCH, POST };
//# sourceMappingURL=_server.ts-D6pjBSUb.js.map
