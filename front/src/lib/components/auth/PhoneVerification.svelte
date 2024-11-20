<script lang="ts">
    import * as Card from "$lib/components/ui/card";
  import {verifyPhone} from '$lib/appwrite'
    export let sms_sent: boolean = true;
    let code: string = "";
    let telephone: string = "";
    let lang: string = "fr";
    const contenu : any = {
        fr: {
            title: "Vérification du téléphone",
            phoneNumber: "Numéro de téléphone",
            enterPhoneNumber: "Entrez votre numéro de téléphone, commencez par +, (+337 ou +336)",
            enterCode: "Entrez le code que vous avez reçu par SMS",
            sendCode: "Envoyer le code",
            verifyNumber: "Vérifier le numéro",
            verifyCode: "Vérifier le code"
        },
        en: {
            title: "Phone verification",
            phoneNumber: "Phone number",
            enterPhoneNumber: "Enter your phone number, start with +, (+337 or +336)",
            enterCode: "Enter the code you received by SMS",
            sendCode: "Send code",
            verifyNumber: "Verify number",
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

<Card.Root class=" w-full max-w-md bg-gray-300  rounded-lg shadow-xl overflow-hidden">
  <Card.Header>
    <div class="flex flex-col items-center justify-center">
        <Card.Title class="mb-2">{contenu[lang].title}</Card.Title>
        <Card.Description>{sms_sent ? contenu[lang].enterCode : contenu[lang].enterPhoneNumber}</Card.Description>
    </div>
  </Card.Header>
  <Card.Content>
             {#if sms_sent}
                <div class="p-8">
                    <input type="text" class="text-black mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" bind:value={code} placeholder="Entrez le code" />
                    <br>
                    <div class="text-center">
                        <button class="bg-amstram-purple text-white font-bold py-2 px-4 rounded" on:click={handlePhoneVerification}>{contenu[lang].verifyCode}</button>
                    </div>
                </div>
            {:else} 
                <div class="">
                    <label for="telephone" class="block   font-medium text-amstram-black">{contenu[lang].phoneNumber}</label>
                    <input id="telephone" type="text" bind:value={telephone} placeholder={contenu[lang].phoneNumber} class="text-black mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required pattern="^\+.*" title="Le numéro de téléphone doit commencer par un +." on:input={e => {
                        if (telephone.startsWith('0')) {
                            telephone = '+33' + telephone.slice(1);
                        }
                    }} />
                    <br>
                    <div class="text-center">
                        <button class="bg-amstram-purple text-white font-bold py-2 px-4 rounded" on:click={handlePhoneVerification}>{sms_sent ? contenu[lang].sendCode : contenu[lang].verifyNumber}</button>
                    </div>
                </div>
            {/if}  
  </Card.Content>
 
</Card.Root>