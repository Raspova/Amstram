import { Client, Functions, Account, Databases } from 'appwrite';
import { P as PUBLIC_APPWRITE_PROJECT_ID } from './public-CNzjf1yT.js';

const client = new Client();
new Functions(client);
new Account(client);
new Databases(client);
client.setProject(PUBLIC_APPWRITE_PROJECT_ID);
//# sourceMappingURL=appwrite-B9dwXtck.js.map
