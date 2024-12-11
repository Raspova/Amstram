<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import { calculatePrice } from '$lib/appwrite';
    import * as Card from "$lib/components/ui/card/index.js";
    import { Separator } from "$lib/components/ui/separator";
    import { contenu } from "$lib/contenu";
    import AddressInput from "./AddressInput.svelte";
    import { Plus, User, Phone ,  Calendar, Clock, HelpCircle, MapPin , MapPinned} from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import Avalability from './Avalability.svelte';

    const dispatch = createEventDispatcher();

    let depart_input: AddressInput;
     
    export let lang: string = "fr";
    export let isDepart: boolean = true;
    let comment: string;
    export let route: string;
    export let contact: {
        name: string;
        telephone: string;
    }[] = [];

    let showNewContactForm = false;
    let selectedContact: {name: string, telephone: string} | null = null;
 
    let newContact = { name: '', telephone: '' };

    let collectionDate: string;
    let collectionTime: string;
    let completeDate: string;
    $: completeDate = collectionDate + "T" + collectionTime;
    export let minDate = "";

    export function getComment() : string{
        return comment;
    }

    export function getContact(){
        return selectedContact;
    }
    export function getCompleteDate() {
        return completeDate;
    }

    export function updateContact(contact: {name: string, telephone: string}) {
        selectedContact = contact;
    }

    export function selectRoute(route: string) {
        depart_input.selectLocation(route, true);
    }

    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
      
        lang = urlParams.get('lang') || 'fr';
          //depart = urlParams.get('r1') || '';
        //arrival = urlParams.get('r2') || '';
        //vehicle = urlParams.get('selected') || '';
        //service = urlParams.get('service') || '';
        //if (service == "") {
        //    alert("Service not set");
        //    service = "car";
        //}
        //const data = await calculatePrice(depart, arrival, vehicle);
        //price = data[service]["price"];
        depart_input.selectLocation(route, true);
        selectedContact = contact[0];
        if (minDate == "") {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            collectionDate = tomorrow.toISOString().split('T')[0];
        }
        collectionDate = minDate;
        collectionTime = "09:00";
        completeDate = collectionDate + "T" + collectionTime;
    });

    function handleAddContact() {
        if (newContact.name && newContact.telephone) {
            //contact = [...contact, { ...newContact }];
            dispatch('contactUpdate', { contact: newContact });
            newContact = { name: '', telephone: '' };
            showNewContactForm = false;
        }
    }

    $: if (collectionDate < minDate) {
        collectionDate = minDate; // Met à jour la date de collecte si elle est inférieure à minDate
    }

    // Ajoutez cette fonction pour vérifier la validité de la date
    function validateCollectionDate() {
        if (collectionDate < minDate) {
            collectionDate = minDate; // Met à jour la date de collecte si elle est invalide
        }
    }

    // Ajoutez un effet réactif pour surveiller les changements de minDate
    $: minDate, validateCollectionDate();
</script>

<div class="w-full">
    <Card.Root class="w-full">
        <Card.Header>
            <div class="flex items-center">
                <MapPinned class="w-7 h-7 mr-2 text-amstram-purple" size={20} />
                <Card.Title class="text-2xl font-semibold">{contenu[lang][isDepart ? "departLocation" : "arrivalLocation"]}</Card.Title>
            </div>
        </Card.Header>
        <Card.Content>
            <AddressInput bind:this={depart_input} bind:route={route} {lang} focus={true} placeholder={isDepart ? contenu[lang].departLocation : contenu[lang].arrivalLocation} on:value_set={(event) => { 
                dispatch('value_set', event.detail ); 
            }}/>
            
            <Separator class="my-4" />
            
            <div class="space-y-4">
                <label for="contact" class="block text-lg font-semibold flex items-center">
                    <User class="mr-2 text-black" size={20} />
                    {contenu[lang].contact}
                </label>

                <!-- Contact Selection -->
                {#if contact.length > 0}
                    <select 
                        bind:value={selectedContact}
                        class="w-full p-2 border rounded-md bg-white"
                    >
                        <option  value={null}>{contenu[lang].selectContact}</option>
                        {#each contact as c}
                            <option value={c}>{c.name} - {c.telephone}</option>
                        {/each}
                    </select>
                {/if}

                <!-- Add New Contact Button -->
                <button
                    on:click={() => showNewContactForm = !showNewContactForm}
                    class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                    <Plus size={16} />
                    {showNewContactForm ? contenu[lang].cancel : contenu[lang].addNewContact}
                </button>

                <!-- New Contact Form -->
                {#if showNewContactForm}
                    <div class="space-y-3" transition:fade>
                        <div class="relative">
                            <User class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="text"
                                placeholder="Name"
                                bind:value={newContact.name}
                                class="w-full pl-10 pr-4 py-2 border rounded-md"
                            />
                        </div>
                        <div class="relative">
                            <Phone class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="tel"
                                placeholder={contenu[lang].enterPhoneNumber}
                                bind:value={newContact.telephone}
                                class="w-full pl-10 pr-4 py-2 border rounded-md"
                                on:input={e => {
                                    if (newContact.telephone.startsWith('0')) {
                                        newContact.telephone = '+33' + newContact.telephone.slice(1);
                                    }
                                }}
                            />
                        </div>
                        <button
                            on:click={handleAddContact}
                            class="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                        >
                            {contenu[lang].addContact}
                        </button>
                    </div>
                {/if}
            </div>

            {#if isDepart}
            <Separator class="my-4" />
                <div class="flex  gap-3 mb-2">
                  <Calendar class="w-5 h-5 text-black" />
                  <h2 class="text-lg font-semibold text-black">{contenu[lang].vehiculeAvailability}</h2>
                </div>
                <div class="grid lg:grid-cols-2 gap-8">
                    <!-- Collection Section -->
                    <div class="space-y-4">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium text-gray-700">{isDepart ? contenu[lang].collectionNoEarlierThan : contenu[lang].deliveryUntil}</span>
                        <button 
                          class="text-gray-400 hover:text-gray-600"
                          on:click={() => alert(isDepart ? contenu[lang].collectionNoEarlierThanHelp : contenu[lang].deliveryUntilHelp)}
                        >
                          <HelpCircle class="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div class="flex flex-col sm:flex-row gap-4">
                        <div class="relative flex-1">
                          <div class="relative flex items-center">
                            <input
                              type="date"
                              min={minDate}
                              bind:value={collectionDate}
                              class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm"
                             
                            />
                          </div>
                        </div>
                        <div class="relative w-full sm:w-40">
                          <div class="relative flex items-center">
                             <input
                              type="time"
                              bind:value={collectionTime}
                              class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                {/if}
            <Separator class="my-4" />
            <label for="comment" class="block text-sm font-medium">
                {contenu[lang].comment}
            </label>
            <br>
            <textarea
                class="w-full h-24 mt-1 border rounded-md p-2 resize-none focus:ring-2 focus:ring-primary-500"
                bind:value={comment}
                maxlength={510}
            />
        </Card.Content>
    </Card.Root>
</div>

<style>
    :global(.text-primary-600) {
        color: rgb(79, 70, 229);
    }
    :global(.hover\:text-primary-700:hover) {
        color: rgb(67, 56, 202);
    }
    :global(.bg-primary-600) {
        background-color: rgb(79, 70, 229);
    }
    :global(.hover\:bg-primary-700:hover) {
        background-color: rgb(67, 56, 202);
    }
    :global(.focus\:ring-primary-500:focus) {
        --tw-ring-color: rgb(99, 102, 241);
    }
</style>
