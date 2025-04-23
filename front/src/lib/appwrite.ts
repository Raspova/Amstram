import { Client, Functions, ExecutionMethod, Account, ID , OAuthProvider, Databases} from "appwrite";
import {PUBLIC_APPWRITE_PROJECT_ID, PUBLIC_APPWRITE_URL } from '$env/static/public';
//import { DATABASE_ID, DATABASE_ROUTE_COLLECTION_ID } from '$env/static/private';

const client = new Client();

client.setProject(PUBLIC_APPWRITE_PROJECT_ID) ;
client.setEndpoint("https://appwrite.amstram.eu/v1");

const functions = new Functions(client);
const account = new Account(client);
export const database = new Databases(client);
const url_base = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';




// project specific

export interface IRoute {
    // Required fields
    owner: string;
    ownerContact: string;
    depart: string;
    arrival: string;
    disponibility: Date;  // Using Date for DateTime
    vType: string;
    vMark: string;
    vImmatriculation: string;
    vCap: string;
    vBox: string;
    price: string;
    service: string;
    status: number;
    // Optional fields
    departContact?: string;
    arrivalContact?: string;
    departComment?: string;
    arrivalComment?: string;
    vComment?: string;
}

export interface IAppwriteRoute extends IRoute {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    //$databaseId: string;
    //$collectionId: string;
}



export async function getJTW() {
    return await account.createJWT().then(jwt => jwt.jwt);
}

export async function addRoute(routeinfo: IRoute) {
    try {
        const response = await fetch('/api/routes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-JWT':   await account.createJWT().then(jwt => jwt.jwt)
            },
            body: JSON.stringify(routeinfo)
        });

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error);
        }

        return data.route;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la route:', error);
        throw error;
    }
}
 
export async function getRoutes(route_id: string = "") {
    const response = await fetch('/api/routes' + (route_id ? "/" + route_id : "") , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Appwrite-JWT': await account.createJWT().then(jwt => jwt.jwt)
        }
    });
    const data = await response.json();
    return data.route;
}

export async function updateRoute(route: IAppwriteRoute) {
    const response = await fetch('/api/routes', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-Appwrite-JWT': await account.createJWT().then(jwt => jwt.jwt)
        },
        body: JSON.stringify(route)
    });
}

export async function handleAutocomplete(val: string, countryCode : string = "FRA" , lang : string = "fr") {
    let result;
    try {
        val = '/autocomplete/address?query=' + encodeURIComponent(val);
        val+="&countryCode=" + encodeURIComponent(countryCode)
        val += "&lang=" + encodeURIComponent(lang);
        result = await execute('autocomplete-location' , val);
        console.log("!!!!!! result", result);
        if (!result || !result.responseBody) {
            console.log("Autocomple execution empty")
            return null;
        }
        return ({
            result: JSON.parse(result.responseBody)["result"],
            precise: JSON.parse(result.responseBody)["precise"]
        });
    } catch (error) {
      console.error('Erreur Autocomplete:', result?.responseBody, "error", error );
      return null;
    }
}
  


export async function calculatePrice(departure: string, arrival: string, vehicle: string  = "car") {
    try {
        const val = "/route_calculation?r1=" + encodeURIComponent(departure) + "&r2=" + encodeURIComponent(arrival);
        const data = await execute('prices_by_location', val);
        if (!data) {
            console.log("Price execution empty")
            return null;
        }
        return (JSON.parse(data.responseBody));
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}
// generic

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

async function executePost(func_name : string, val : string, body : string) {
    return await functions.createExecution( // Modifiez cette ligne
        func_name, // ID de la fonction
        body, // Corps de la requête
        false, // Exécutions programmées doivent être asynchrones
        val, // Chemin (optionnel)
        ExecutionMethod.POST, // Méthode (optionnel)
        
    );
}

export async function sendConfirmationEmail(user_id: string, subject: string, content: string) {
    const val = "/send_email"
    const data = await executePost('67647c3c003e72b3ee8d', val, JSON.stringify({user_id: user_id, subject: subject, content: content}));
    return (JSON.parse(data.responseBody));
}

export async function updateNumber(number: string , user_id: string) {
    try {
        const val = "/update_phone?number=" + encodeURIComponent(number) + "&user_id=" + encodeURIComponent(user_id);
        const data = await execute('674d83cf000c3a2c2341', val);
        return (JSON.parse(data.responseBody));
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}

export async function signupEmail(email: string, password: string , passwordConfirmation: string , name: string , telephone: string) {
    try {
        if (password != passwordConfirmation) {
            console.error('Erreur:', "Les mots de passe ne correspondent pas");
            alert("Les mots de passe ne correspondent pas");
            return null;
        }
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
        //return 
        let ret = await account.createEmailPasswordSession(email, password );
        //const jwt = await account.createJWT();
        ////console.log("jwt", jwt);
        //client.setJWT(jwt.jwt);
        return ret;
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

export async function loginGoogle( redirect_url :string = "") {
    try {
        console.log("redirect_url ->", redirect_url);
        let ret = await account.createOAuth2Session(
            OAuthProvider.Google,
            url_base + "/?" + redirect_url,
            url_base + "/failure"
        )
        return ret;
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}

export async function getUser() {
    try {
        
        return await account.get();
    } catch (error) {
        console.log("Get user failed : user probably not logged in");
        return null;
    }
}


export async function createPhoneVerification() {
    try {
        return await account.createPhoneVerification();
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