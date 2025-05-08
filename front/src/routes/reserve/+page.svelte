<script lang="ts">
    import PhoneVerification from "$lib/components/auth/PhoneVerification.svelte";
   // import AuthComponant from "$lib/components/auth/AuthComponant.svelte";
    import TravelContainer from "$lib/components/TravelContainer.svelte";
    import Vehicule from "$lib/components/Vehicule.svelte";
    import { getUser } from "$lib/appwrite";
    import { onMount } from "svelte";
    import { Check } from 'lucide-svelte';
    import ServiceRecap from "$lib/components/ServiceRecap.svelte";
    import { calculatePrice, addRoute } from '$lib/appwrite';
    import type { IRoute } from '$lib/appwrite';
    import Header from "$lib/components/Header.svelte";
    import { goto } from "$app/navigation";
    import { contenu } from '$lib/contenu';


    let depart: TravelContainer;
    let arrival: TravelContainer;
    let vehicleComponent: Vehicule;
    let depart_route: string = '';
    let arrival_route: string = '';
    let lang: string = 'fr';
    let service: string = '';
    let selectedTypeofVehicle: string = '';
    let price: number = 0;
    let contact: {
        name: string;
        telephone: string;
    }[] = [];
    let tomorrow = new Date(); 
    tomorrow.setDate(tomorrow.getDate() + 1);
    let minDateDepart = tomorrow.toISOString().split('T')[0];
    tomorrow.setDate(tomorrow.getDate() + 3);
    let minDateArival = tomorrow.toISOString().split('T')[0];
    let valid = false;
    let verified = false;
    let dataPrice: any;
    let user: any;

    onMount(async () => {
        user = await getUser();
        const urlParams = new URLSearchParams(window.location.search);
        depart_route = urlParams.get('r1') || '';
        arrival_route = urlParams.get('r2') || '';
        lang = urlParams.get('lang') || 'fr';
        service = urlParams.get('service') || '';
        selectedTypeofVehicle = urlParams.get('selected') || '';
        //price = parseFloat(urlParams.get('price') || '0');
        if (user){ 
            let contact_user = {
                name: user.name,
                telephone: user.phone
            }
            contact.push(contact_user);
            depart.updateContact(contact_user);
            arrival.updateContact(contact_user);
        }
        //depart.selectRoute(depart_route);
        //arrival.selectRoute(arrival_route);
        contact = [...contact]; 
        dataPrice = await calculatePrice(depart_route, arrival_route);
        //dataPrice = {car: {price: 100},  truck: {price: 150}};
        price = dataPrice ? (dataPrice[service] && dataPrice[service]["price"]) ? dataPrice[service]["price"] : 0 : 0;
    });

    $:price = dataPrice ? (dataPrice[service] && dataPrice[service]["price"]) ? dataPrice[service]["price"] : 0 : 0;

    //$: if (price == 0) console.log("!!!!!! dataPrice", dataPrice);
    function contactUpdate(event: any) {
        contact.push(event.detail.contact); 
        contact = [...contact];
    }

    function collectionDateUpdate(event: any) {
        tomorrow = new Date(event.detail.collectionDate);
        tomorrow.setDate(tomorrow.getDate() + 4);
        minDateArival = tomorrow.toISOString().split('T')[0];
    }

    async function handleSubmit() {
        // Add your submission logic here
        if (!valid || !verified) return;
        
        let completeDate = new Date(depart.getCompleteDate());
        let vehicleInfo = vehicleComponent.getVehicleInfo();
        console.log(vehicleInfo);
        let departContact = depart.getContact();
        let arrivalContact = arrival.getContact();
        let departContactFull = departContact ? departContact.name + " - " + departContact.telephone : "";
        let arrivalContactFull = arrivalContact ? arrivalContact.name + " - " + arrivalContact.telephone : "";
        let ownerContact = user.name + " - " + user.phone;
        departContactFull = departContactFull == ownerContact ? "owner" : departContactFull;
        arrivalContactFull = arrivalContactFull == ownerContact ? "owner" : arrivalContactFull;
        let route: IRoute = {
            owner: user.$id,
            depart: depart_route,
            ownerContact: ownerContact,
            arrival: arrival_route,
            disponibility: completeDate ,
            vType: vehicleInfo.vType,
            vMark: vehicleInfo.vMark,
            vImmatriculation: vehicleInfo.vImmatriculation,
            vCap: vehicleInfo.vCap,
            vBox: vehicleInfo.vBox,
            departComment: depart.getComment(),
            arrivalComment: arrival.getComment(),
            departContact: departContactFull,
            arrivalContact: arrivalContactFull,
            price: price.toString(),
            service: service,
            status: 0
        }
        console.log(route);
        try {
            const res = await addRoute(route);
            
            goto(`/route/${res.$id}?lang=` + lang);
        } catch (error) {
            console.error(error);
        }
    }
</script>

<div class="min-h-screen py-4 px-2 sm:px-4">
    <div class=" h-24">
        <Header bind:lang  last_service={service} last_price={price} />
    </div>
    <br/>
    <div class="max-w-fit">
        <!-- Top Section with reduced spacing -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <!-- Service Recap Section -->
             <div class="bg-gradient-to-br from-amstram-black/50 to-white/30 rounded-lg shadow-sm p-3 flex items-center justify-center">
                <ServiceRecap {lang} bind:selectedService={service} price={price} />
            </div>
            
            <!-- Phone Verification Section -->
            <div class="bg-gradient-to-br from-amstram-black/50 to-white/30 rounded-lg shadow-sm p-3 flex items-center justify-center">
                <PhoneVerification 
                    {lang}
                    bind:verified
                    on:phone_verified={(event) => {
                        contact[0].telephone = event.detail.phone;
                    }} 
                />
            </div>
        </div>

        <!-- Rest of the form with reduced spacing -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <!-- Travel Containers -->
            <div class="bg-white rounded-lg shadow-sm p-3 h-full  ">
                <TravelContainer
                    minDate={minDateDepart}
                    on:collectionDateUpdate={collectionDateUpdate}
                    {lang}
                    isDepart={true}
                    bind:route={depart_route}
                    bind:this={depart}
                    {contact}
                    on:contactUpdate={contactUpdate}
                    on:value_set={async (event) =>   {
                        if (event.detail) dataPrice = await calculatePrice(depart_route, arrival_route);
                    }}
                />
            </div>
            <div class="bg-white rounded-lg shadow-sm p-3 h-full  ">
                <TravelContainer
                    minDate={minDateArival}
                    {lang}
                    isDepart={false}
                    bind:route={arrival_route}
                    bind:this={arrival}
                    {contact}
                    on:contactUpdate={contactUpdate}
                    on:value_set={async (event) =>    {
                        if (event.detail) dataPrice = await calculatePrice(depart_route, arrival_route);
                    }}
                />
            </div>

            <!-- Vehicle Section -->
            <div class="bg-white rounded-lg shadow-sm p-3 h-full  ">
                <Vehicule bind:this={vehicleComponent} on:valid={() => {valid = true;}} on:invalid={() => {valid = false;}} {lang} bind:vehicleType={selectedTypeofVehicle}/>
            </div>
        </div>

        <!-- Validate Button -->
        <div class="mt-6 flex justify-center">
            <button
                on:click={handleSubmit}
                class="flex items-center justify-center gap-2 {valid && verified ? 'bg-amstram-purple hover:bg-purple-700' : 'bg-gray-400'} text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-colors duration-200 text-lg w-full max-w-md"
            >
                <Check class="w-5 h-5" />
                {contenu[lang].valid}
            </button>
        </div>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>

