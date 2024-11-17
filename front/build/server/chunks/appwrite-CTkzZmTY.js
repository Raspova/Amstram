import { Client, Functions, Account } from 'appwrite';

const PUBLIC_APPWRITE_PROJECT_ID = "6718cd3b00059671fa73";
const client = new Client();
new Functions(client);
new Account(client);
client.setProject(PUBLIC_APPWRITE_PROJECT_ID);
//# sourceMappingURL=appwrite-CTkzZmTY.js.map
