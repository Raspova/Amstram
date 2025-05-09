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
  import { intStatus, contenu } from "$lib/contenu";
  import "aos/dist/aos.css";
  import { getUser } from "$lib/appwrite";
 
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
    paid: boolean;
  }

  $: id = $page.params.id;
  let route: Route | null = null;
  let lang : string = "fr" ;

  onMount(async () => {

    const urlParams = new URLSearchParams(window.location.search);
      
    lang = urlParams.get('lang') || 'fr';
    route = await getRoutes(id);
    console.log(route);
    AOS.init({
      duration: 800,
      once: true,
      offset: 50
    });
  });

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', {
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
  try {
    const user = await getUser();
    if (!user) {
      alert("Vous devez être connecté pour effectuer un paiement.");
      return;
    }

    const jwt = await getJWT();
    
    // Format date for invoice
    //console.log(route)
    const formattedDate = new Date(route?.disponibility || "").toISOString();
    
    const data = await fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: route?.price,
        route_id: route?.$id,
<<<<<<< HEAD
        id: route?.$id, // Include both id formats for compatibility
=======
>>>>>>> 883700c3ab6afb589706a24bac77acf438dac12d
        vType: route?.vType,
        origin: route?.depart,
        destination: route?.arrival,
        date: formattedDate,
        service: route?.service,
        customerEmail: user?.email,
        customerName: user?.name,
        customerPhone: user?.phone,
        jwt: jwt,
        // Additional info useful for invoice
        vMark: route?.vMark,
        vImmatriculation: route?.vImmatriculation,
        ownerContact: route?.ownerContact
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la création du paiement");
      }
      return response.json();
    });
    
    if (data.error) {
      alert(`Erreur: ${data.error}`);
      return;
    }
    
    if (data.url) {
      window.location.replace(data.url);
    } else {
      alert("Erreur: Impossible de créer la session de paiement");
    }
  } catch (error) {
    console.error("Erreur de paiement:", error);
    alert("Une erreur est survenue lors de la préparation du paiement.");
  }
}
</script>

<div class="min-h-screen py-8 px-4">
  <div class="h-24">
    <Header bind:lang />
  </div>

  <div class="container mx-auto max-w-6xl">
    {#if route}
      <div class="space-y-6" data-aos="fade-up">
        <!-- Status Bar -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20">
          <div class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg" data-aos="fade-right" data-aos-delay="100">
            <Truck class="text-purple-400" size={28} />
            <div>
              <span class="text-gray-400 text-sm">{contenu[lang].service}</span>
              <p class="text-white font-medium">
                {route.service === 'car' 
                  ? contenu[lang].piloteExpress.title.replace("1. ", "") 
                  : contenu[lang].coconRoulant.title.replace("2. ", "")}
              </p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg" data-aos="fade-right" data-aos-delay="200">
            <CreditCard class="text-purple-400" size={28} />
            <div>
              <span class="text-gray-400 text-sm">{contenu[lang].price}</span>
              <p class="text-white font-medium">€{route.price} T.T.C</p>
            </div>
          </div>

          <div class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg" data-aos="fade-right" data-aos-delay="300">
            <User class="text-purple-400" size={28} />
            <div>
              <span class="text-gray-400 text-sm">{contenu[lang].status}</span>
              <p class="text-white font-medium">{intStatus[route.status]}</p>
            </div>
          </div>
        </div>
        
        {#if !route.paid}
          <div class="my-4" data-aos="zoom-in" data-aos-delay="400">
            <button 
              on:click={pay} 
              class="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold text-xl rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <CreditCard class="mr-2" size={24} />
              {contenu[lang].payNow} - €{route.price}
            </button>
          </div>
        {:else}
          <div class="my-4 bg-green-500/20 p-6 rounded-xl backdrop-blur-sm border border-green-500/40" data-aos="fade-up" data-aos-delay="400">
            <div class="flex items-center justify-center space-x-3">
              <div class="bg-green-500/30 p-2 rounded-full">
                <CreditCard class="text-green-400" size={28} />
              </div>
              <p class="text-green-300 font-medium text-lg">{contenu[lang].paymentSuccess}</p>
            </div>
          </div>
        {/if}

        <!-- Owner Contact -->
        <div class="bg-white/20 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20" data-aos="fade-up">
          <div class="flex items-center space-x-3 mb-4">
            <Phone class="text-purple-400" size={24} />
            <h2 class="text-xl font-medium text-white">{contenu[lang].ownerContact}</h2>
          </div>
          <p class="text-gray-200 text-lg pl-9">{route.ownerContact}</p>
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Departure -->
          <div class="bg-white/20 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20" data-aos="fade-right">
            <div class="flex items-center space-x-3 mb-4">
              <MapPin class="text-purple-400" size={24} />
              <h2 class="text-xl font-medium text-white">{contenu[lang].departure}</h2>
            </div>
            <div class="space-y-4 pl-9">
              <p class="text-gray-200">{route.depart}</p>
              {#if route.departComment}
                <p class="text-gray-400 italic">{route.departComment}</p>
              {/if}
              <div class="bg-white/5 p-4 rounded-lg">
                <p class="text-purple-400 font-medium mb-2">{contenu[lang].contact}</p>
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
              <h2 class="text-xl font-medium text-white">{contenu[lang].arrival}</h2>
            </div>
            <div class="space-y-4 pl-9">
              <p class="text-gray-200">{route.arrival}</p>
              {#if route.arrivalComment}
                <p class="text-gray-400 italic">{route.arrivalComment}</p>
              {/if}
              <div class="bg-white/5 p-4 rounded-lg">
                <p class="text-purple-400 font-medium mb-2">{contenu[lang].contact}</p>
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
              <h2 class="text-xl font-medium text-white">{contenu[lang].availability}</h2>
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
              {#if route.vType.toLowerCase() === 'moto' || route.vType.toLowerCase() === 'motorcycle'}
                <Bike class="text-purple-400" size={24} />
              {:else}
                <Car class="text-purple-400" size={24} />
              {/if}
              <h2 class="text-xl font-medium text-white">{contenu[lang].vehicleDetails}</h2>
            </div>
            <div class="grid gap-3 pl-9">
              <div class="grid grid-cols-2 gap-2">
                <span class="text-gray-400">{contenu[lang].type}</span>
                <span class="text-gray-200">{route.vType}</span>
                
                <span class="text-gray-400">{contenu[lang].make}</span>
                <span class="text-gray-200">{route.vMark}</span>
                
                <span class="text-gray-400">{contenu[lang].licensePlate}</span>
                <span class="text-gray-200">{route.vImmatriculation}</span>
                
                <span class="text-gray-400">{contenu[lang].capacity}</span>
                <span class="text-gray-200">{route.vCap}</span>
                
                <span class="text-gray-400">{contenu[lang].transmission}</span>
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
          <p class="text-gray-300 text-lg">{contenu[lang].loading}</p>
        </div>
      </div>
    {/if}
  </div>
</div>