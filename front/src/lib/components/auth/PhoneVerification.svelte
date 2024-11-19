<script lang="ts">
    import {verifyPhone} from '$lib/appwrite'
    export let sms_sent: boolean = true;
    let code: string = "";
    let telephone: string = "";
    let lang: string = "fr";
    const contenu : any = {
        fr: {
            title: "Vérification du téléphone",
            phoneNumber: "Numéro de téléphone",
            enterPhoneNumber: "Entrez votre numéro de téléphone",
            sendCode: "Envoyer le code",
            verifyCode: "Vérifier le code"
        },
        en: {
            title: "Phone verification",
            phoneNumber: "Phone number",
            enterPhoneNumber: "Enter your phone number",
            sendCode: "Send code",
            verifyCode: "Verify code"
        }
    }
    async function handlePhoneVerification(){
        try{ 
            const res = await verifyPhone(code)
            if (!res) {
                alert("Code incorrect, ou autre erreur, veuillez réessayer")
            }
            console.log("RES ",res)
            
        }catch(error){
            alert("Code incorrect , veuillez réessayer")
            console.error(error)
        }
    }
</script>



<div class="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
    <div class="flex justify-center p-4 bg-gray-300">
<div class="container max-w-md p-4">
    <h1 class="text-center text-2xl font-bold mb-4 text-amstram-black">{contenu[lang].title}</h1>
    {#if sms_sent}
    <div class="p-8">
      
      
        <input type="text" class="text-black mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" bind:value={code} placeholder="Entrez le code" />
        <br>
        <div class="text-center">
            <button class="bg-amstram-purple text-white font-bold py-2 px-4 rounded" on:click={handlePhoneVerification}>{contenu[lang].verifyCode}</button>
        </div>
    </div>
    {:else} 
    <div class="phone-verification-container">
        <label for="telephone" class="block text-sm font-medium text-amstram-black">{contenu[lang].phoneNumber}</label>
        <input id="telephone" type="text" bind:value={telephone} placeholder={contenu[lang].enterPhoneNumber} class=" text-black mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required pattern="^\+.*" title="Le numéro de téléphone doit commencer par un +." on:input={e => {
            if (telephone.startsWith('0')) {
                telephone = '+33' + telephone.slice(1);
            }}} />
        <br>
          <div class="text-center">
            <button class="bg-amstram-purple text-white font-bold py-2 px-4 rounded" on:click={handlePhoneVerification}>{contenu[lang].sendCode}</button>
        </div>
    </div>
    {/if} 
</div>
</div>
</div>