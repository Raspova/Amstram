import { Client, Functions, ExecutionMethod } from "appwrite";
 
const client = new Client();
const functions = new Functions(client);

client.setProject('6718cd3b00059671fa73');

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