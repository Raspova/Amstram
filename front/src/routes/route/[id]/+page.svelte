<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { getRoutes , getJWT} from "$lib/appwrite";
  import {
    MapPin,
    Calendar,
    Truck,
    Car,
    Bike,
    CreditCard,
    User,
    Phone,
    Clock,
    Info
  } from "lucide-svelte";
  import AOS from "aos";
  import Header from "$lib/components/Header.svelte";
  import { intStatus } from "$lib/contenu";
  import "aos/dist/aos.css";

  interface Route {
    $id: string;
    owner: string;
    depart: string;
    arrival: string;
    disponibility: string;
    departContact: string;
    arrivalContact: string;
    departComment: string;
    arrivalComment: string;
    vType: string;
    vMark: string;
    vImmatriculation: string;
    vCap: string;
    vBox: string;
    vComment: string | null;
    ownerContact: string;
    service: string;
    price: string;
    payment_capture: string | null;
    status: number;
    paid:boolean;
  }

  $: id = $page.params.id;
  let route: Route | null = null;

  onMount(async () => {
    route = await getRoutes(id);
    console.log(route)
    AOS.init({
      duration: 800,
      once: true,
      offset: 50
    });
  });

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function formatContact(contact: string): { name: string; phone: string } {
    if (contact === 'owner') {
      const [name, phone] = route?.ownerContact.split(' - ') ?? ['', ''];
      return { name, phone };
    }
    const [name, phone] = contact.split(' - ');
    return { name, phone };
  }


  async function pay() {
    const jwt = await getJWT();
    console.log(jwt)
    const data = await fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price:route?.price,
        id:route?.$id,
        vType:route?.vType,
        origin: route?.depart,
        destination:route?.arrival,
        jwt:jwt,
        //customerEmail: route?.ownerContact, 
        //customerName: route?.,
        //customerPhone:route
      }),
    }).then((data) => data.json());
    window.location.replace(data.url);
  }
   
</script>

<div class="min-h-screen   py-8 px-4">
  <div class="h-24">
    <Header />
  </div>

  <div class="container mx-auto max-w-6xl">
    {#if route}
      <div class="space-y-6" data-aos="fade-up">
        <!-- Status Bar -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20">
          <div class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg" data-aos="fade-right" data-aos-delay="100">
            <Truck class="text-purple-400" size={28} />
            <div>
              <span class="text-gray-400 text-sm">Service</span>
              <p class="text-white font-medium">{route.service === 'car' ? 'Le Pilote Express' : 'Le Cocon Roulant'}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg" data-aos="fade-right" data-aos-delay="200">
            <CreditCard class="text-purple-400" size={28} />
            <div>
              <span class="text-gray-400 text-sm">Price</span>
              <p class="text-white font-medium">€{route.price} T.T.C</p>
            </div>
          </div>

          <div class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg" data-aos="fade-right" data-aos-delay="300">
            <User class="text-purple-400" size={28} />
            <div>
              <span class="text-gray-400 text-sm">Status</span>
              <p class="text-white font-medium">{intStatus[route.status]}</p>
            </div>
          </div>
        </div>
        {#if !route.paid}
        <button on:click={pay}>PAY</button>
        {/if}
        <!-- Owner Contact -->
        <div class="bg-white/20 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20" data-aos="fade-up">
          <div class="flex items-center space-x-3 mb-4">
            <Phone class="text-purple-400" size={24} />
            <h2 class="text-xl font-medium text-white">Owner Contact</h2>
          </div>
          <p class="text-gray-200 text-lg pl-9">{route.ownerContact}</p>
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Departure -->
          <div class="bg-white/20 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20" data-aos="fade-right">
            <div class="flex items-center space-x-3 mb-4">
              <MapPin class="text-purple-400" size={24} />
              <h2 class="text-xl font-medium text-white">Departure</h2>
            </div>
            <div class="space-y-4 pl-9">
              <p class="text-gray-200">{route.depart}</p>
              {#if route.departComment}
                <p class="text-gray-400 italic">{route.departComment}</p>
              {/if}
              <div class="bg-white/5 p-4 rounded-lg">
                <p class="text-purple-400 font-medium mb-2">Contact</p>
                <p class="text-gray-200">
                  {route.departContact === 'owner' ? route.ownerContact : route.departContact}
                </p>
              </div>
            </div>
          </div>

          <!-- Arrival -->
          <div class="bg-white/20 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20" data-aos="fade-left">
            <div class="flex items-center space-x-3 mb-4">
              <MapPin class="text-purple-400" size={24} />
              <h2 class="text-xl font-medium text-white">Arrival</h2>
            </div>
            <div class="space-y-4 pl-9">
              <p class="text-gray-200">{route.arrival}</p>
              {#if route.arrivalComment}
                <p class="text-gray-400 italic">{route.arrivalComment}</p>
              {/if}
              <div class="bg-white/5 p-4 rounded-lg">
                <p class="text-purple-400 font-medium mb-2">Contact</p>
                <p class="text-gray-200">
                  {route.arrivalContact === 'owner' ? route.ownerContact : route.arrivalContact}
                </p>
              </div>
            </div>
          </div>

          <!-- Availability -->
          <div class="bg-white/20 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20" data-aos="fade-up">
            <div class="flex items-center space-x-3 mb-4">
              <Calendar class="text-purple-400" size={24} />
              <h2 class="text-xl font-medium text-white">Availability</h2>
            </div>
            <div class="pl-9">
              <div class="flex items-center space-x-2">
                <Clock class="text-purple-400" size={20} />
                <p class="text-gray-200">{formatDate(route.disponibility)}</p>
              </div>
            </div>
          </div>

          <!-- Vehicle -->
          <div class="bg-white/20 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20" data-aos="fade-up">
            <div class="flex items-center space-x-3 mb-4">
              {#if route.vType.toLowerCase() === 'moto'}
                <Bike class="text-purple-400" size={24} />
              {:else}
                <Car class="text-purple-400" size={24} />
              {/if}
              <h2 class="text-xl font-medium text-white">Vehicle Details</h2>
            </div>
            <div class="grid gap-3 pl-9">
              <div class="grid grid-cols-2 gap-2">
                <span class="text-gray-400">Type</span>
                <span class="text-gray-200">{route.vType}</span>
                
                <span class="text-gray-400">Make</span>
                <span class="text-gray-200">{route.vMark}</span>
                
                <span class="text-gray-400">License Plate</span>
                <span class="text-gray-200">{route.vImmatriculation}</span>
                
                <span class="text-gray-400">Capacity</span>
                <span class="text-gray-200">{route.vCap}</span>
                
                <span class="text-gray-400">Transmission</span>
                <span class="text-gray-200">{route.vBox}</span>
              </div>
              
              {#if route.vComment}
                <div class="mt-2 p-3 bg-white/5 rounded-lg flex items-start space-x-2">
                  <Info class="text-purple-400 shrink-0" size={20} />
                  <p class="text-gray-300">{route.vComment}</p>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center space-y-4">
          <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-purple-400 border-t-transparent"></div>
          <p class="text-gray-300 text-lg">Loading route information...</p>
        </div>
      </div>
    {/if}
  </div>
</div>

 