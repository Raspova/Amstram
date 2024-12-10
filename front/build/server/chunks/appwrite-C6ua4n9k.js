import { Client, Functions, Account, Databases } from 'appwrite';

const PUBLIC_APPWRITE_PROJECT_ID = "6718cd3b00059671fa73";
const client = new Client();
new Functions(client);
new Account(client);
const database = new Databases(client);
client.setProject(PUBLIC_APPWRITE_PROJECT_ID);

export { database as d };
//# sourceMappingURL=appwrite-C6ua4n9k.js.map
