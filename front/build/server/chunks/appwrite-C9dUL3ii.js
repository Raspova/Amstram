import { Client, Functions, Account, Databases } from 'appwrite';
import { P as PUBLIC_APPWRITE_PROJECT_ID } from './public-CNzjf1yT.js';

const client = new Client();
client.setProject(PUBLIC_APPWRITE_PROJECT_ID);
client.setEndpoint("https://appwrite.amstram.eu/v1");
new Functions(client);
new Account(client);
new Databases(client);
//# sourceMappingURL=appwrite-C9dUL3ii.js.map
