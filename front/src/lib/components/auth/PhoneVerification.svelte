<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { verifyPhone, getUser, createPhoneVerification, updateNumber } from '$lib/appwrite'
    import { onMount } from 'svelte'
    import { CheckCircle, Phone, Shield } from 'lucide-svelte'
    import { createEventDispatcher } from 'svelte'
    import { contenu } from '$lib/contenu';
    
    // TODO : Change number in case of error, or if user change it after verification
    
    const dispatch = createEventDispatcher();
    export let sms_sent: boolean = false;
    let user_id: string = "";
    let code: string = "";
    let telephone: string = "";
    export let lang: string = "fr";
    export let verified: boolean = false;
  
    export function get_verified(): boolean {
      return verified;
    }
  
    async function relaunchVerification(){
      if (telephone == ""){
        sms_sent = false;
        verified = false;
      }
      else{
        console.log(await createPhoneVerification());
      }
    }
  
    async function updatePhoneNumber(){
      try{
        if(telephone == ""){
          alert(contenu[lang].invalidPhoneNumber);
          return;
        }
        const res = await updateNumber(telephone, user_id);
        const res2 = await createPhoneVerification();
        if (!res || !res2) {
          alert(contenu[lang].phoneUpdateError);
        } else {
          sms_sent = true;
        }
      } catch(error){
        alert(contenu[lang].phoneUpdateError);
        console.error(error);
      }
    }
  
    async function handlePhoneVerification(){
      try{ 
        const res = await verifyPhone(code);
        if (!res) {
          alert(contenu[lang].incorrectCodeError);
        } else {
          console.log(res);
          verified = true;
          dispatch("phone_verified", {phone: telephone});
        }
      } catch(error) {
        alert(contenu[lang].incorrectCodeError);
        console.error(error);
      }
    }
  
    async function autoVerify(){
      const res = await createPhoneVerification();
      if (!res) {
        alert(contenu[lang].verificationError);
      }
      else{
        sms_sent = true;
      }
    }
    
    onMount(async () => {
      const user = await getUser();
      if (!user){
        window.location.href = "/"; // Refaire ce co  apres 
        return;
      } 
      console.log(user);
      telephone = user.phone;
      verified = user.phoneVerification;
      user_id = user.$id;
      console.log(verified);
      console.log(telephone);
      if (!verified && telephone != ""){
        autoVerify();
        console.log("autoVerify");
      }
      //if (!verified && telephone == ""){   }
    })
  </script>
  
  <Card.Root class="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
    <Card.Header class="bg-gradient-to-r from-white to-gray-200 text-black p-6">
      <div class="flex flex-col items-center justify-center">
        {#if !verified}
          <Card.Title class="text-2xl font-bold mb-2 flex items-center">
            <Shield class="mr-2" />
            {contenu[lang].phoneVerification}
          </Card.Title>
          <Card.Description class="text-black">
            {sms_sent ? contenu[lang].enterCode : contenu[lang].enterPhoneNumber}
          </Card.Description>
        {:else}
          <Card.Title class="text-2xl font-bold mb-2 flex items-center">
            <CheckCircle class="mr-2 text-amstram-purple" />
            {contenu[lang].titleVerified}
          </Card.Title>
        {/if}
      </div>
    </Card.Header>
    <Card.Content class="p-6">
      {#if !verified}
        {#if sms_sent}
          <div class="space-y-4">
            <p>{contenu[lang].smsSentTo} {telephone}</p>
            <input 
              type="text" 
              class="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amstram-purple" 
              bind:value={code} 
              placeholder={contenu[lang].enterCode} 
            />
  
            <button 
              class="w-full bg-amstram-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
              on:click={handlePhoneVerification}
            >
              <Shield class="mr-2" />
              {contenu[lang].verifyCode}
            </button>
            <a href="#" on:click={relaunchVerification}>{contenu[lang].resendCode}</a>
          </div>
        {:else} 
          <div class="space-y-4">
            <label for="telephone" class="block text-sm font-medium text-gray-700">
              {contenu[lang].phoneNumber}
            </label>
            <div class="relative">
              <Phone class="absolute top-3 left-3 text-gray-400" />
              <input 
                id="telephone" 
                type="text" 
                bind:value={telephone} 
                placeholder={contenu[lang].enterPhoneNumber} 
                class="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amstram-purple" 
                required 
                pattern="^\+.*" 
                title={contenu[lang].phoneNumberFormat} 
                on:input={e => {
                  if (telephone.startsWith('0')) {
                    telephone = '+33' + telephone.slice(1);
                  }
                }} 
              />
            </div>
            <button 
              class="w-full bg-amstram-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
              on:click={updatePhoneNumber}
            >
              <Shield class="mr-2" />
              {sms_sent ? contenu[lang].sendCode : contenu[lang].verifyNumber}
            </button>
          </div>
        {/if}
      {:else}
        <div class="flex items-center justify-center space-x-2 text-amstram-purple">
          <CheckCircle class="w-8 h-8" />
          <span class="text-lg font-semibold">{telephone}</span>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>