import { Client, Functions, ExecutionMethod, Account, ID , OAuthProvider} from "appwrite";
import {PUBLIC_APPWRITE_PROJECT_ID, PUBLIC_APPWRITE_URL} from '$env/static/public';
const client = new Client();
const functions = new Functions(client);
const account = new Account(client);
const url_base = PUBLIC_APPWRITE_URL;

client.setProject(PUBLIC_APPWRITE_PROJECT_ID!);

async function execute(func_name : string, val : string) {
  return await functions.createExecution( // Modifiez cette ligne
      func_name, // ID de la fonction
      JSON.stringify(""), // Corps de la requête
      false, // Exécutions programmées doivent être asynchrones
      val, // Chemin (optionnel)
      ExecutionMethod.GET, // Méthode (optionnel)
      // Planifier l'exécution (optionnel)
    );
}

export async function handleAutocomplete(val: string, inFrance : boolean = true, lang : string = "fr") {
    try {
        val = '/autocomplete/address?query=' + encodeURIComponent(val);
        if (inFrance == false)
            val+="&countryCode=" + encodeURIComponent("FRA,CHE,ITA,ESP,NLD,BEL,DEU,POL")
        val += "&lang=" + encodeURIComponent(lang);
        const result = await execute('autocomplete-location' , val);
        return (JSON.parse(result.responseBody)["result"]);
    } catch (error) {
      console.error('Erreur:', error);
    }
}
  

export async function calculatePrice(departure: string, arrival: string, vehicle: string) {
    try {
        const val = "/route_calculation?r1=" + encodeURIComponent(departure) + "&r2=" + encodeURIComponent(arrival);
        const data = await execute('prices_by_location', val);
        return (JSON.parse(data.responseBody));
    } catch (error) {
        console.error('Erreur:', error);
    }
}


export async function signupEmail(email: string, password: string , passwordConfirmation: string , name: string , telephone: string) {
    try {
        if (password != passwordConfirmation) {
            console.error('Erreur:', "Les mots de passe ne correspondent pas");
            alert("Les mots de passe ne correspondent pas");
            return null;
        }
        //if (name != "")
        //    await account.create(ID.unique(), email, password, name);
        let res  = await account.create(ID.unique(), email, password, name);
        await account.createEmailPasswordSession(email, password);
        account.createVerification(url_base + "/verify_email")
        await account.updatePhone(telephone, password);
        await account.createPhoneVerification();
        return await account.get();
    } catch (error) {
        alert("Erreur lors de la création de l'utilisateur : " + error);
        console.error('Erreur:', error);
        return null;
    }
}

export async function loginEmail(email: string, password: string) {
    try {   
        return await account.createEmailPasswordSession(email, password );
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}

export async function logout() {
    try {
        return await account.deleteSessions();
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}

export async function loginGoogle() {
    try {
        return await account.createOAuth2Session(
            OAuthProvider.Google,
        url_base + "/",
        url_base + "/failure"
        //,["profile", "email"]
    );
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}

export async function getUser() {
    try {
        return await account.get();
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}
export async function verifyPhone(code: string) {
    try {
        let id = (await account.get()).$id;
        return await account.updatePhoneVerification(id, code);
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}

export async function verifyEmail(id: string, secret: string) {
    try {
        return await account.updateVerification(id, secret);
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}

export async function sendEmailVerification() {
    return await account.createVerification(url_base + "/verify_email")
}