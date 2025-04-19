import { j as json } from './index-BIAFQWR9.js';
import { Client, Account, Databases } from 'appwrite';
import { D as DATABASE_ID, a as DATABASE_ROUTE_COLLECTION_ID } from './private-CAcCAeN2.js';
import { P as PUBLIC_APPWRITE_PROJECT_ID } from './public-CBphmMCZ.js';

const client = new Client();
new Account(client);
client.setProject(PUBLIC_APPWRITE_PROJECT_ID);
const database = new Databases(client);
const GET = async ({ request, params }) => {
  try {
    const jwt = request.headers.get("X-Appwrite-JWT");
    if (!jwt) {
      return json({ success: false, error: "JWT not found" }, { status: 404 });
    }
    client.setJWT(jwt);
    const route_id = params.id;
    const route = await database.getDocument(DATABASE_ID, DATABASE_ROUTE_COLLECTION_ID, route_id);
    return json({ success: true, route }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de la route:", error);
    return json(
      { success: false, error: "Erreur lors de la récupération de la route" },
      { status: 500 }
    );
  }
};

export { GET };
//# sourceMappingURL=_server.ts-ByIAZMCQ.js.map
