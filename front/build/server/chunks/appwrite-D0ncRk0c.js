import { Client, Functions, Account, Databases } from 'appwrite';
import { P as PUBLIC_APPWRITE_PROJECT_ID } from './public-CBphmMCZ.js';

const client = new Client();
client.setProject(PUBLIC_APPWRITE_PROJECT_ID);
client.setEndpoint("https://appwrite.amstram.eu/v1");
new Functions(client);
new Account(client);
new Databases(client);
//# sourceMappingURL=appwrite-D0ncRk0c.js.map
