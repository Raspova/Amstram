<script lang="ts">
  import { browser } from "$app/environment";
  import {
    MapPin,
    PlugZap,
    Fuel,
    ChevronDown,
    Truck,
    Wrench,
    Anchor,
    Droplets,
    AlertCircle
  } from "lucide-svelte";
  import {
    Instagram as InstagramIcon,
    Facebook as FacebookIcon,
  } from "svelte-simples";
  import Login from "$lib/components/auth/Login.svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import { onMount } from "svelte";
  import AOS from "aos";
  import Eumap from "$lib/components/Eumap.svelte";
  import { calculatePrice, getUser , calculatePriceDepanage } from "$lib/appwrite";
  import { contenu } from "$lib/contenu";
  import AddressInput from "$lib/components/AddressInput.svelte";
  import { goto } from "$app/navigation";
  import Header from "$lib/components/Header.svelte";

  import PasswordProtection from "$lib/components/PasswordProtection.svelte";

  let isAuthenticated = false;

  function handlePasswordCorrect() {
    isAuthenticated = true;
  }

  let currentSection = 0;
  const totalSections = 4; // Updated to include the footer
  let lang = "fr";
  let isScrolling = false;
  let lastScrollTime = 0;
  let departInput: AddressInput;
  let arrivalInput: AddressInput;
  let selectedVehicle: string;
  let selectedDepannage: string = "";
  let selectedService: string = "Convoyage"; // Variable pour stocker le service sélectionné
  let price_set: boolean = false;
  let price_car: number = 0;
  let price_truck: number = 0;
  let reserveButton: HTMLButtonElement;
  let loginComponent: Login;
  let depart_set = false;
  let arrival_set = false;
  let act = false;
  let data_price: any;
  let last_service = "";
  let last_price : number = 0;
  let liter_essence : number = 20;
  let showDepannageDropdown = false;
  let max_essence : number = 60;
  let type_essense :number = 0;
  let essence : {
    id: number;
    name: string;
    short_name: string;
    type: string;
    picto: string;
    price: number;
}[] = [
  {
    "id": 1,
    "name": "Gazole",
    "short_name": "Gazole",
    "type": "D",
    "picto": "B7",
    "price":-2
  },
  {
    "id": 3,
    "name": "Ethanol E85",
    "short_name": "E85",
    "type": "E",
    "picto": "E85",
    "price":-2
  },
  {
    "id": 5,
    "name": "Sans Plomb 95 E10",
    "short_name": "SP95-E10",
    "type": "E",
    "picto": "E10",
    "price":-2
  },
  {
    "id": 2,
    "name": "Sans Plomb 95",
    "short_name": "SP95",
    "type": "E",
    "picto": "E5",
    "price":-2
  },
  {
    "id": 6,
    "name": "Sans Plomb 98",
    "short_name": "SP98",
    "type": "E",
    "picto": "E5",
    "price":-2
  },
  
]


let route_depanage_price = 0;

  async function handleDepartSet(event: CustomEvent) {
    depart_set = event.detail;
    if (arrivalInput) arrivalInput.setShowAutocomplete(false);
    //if (selectedService == "Dépannage") {
    //}
    if (!depart_set) return;
    calculatePriceDepanage(departInput.getValue()).then(res => {
      route_depanage_price = res.price;
    })
    //console.log("HOOOOO : " ,res  )
  }

  function handleArrivalSet(event: CustomEvent) {
    arrival_set = event.detail;
    departInput.setShowAutocomplete(false);
  }

  function handleScroll(event: WheelEvent) {
    event.preventDefault();
    const now = new Date().getTime();
    if (now - lastScrollTime < 1000 || isScrolling) return;

    isScrolling = true;
    lastScrollTime = now;

    if (event.deltaY > 0 && currentSection < totalSections - 1) {
      scrollToSection(currentSection + 1);
    } else if (event.deltaY < 0 && currentSection > 0) {
      scrollToSection(currentSection - 1);
    }

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
  function nextStep(service: string, price: number) {
    goto(
      "/reserve?" +
        new URLSearchParams({
          lang: lang,
          service: service,
          r1: departInput.getValue(),
          r2: arrivalInput.getValue(),
          selected: selectedVehicle,
          // serviceType: selectedService
        }).toString(),
    );
  }
  function updateParallax() {
    const parallaxElements = document.querySelectorAll(".parallax-bg");
    parallaxElements.forEach((el: Element) => {
      const speed = 0.5;
      const yPos = -(window.scrollY * speed);
      (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });
  }

  function scrollToEssenceSection() {
  // Attendre que le DOM soit mis à jour
  setTimeout(() => {
    // Trouver la section essence
    const essenceSection = document.querySelector('[data-essence-section]');
    if (essenceSection) {
      // Calculer si la section dépasse l'écran
      const rect = essenceSection.getBoundingClientRect();
      const isVisible = rect.bottom <= window.innerHeight;
      
      if (!isVisible) {
        // Faire défiler en douceur jusqu'à ce que la section soit visible
        essenceSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, 100);
}

function scrollIntoViewWhenVisible(node) {
  // Déclencher le défilement quand le noeud est monté dans le DOM
  scrollToEssenceSection();
  
  return {
    update() {
      // Déclencher le défilement quand les données sont mises à jour
      scrollToEssenceSection();
    }
  };
}
$: {
  if (selectedService == "Dépannage" && selectedDepannage == "Essence") {
    scrollToEssenceSection();
  }
}

$: {
  if (type_essense != 0) {
    scrollToEssenceSection();
  }
}

$: {
  if (liter_essence && selectedService == "Dépannage" && selectedDepannage == "Essence") {
    scrollToEssenceSection();
  }
}
  function updateScrollIndicators() {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        currentSection = index;
      }
    });
  }

  function onScroll() {
    updateParallax();
    updateScrollIndicators();
  }

  function scrollToSection(sectionIndex: number) {
    const sections = document.querySelectorAll(".section");
    if (sections[sectionIndex]) {
      const yOffset = 0; // Ajustez cette valeur si nécessaire pour tenir compte de l'en-tête fixe
      const y =
        sections[sectionIndex].getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  function scrollToSection1() {
    scrollToSection(0);
  }

  function scrollToSection2() {
    scrollToSection(1);
  }

  function scrollToSection3() {
    scrollToSection(2);
  }

  // Add a new function to scroll to the footer
  function scrollToFooter() {
    scrollToSection(totalSections - 1);
  }

  let currentIcon = 0;
  let iconInterval: number;
  let componentsInitialized = false;

// Dans la fonction onMount, ajoutez cette vérification avant d'essayer d'utiliser departInput et arrivalInput


// Fonction pour vérifier si les composants sont prêts avant d'exécuter une action
function checkComponentsReady(callback: Function) {
  if (componentsInitialized && departInput && arrivalInput) {
    callback();
  }
}
let isCalculatingPrice = false;
  
  // Modify your handlePrice function
  async function handlePrice(set_param: boolean = true) {
    if (!componentsInitialized || !departInput) {
      console.log("Les composants ne sont pas encore initialisés");
      return;
    }
    
    // Show loading animation
    isCalculatingPrice = true;
    
    try {
      const depart_value = departInput.getValue();
      const arrival_value = arrivalInput ? arrivalInput.getValue() : "";
      //if 
      // Calculate price
      data_price = await calculatePrice(depart_value, arrival_value, selectedVehicle || "");
      // Only proceed if we got valid data
      if (data_price) {
        price_set = true;
        price_car = data_price["car"]["price"];
        price_truck = data_price["truck"]["price"];
        
        if (set_param) {
          const params = new URLSearchParams({
            r1: depart_value,
            r2: arrival_value,
            selected: selectedVehicle || "",
            lang: lang
          });
          window.history.replaceState({}, '', `/?${params.toString()}`);
        }

        // Scroll to section and focus
        setTimeout(() => {
          scrollToSection(1);
          if (reserveButton) {
            reserveButton.focus();
          }
        }, 300); // Small delay to ensure modal closes first
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      // Hide loading animation - this MUST execute!
      isCalculatingPrice = false;
    }
  }
  function handleKeyDown(event: KeyboardEvent) {
    if (
      departInput.getShowAutocomplete() ||
      (arrivalInput && arrivalInput.getShowAutocomplete())
    ) {
      return;
    }
    if (event.key === "ArrowDown") {
      if (currentSection < totalSections - 1 && currentSection >= 0) {
        scrollToSection(currentSection + 1); // Changer de section vers le bas
        event.preventDefault(); // Empêcher le défilement de la page
      }
    } else if (event.key === "ArrowUp") {
      if (currentSection > 0 && currentSection <= totalSections - 1) {
        scrollToSection(currentSection - 1); // Changer de section vers le haut
        event.preventDefault(); // Empêcher le défilement de la page
      }
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !target.closest("#depannageType") &&
      !target.closest(".depannage-dropdown")
    ) {
      showDepannageDropdown = false;
      departInput.setShowAutocomplete(false);
      if (arrivalInput) arrivalInput.setShowAutocomplete(false);
    }
  } 



  async function reserve(service: string, price: number) {
    if (!act) return;
    const params = new URLSearchParams(window.location.search);
    params.set("service", service);
    params.set("serviceType", selectedService);
    window.history.replaceState({}, "", `/?${params.toString()}`);
    let user = await getUser();
    if (user) {
      //console.log("User is logged in", user);
      nextStep(service, price);
    } else {
      last_service = service;
      last_price = price;
      loginComponent.openAuthComponent();
    }
  }
  
onMount(() => {
  if (browser) {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });

    window.addEventListener('scroll', onScroll);
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClickOutside);

    if (window.location.hostname !== 'localhost') {
      alert("Site en développement, veuillez patienter pour utiliser ce service\n\
Experts en développement web, nous créons votre solution numérique de A à Z. Du site web à l'intelligence artificielle, en passant par le SEO et l'analyse de données - nous transformons votre vision en réalité digitale.\n\n\
layduhurdevelopment@gmail.com");
    }

    // Utilisation d'un setTimeout pour s'assurer que les composants sont initialisés
    setTimeout(() => {
      componentsInitialized = true;
      
      // Vérifiez si les valeurs sont définies dans l'URL
      const urlParams = new URLSearchParams(window.location.search);
      const depart = urlParams.get('r1');
      const arrival = urlParams.get('r2');
      const vehicle = urlParams.get('selected');
      const lang_buffer = urlParams.get('lang');
      const service = urlParams.get('service');
      const serviceType = urlParams.get('serviceType');
      
      if (lang_buffer) {
        lang = lang_buffer; 
      }
      if (serviceType) {
        selectedService = serviceType;
      }

      if (depart && departInput) {
        departInput.selectLocation(depart, true);
      }
      if (arrival && arrivalInput) {
        arrivalInput.selectLocation(arrival, true);
      }
      if (vehicle) {
        selectedVehicle = vehicle;
      }
      if (depart && arrival && vehicle && departInput && arrivalInput) {
        handlePrice(false).then(() => {
          if (service) {
            act = true;
            reserve(service, data_price[service]["price"]);  
          }
        });
      }
    }, 100); // Délai de 100ms pour s'assurer que les composants sont initialisés

    iconInterval = setInterval(() => {
      currentIcon = (currentIcon + 1) % 4;
    }, 3000) as unknown as number;
  
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickOutside);
      clearInterval(iconInterval);
    };
  }
});  
  function getPreviousMonthPeriod() {
    const today = new Date();
    let year = today.getFullYear();
    // Get previous month (0-11)
    let month = today.getMonth();
    
    // If it's January, go back to December of previous year
    if (month === 0) {
      month = 11;
      year--;
    } else {
      month--; // Otherwise just go back one month
    }
    
    // Format with leading zero for month
    const formattedMonth = String(month + 1).padStart(2, '0');
    return `${year}-${formattedMonth}`;
  }

  // Function to fetch fuel prices
  async function fetchFuelPrice(id : any) {
    try {
      const period = getPreviousMonthPeriod();
      const response = await fetch(`https://api.prix-carburants.2aaz.fr/fuel/${id}/price/${period}`);
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      const data = await response.json();
      return data.PriceTTC ? parseFloat(data.PriceTTC.value) : -1;
 
    } catch (error) {
      console.error("Failed to fetch fuel price:", error);
      return -1;  
     
    }
  }
  //SERVICE TYPE Reactive
  $: {
    try {
      const params = new URLSearchParams(window.location.search);
      params.set("serviceType", selectedService);
      window.history.replaceState({}, "", `/?${params.toString()}`);
      if (selectedService == "Dépannage") arrivalInput.empty();
      else selectedDepannage = "";
    } catch {}
  }

 

  
  // This is exactly what you asked for
  $: {
    if (type_essense != 0) {
      // Find the essence item with this ID
      const index = essence.findIndex(e => e.id === type_essense);
      if (index !== -1) {
        // Mark as loading
        if (essence[index].price == -2) {
          (async () => {
            essence[index].price = await fetchFuelPrice(type_essense) + 0.25;
            essence = [...essence]; // Trigger reactivity
          })();
        }        
        // Fetch the price
      }
    }
  }
  //$: console.log(selectedDepannage);
</script>

<svelte:head>
  <meta
    name="keywords"
    content="livraison de véhicules, livraison en europe, livraison en corse, transport de véhicules, livraison sur mesure, transport sur mesure, véhicules de collection, véhicules de luxe, transport de voiture, transport de camion, transport de motocyclette, service de transport de véhicules, livraison de voiture, livraison de camion, livraison de motocyclette"
  />
</svelte:head>

<PasswordProtection onPasswordCorrect={handlePasswordCorrect} />

{#if isAuthenticated}

{#if isCalculatingPrice}
<div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
  <div class="bg-black bg-opacity-80 p-8 rounded-xl border border-amstram-purple shadow-lg max-w-md w-full mx-auto">
    <div class="flex flex-col items-center">
      <h3 class="text-2xl font-bold text-white mb-6">{contenu[lang].calculatingPrice || "Calcul en cours..."}</h3>
      
      <div class="relative w-full h-16 mb-6 overflow-hidden">
        <div class="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div class="bg-amstram-purple h-full animate-pulse rounded-full"></div>
        </div>
        
        <img 
          src="/truck.webp" 
          alt="Truck" 
          class="absolute h-12 top-4 truck-calculation-animation"
        />
      </div>
      
      <p class="text-gray-300 text-center">
        {contenu[lang].calculatingPriceMessage || "Nous calculons le meilleur tarif pour votre trajet."}
      </p>
    </div>
  </div>
</div>
{/if}

  <main class="w-full text-amstram-white font-sans">
    <div
      class="section min-h-screen flex flex-col relative transition-colors duration-1000"
    >
      <img
        src="/side.webp"
        alt="Décoration latérale"
        class="absolute left-0 top-20 h-full object-cover hidden md:block parallax-bg"
        style="z-index: -1;"
      />
      <Header
        bind:lang
        bind:loginComponent
        {last_service}
        {last_price}
        {reserve}
      />
      <div class="w-full flex-grow" data-aos="fade-up" data-aos-duration="1500">
        <section class="max-w-7xl 2xl:max-w-[70%] mx-auto mt-24 px-4 sm:px-8 ">
          <h2 class="text-5xl font-bold mb-12 text-center 2xl:-mt-20 xl:mb-24">
            {contenu[lang][selectedService].title}
          </h2>

          <div class="flex justify-center mb-8">
            <div
              class="grid grid-cols-3 gap-2 bg-black bg-opacity-10 p-2 rounded-lg max-w-full"
            >
              <button
                class="{selectedService === 'Convoyage'
                  ? 'bg-amstram-purple text-white border-2 border-white'
                  : 'text-gray-300 border border-gray-500'} flex items-center justify-center py-2 px-3 rounded-lg transition-all duration-300"
                on:click={() => (selectedService = "Convoyage")}
              >
                <Truck class="mr-2" size={20} />
                {contenu[lang]["Convoyage"].name}
              </button>
              <button
                class="{selectedService === 'Dépannage'
                  ? 'bg-amstram-purple text-white border-2 border-white'
                  : 'text-gray-300 border border-gray-500'} flex items-center justify-center py-2 px-3 rounded-lg transition-all duration-300"
                on:click={() => (selectedService = "Dépannage")}
              >
                <div
                  class="relative w-5 h-5 mr-2 flex items-center justify-center"
                >
                  <div
                    class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out opacity-0 transform transition-transform"
                    class:opacity-100={currentIcon === 0}
                    class:scale-100={currentIcon === 0}
                    class:scale-75={currentIcon !== 0}
                  >
                    <PlugZap size={20} />
                  </div>
                  <div
                    class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out opacity-0 transform transition-transform"
                    class:opacity-100={currentIcon === 1}
                    class:scale-100={currentIcon === 1}
                    class:scale-75={currentIcon !== 1}
                  >
                    <Fuel size={20} />
                  </div>
                  <div
                    class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out opacity-0 transform transition-transform"
                    class:opacity-100={currentIcon === 2}
                    class:scale-100={currentIcon === 2}
                    class:scale-75={currentIcon !== 2}
                  >
                    <Wrench size={20} />
                  </div>
                  <div
                    class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out opacity-0 transform transition-transform"
                    class:opacity-100={currentIcon === 3}
                    class:scale-100={currentIcon === 3}
                    class:scale-75={currentIcon !== 3}
                  >
                    <Droplets size={20} />
                  </div>
                </div>
                {contenu[lang]["Dépannage"].name}
              </button>
              <button
                class="{selectedService === 'Remorquage'
                  ? 'bg-amstram-purple text-white border-2 border-white'
                  : 'text-gray-300 border border-gray-500'} flex items-center justify-center py-2 px-3 rounded-lg transition-all duration-300  bg-gray-500"
                on:click={() => (selectedService = "Remorquage")}
                disabled={true}
              >
                <Anchor class="mr-2" size={20} />
                {contenu[lang]["Remorquage"].name}
              </button>
            </div>
          </div>

          <form class="grid grid-cols-1 md:grid-cols-4 gap-6 ml-10 mr-10">
            <AddressInput
              bind:this={departInput}
              {lang}
              on:value_set={handleDepartSet}
              focus={true}
              placeholder={ selectedService != "Dépannage" ? contenu[lang].departLocation : "Lieux de prise en charge"}
            />
            {#if selectedService == "Dépannage"}
              <div class="relative">
                <label for="vehicleType" class="sr-only"
                  >{contenu[lang].depannage_type}</label
                >
                <!-- Bouton qui sert de déclencheur pour le menu déroulant -->
                <button
                  type="button"
                  id="depannageType"
                  class="w-full pl-4 pr-12 py-3 rounded-lg bg-white text-amstram-black appearance-none text-lg flex items-center justify-between {selectedDepannage
                    ? 'outline outline-2 outline-amstram-purple'
                    : ''}"
                  on:click={() =>
                    (showDepannageDropdown = !showDepannageDropdown)}
                >
                  <span
                    >{selectedDepannage
                      ? selectedDepannage
                      : contenu[lang].depannage_type}</span
                  >
                  <ChevronDown class="text-gray-400 " />
                </button>

                <!-- Menu déroulant avec icônes -->
                {#if showDepannageDropdown}
                  <div
                    class="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg py-1 text-amstram-black"
                  >
                    {#each contenu[lang].depannage as type}
                      <button
                        type="button"
                        class="w-full px-4 py-2 text-left flex items-center  {(type.icon == "PlugZap" ? "bg-gray-600"  : "hover:bg-gray-100")}"
                        disabled={(type.icon == "PlugZap" ? true  : false)}
                        on:click={() => {
                          selectedDepannage = type.id;
                          showDepannageDropdown = false;
                        }}
                      >
                        {#if type.icon === "Wrench"}
                          <Wrench size={20} class="mr-3" />
                        {:else if type.icon === "Fuel"}
                          <Fuel size={20} class="mr-3" />
                        {:else if type.icon === "PlugZap"}
                          <PlugZap size={20} class="mr-3" />
                        {:else if type.icon === "Droplets"}
                          <Droplets size={20} class="mr-3" />
                        {/if}
                        {type.name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            {:else}
              <AddressInput
                bind:this={arrivalInput}
                {lang}
                on:value_set={handleArrivalSet}
                placeholder={contenu[lang].arrivalLocation + (selectedService == "Remorquage" ? " "+contenu[lang].optional : "")}
                countryCode="FRA,CHE,ITA,ESP,NLD,BEL,DEU,POL"
              />
            {/if}

            <div class="relative">
              <label for="vehicleType" class="sr-only"
                >{contenu[lang].vehicleType}</label
              >
              
              {#if selectedDepannage != "Essence"}
              <select
                id="vehicleType"
                class="w-full pl-4 pr-12 py-3 rounded-lg bg-white text-amstram-black appearance-none text-lg {selectedVehicle
                  ? 'outline outline-2 outline-amstram-purple'
                  : ''}"
                bind:value={selectedVehicle}
              >
                <option disabled selected value=""
                >{contenu[lang].vehicleType}</option
                >
                {#each contenu[lang].vehicleTypes as type}
                <option value={type}>{type}</option>
                {/each}
              </select>
              <div
              class="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2"
              >
              <ChevronDown class="text-gray-400" />
              <!-- CHEVRON POS A DROITE -->
            </div>
            {/if }
          </div>
            <!-- EL BUTTON RESERVER-->
            <button
              on:click={(event) => {
                event.preventDefault();
                handlePrice(true);
              }}
              bind:this={reserveButton}
              disabled={!(
                (selectedVehicle || (selectedService == "Dépannage" && selectedDepannage == "Essence" && type_essense != 0  )) &&
                (arrival_set || selectedDepannage != "" || selectedService == "Remorquage") &&
                depart_set && (selectedService != "Dépannage" || (route_depanage_price != 0 && route_depanage_price != -1))
              )}
              class="{ (selectedVehicle || (selectedService == "Dépannage" && selectedDepannage == "Essence" && type_essense != 0 )) &&
              (arrival_set || selectedDepannage != '' || selectedService == "Remorquage") &&
              depart_set && (selectedService != "Dépannage" || (route_depanage_price != 0 && route_depanage_price != -1))
                ? 'bg-amstram-purple scale-105 transition-all duration-1000'
                : 'bg-black bg-opacity-10'} text-white py-3 px-6 rounded-lg text-lg font-semibold"
              >{contenu[lang].reserve}</button
            >
          </form>
          <!-- ESSENCE ADDITIONAL INPUT  "-->
          {#if selectedService == "Dépannage" && selectedDepannage == "Essence"}
  <div class="bg-black/20 backdrop-blur-sm rounded-lg p-4 mx-10 my-4 border border-gray-500 mt-12 pt-2"
      data-essence-section 
      use:scrollIntoViewWhenVisible>
    <h3 class="text-white font-semibold mb-3 flex items-center">
      <Fuel class="mr-2" size={20} />
      Type de carburant
    </h3>
    
    
 
    <div class="relative mb-6">
      <select 
        bind:value={type_essense} 
        class=" pl-4 pr-12 py-3 rounded-lg bg-white text-amstram-black appearance-none text-lg w-[100%] md:w-auto"
      >
        <option disabled selected value={0}>Sélectionnez votre carburant</option>
        {#each essence as carburant, index}
          <option value={carburant.id}>{carburant.name}</option>
        {/each}
      </select>
      <!-- <div class="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
        <ChevronDown class="text-gray-400" />
      </div> -->
    </div>
    
    {#if type_essense > 0}
      <div class="mt-3 mb-6 flex items-center justify-between bg-white/20 p-2 rounded-lg  ">
        <div class="flex items-center">
          <div class="bg-amstram-purple text-white rounded-full p-1 mr-2">
            {essence.find(e => e.id === type_essense)?.picto || ''}
          </div>
          <span class="text-white">
            {essence.find(e => e.id === type_essense)?.short_name || ''}
          </span>
        </div>
        
        {#if essence.find(e => e.id === type_essense)?.price > 0}
          <div class="bg-amstram-purple/80 text-white px-3 py-1 rounded-lg font-semibold">
            {essence.find(e => e.id === type_essense)?.price.toFixed(2)} €/L
          </div>
        {:else if essence.find(e => e.id === type_essense)?.price === -2}
          <div class="bg-gray-600/80 text-white px-3 py-1 rounded-lg flex items-center">
            <div class="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            Chargement...
          </div>
        {:else}
          <div class="bg-red-500/80 text-white px-3 py-1 rounded-lg">
            Prix indisponible
          </div>
        {/if}
      </div>
 
      <!-- Fuel quantity slider -->
      <div class="mt-6">
        <h3 class="text-white font-semibold mb-3 flex items-center">
          <Droplets class="mr-2" size={20} />
          Quantité ({liter_essence} litres)
        </h3>
        
        <div class="relative">
          <input 
            type="range" 
            min="20" 
            max="{max_essence}" 
            step="20" 
            bind:value={liter_essence}
            class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-amstram-purple"
          />
          
          <!-- Tick marks for values -->
          <div class="w-full flex justify-between text-xs text-white mt-2">
            <span>20L</span>
            <span>40L</span>
            <span>60L</span>
          </div>
        </div>
        
        <!-- Visual representation of fuel amount and total price -->
        <div class="mt-4 bg-white/10 rounded-lg p-2">
          <div class="relative h-8 bg-gray-700 rounded overflow-hidden">
            <div 
              class="absolute h-full bg-amstram-purple transition-all duration-300 flex items-center justify-end pr-2"
              style="width: {(liter_essence/max_essence) * 100}%;"
            >
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-white font-bold drop-shadow-lg">{liter_essence} L</span>
            </div>
          </div>
          
          {#if essence.find(e => e.id === type_essense)?.price > 0}
            <div class="mt-3 flex flex-col  bg-white/20 p-2 rounded-lg my-2">
              <div  class="flex justify-between items-center">
                <span class="text-white">Prix estimé:</span>
                <span class="text-white font-bold">
                  {(essence.find(e => e.id === type_essense)?.price * liter_essence).toFixed(2)} €
                </span>
              </div>
              {#if route_depanage_price != 0 && route_depanage_price != -1 && selectedService == "Dépannage"}
              <div class="flex justify-between items-center my-2 ">
                <span class="text-white">
                  Frais de déplacement 
                </span>
                <span class="text-white font-bold">
                  {route_depanage_price.toFixed(2)} €
                </span>
              </div>
              <div class="flex justify-between items-center my-2 ">
                <span class="text-white">
                  Prix Total: 
                </span>
                <span class="text-white font-bold">
                  {(route_depanage_price + (essence.find(e => e.id === type_essense)?.price * liter_essence) ).toFixed(2)} €
                </span>
              </div>
              {:else if route_depanage_price == -1}
              <div class="bg-red-900/30 backdrop-blur-sm p-4 rounded-lg border border-red-500/50 mb-6">
                <div class="flex items-center space-x-3">
                  <AlertCircle class="text-red-400" size={24} />
                  <p class="text-white font-medium">
                    Service disponible uniquement à Paris et sa banlieue
                  </p>
                </div>
              </div>
            {/if}
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
{/if}
        </section>
        
        {#if selectedDepannage != "Essence" }
        <section class="max-w-7xl 2xl:max-w-[70%] mx-auto lg:mr-16 mt-10 px-4 sm:px-8 flex flex-col md:flex-row items-center">
          <div class="lg:w-1/2 mb-12 md:mb-0">
            {#if route_depanage_price != 0 && route_depanage_price != -1 && selectedService == "Dépannage" && selectedDepannage != ""}
              <div class="bg-black/30 backdrop-blur-sm p-5 rounded-lg border border-amstram-purple/30 mb-6">
                <div class="flex items-center space-x-3 mb-4">
                  <Truck class="text-amstram-purple" size={24} />
                  <h3 class="text-white text-xl font-semibold">Résumé des frais</h3>
                </div>
                
                <div class="space-y-3">
                  <!-- Travel fees -->
                  <div class="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div class="flex items-center space-x-2">
                      <MapPin class="text-amstram-purple" size={20} />
                      <span class="text-gray-300">Frais de déplacement</span>
                    </div>
                    <span class="text-white font-semibold">
                      {route_depanage_price.toFixed(2)} €
                    </span>
                  </div>
                  
                  <!-- Service fee if applicable -->
                  {#if selectedDepannage == "Vidange"}
                    <div class="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div class="flex items-center space-x-2">
                        <Droplets class="text-amstram-purple" size={20} />
                        <span class="text-gray-300">Forfait d'intervention</span>
                      </div>
                      <span class="text-white font-semibold">
                        80.00 €
                      </span>
                    </div>
                    
                    <!-- Total -->
                    <div class="flex justify-between items-center p-4 bg-amstram-purple/20 rounded-lg mt-4 border-t border-amstram-purple/30">
                      <span class="text-white font-bold">Prix total estimé</span>
                      <span class="text-white text-xl font-bold">
                        {(route_depanage_price + 80).toFixed(2)} €
                      </span>
                    </div>
                    {:else if selectedDepannage = "Dépannage"}
                    <!-- Just travel fee as total -->
                    <div class="flex justify-between items-center p-4 bg-amstram-purple/20 rounded-lg mt-4 border-t border-amstram-purple/30">
                      <span class="text-white font-bold">Le prix de l'intervention sera evaluer sur place</span>
                       
                    </div>
                  {:else}
                    <!-- Just travel fee as total -->
                    <div class="flex justify-between items-center p-4 bg-amstram-purple/20 rounded-lg mt-4 border-t border-amstram-purple/30">
                      <span class="text-white font-bold">Prix total estimé</span>
                      <span class="text-white text-xl font-bold">
                        {route_depanage_price.toFixed(2)} €
                      </span>
                    </div>
                  {/if}
                </div>
              </div>
            {:else if route_depanage_price == -1 && selectedService == "Dépannage"}
              <div class="bg-red-900/30 backdrop-blur-sm p-4 rounded-lg border border-red-500/50 mb-6">
                <div class="flex items-center space-x-3">
                  <AlertCircle class="text-red-400" size={24} />
                  <p class="text-white font-medium">
                    Service disponible uniquement à Paris et sa banlieue
                  </p>
                </div>
              </div>
            {/if}
          
            {#if selectedService != "Dépannage" || (selectedDepannage == "" || !depart_set)}
              
            <p class="text-5xl font-bold mb-6">{contenu[lang].subtitle}</p>
            
            <p class="text-gray-300 text-3xl">
              {#if selectedService != "Dépannage"}
                {contenu[lang][selectedService].description}
              {:else  }
                 <p class="block lg:hidden text-center text-gray-300 text-xl font-bold   mb-4">Service disponible uniquement à Paris et sa banlieue.</p>

                <div class="space-y-1 text-xl">
                  <div class="flex items-center gap-3">
                    <Wrench size="20" class=" flex-shrink-0" />
                    <span>{contenu[lang][selectedService].description[0]}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <Fuel size="20" class="  flex-shrink-0" />
                    <span>{contenu[lang][selectedService].description[1]}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <PlugZap size="20" class=" flex-shrink-0" />
                    <span>{contenu[lang][selectedService].description[2]}</span>
                  </div>
                </div>
              {/if}
            </p>
            {/if}
            
            <div class="flex mt-8 mb-2 space-x-4">
              <a
                href="https://www.instagram.com/amstram.eu"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
              >
                <InstagramIcon size="24" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61573754154420"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
              >
                <FacebookIcon size="24" />
              </a>
            </div>
          </div>
          {#if lang != "mu"}
          {#if selectedService != "Convoyage" }
          <div class="flex flex-col hidden lg:block ml-10">

            <p class="text-center text-gray-300 text-xl font-bold   mb-4">Service disponible uniquement à Paris et sa banlieue.</p>
            <div class="flex justify-center">

              <img src="/paris.png" class=" w-[400px]" alt="carte de Paris" >
            </div>
          </div>
          {:else}
           <div class="hidden lg:block flex justify-center">
            <Eumap />
          </div>
          {/if}
          {:else}
          <img src="map-mu.png" alt="map of glorious mauritus" class="hidden md:flex md:w-1/3 lg:w-1/4 mx-auto">
          {/if}
        </section>
        {/if}
        <img
          src="/truck.webp"
          alt="Truck"
          class="absolute left-0 bottom-0 w-1/8 md:w-1/12 truck-animation hidden md:block"
          data-aos="fade-left"
          data-aos-duration="3000"
          data-aos-delay="2000"
          data-aos-offset="0"
        />
      </div>
    </div>

    <div
      class="section w-full bg-gray-100 bg-hero-patern-b relative overflow-hidden transition-colors duration-1000"
    >
      <img
        src="/side2.webp"
        alt="Décoration latérale"
        class="absolute right-0 bottom-0 object-cover hidden lg:block opacity-50 parallax-bg"
        style="z-index: 1;"
      />
      <div
        class="min-h-screen flex flex-col justify-center py-12 relative"
        style="z-index: 2;"
      >
        <h2
          class="text-5xl font-bold mb-5 text-center text-amstram-black"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          {contenu[lang].offersTitle}
        </h2>
        <section
          class="max-w-7xl mx-auto mt-12 px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <Card.Root
            class="relative bg-white bg-opacity-40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <Card.Header class="pt-16">
              <Card.Title
                class="text-3xl font-bold mb-4 absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10 text-amstram-black text-center w-full px-4 mt-4"
                >{contenu[lang].piloteExpress.title}</Card.Title
              >
              {#if price_set}
                <p class="text-gray-700 text-2xl text-center">
                  {price_car} € T.T.C
                </p>
              {/if}
            </Card.Header>
            <Card.Content>
              <img
                src="driver.webp"
                alt="Pilote Express"
                class="w-full h-48 object-cover rounded-lg mb-6"
              />
              <p class="text-gray-700 text-lg text-center">
                {contenu[lang].piloteExpress.description}
              </p>
              <ul class="text-gray-700 mt-4 list-disc pl-5">
                <li>{contenu[lang].piloteExpress.features[0]}</li>
                <li>{contenu[lang].piloteExpress.features[1]}</li>
              </ul>
              {#if price_set}
                <button
                  on:click={() => {
                    act = true;
                    reserve("car", price_car);
                  }}
                  class="w-full bg-amstram-purple text-white px-4 py-2 rounded-lg mt-4"
                  >{contenu[lang].reserve}</button
                >
              {/if}
            </Card.Content>
          </Card.Root>

          <Card.Root
            class="relative bg-white bg-opacity-40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <Card.Header class="pt-16">
              <Card.Title
                class="text-3xl font-bold mb-4 absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10 text-amstram-black text-center w-full px-4 mt-4"
                >{contenu[lang].coconRoulant.title}</Card.Title
              >
              {#if price_set}
                <p class="text-gray-700 text-2xl text-center">
                  {price_truck} € T.T.C
                </p>
              {/if}
            </Card.Header>
            <Card.Content>
              <img
                src="porte-voitures1.webp"
                alt="Cocon Roulant"
                class="w-full h-48 object-cover rounded-lg mb-6"
              />
              <p class="text-gray-700 text-lg text-center">
                {contenu[lang].coconRoulant.description}
              </p>
              <ul class="text-gray-700 mt-4 list-disc pl-5">
                <li>{contenu[lang].coconRoulant.features[0]}</li>
                <li>{contenu[lang].coconRoulant.features[1]}</li>
              </ul>
              {#if price_set}
                <button
                  on:click={() => {
                    act = true;
                    reserve("truck", price_truck);
                  }}
                  class="w-full bg-amstram-purple text-white px-4 py-2 rounded-lg mt-4"
                  >{contenu[lang].reserve}</button
                >
              {/if}
            </Card.Content>
          </Card.Root>
        </section>
      </div>
    </div>

    <div
      class="section min-h-screen flex flex-col relative overflow-hidden transition-colors duration-1000"
    >
      <img
        src="/side1.webp"
        alt="Décoration latérale"
        class="absolute left-1 -bottom-0 h-3/4 w-50 object-cover hidden lg:block"
        style="z-index: -1;"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="200"
      />
      <section class="max-w-7xl mx-auto mt-24 px-4 sm:px-8 flex-grow relative">
        <img
          src="/side0.webp"
          alt="Décoration latérale"
          class="absolute right-0 bottom-10 w-1/3 w-50 object-cover hidden lg:block parallax-bg"
          style="z-index: -1;"
        />

        <h2
          class="text-4xl font-bold mb-12 text-center text-amstram-white"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          {contenu[lang].why_choose_us}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div
            class="bg-black bg-opacity-80 outline outline-1 outline-white p-6 rounded-xl"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="100"
          >
            <div class="flex items-start mb-4">
              <svg
                class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                ></path>
              </svg>
              <h3 class="text-4xl font-semibold text-amstram-white">
                {contenu[lang].card1Title}
              </h3>
            </div>
            <p class="text-gray-300 text-2xl">
              {contenu[lang].card1Description}
            </p>
          </div>
          <div
            class="bg-black bg-opacity-80 outline outline-1 outline-white p-6 rounded-xl"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="200"
          >
            <div class="flex items-start mb-4">
              <svg
                class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
              <h3 class="text-4xl font-semibold text-amstram-white">
                {contenu[lang].card2Title}
              </h3>
            </div>
            <p class="text-gray-300 text-2xl">
              {contenu[lang].card2Description}
            </p>
          </div>
          <div
            class="bg-black bg-opacity-90 outline outline-1 outline-white p-6 rounded-xl"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="300"
          >
            <div class="flex items-start mb-4">
              <svg
                class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08 .402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 class="text-4xl font-semibold text-amstram-white">
                {contenu[lang].card3Title}
              </h3>
            </div>
            <p class="text-gray-300 text-2xl">
              {contenu[lang].card3Description}
            </p>
          </div>
          <div
            class="bg-black bg-opacity-80 outline outline-1 outline-white p-6 rounded-xl"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="400"
          >
            <div class="flex items-start mb-4">
              <svg
                class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 class="text-4xl font-semibold text-amstram-white">
                {contenu[lang].card4Title}
              </h3>
            </div>
            <p class="text-gray-300 text-2xl">
              {contenu[lang].card4Description}
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- Indicateurs de position de défilement -->
    <div class="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      <div class="flex flex-col space-y-2">
        <button
          type="button"
          class="w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer"
          class:active={currentSection === 0}
          on:click={() => scrollToSection(0)}
          on:keydown={(e) => e.key === "Enter" && scrollToSection(0)}
          aria-label="Aller à la section 1"
        >
        </button>
        <button
          type="button"
          class="w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer"
          class:active={currentSection === 1}
          on:click={() => scrollToSection(1)}
          on:keydown={(e) => e.key === "Enter" && scrollToSection(1)}
          aria-label="Aller à la section 2"
        >
        </button>
        <button
          type="button"
          class="w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer"
          class:active={currentSection === 2}
          on:click={() => scrollToSection(2)}
          on:keydown={(e) => e.key === "Enter" && scrollToSection(2)}
          aria-label="Aller à la section 3"
        >
        </button>
        <button
          type="button"
          class="w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer"
          class:active={currentSection === 3}
          on:click={scrollToFooter}
          on:keydown={(e) => e.key === "Enter" && scrollToFooter()}
          aria-label="Aller au pied de page"
        >
        </button>
      </div>
    </div>

    <div class="section bg-gray-900 py-8 w-full">
      <footer class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-gray-300">
          {contenu[lang].footer}
        </p>
        <p class="text-gray-300">
          <a
            href="/general_condition"
            class="text-amstram-white hover:underline">{contenu[lang].terms}</a
          >
          |
          <a href="/confidentiality" class="text-amstram-white hover:underline"
            >{contenu[lang].privacy}</a
          >
        </p>
        <div
          class="text-gray-300 flex flex-col md:flex-row justify-between items-center"
        >
          <div class="md:text-left text-center py-2">
            {contenu[lang].contact} - <a
              href="mailto:administration@amstram.eu"
              class="text-white text-lg font-bold hover:underline"
              >administration@amstram.eu</a
            ><br />
            (CTO) Jonathan Layduhur -
            <a
              href="mailto:layduhurdevelopment@gmail.com"
              class="text-white text-lg font-bold hover:underline"
              >layduhurdevelopment@gmail.com</a
            ><br />
          </div>
          <div class="py-2">
            Adresse : 10 Rue de la Paix, 75002 Paris<br />
            {contenu[lang].phone} :
            <!--
            -->
            <a
              href="tel:+33652940060"
              class="text-amstram-white hover:underline"
            >
              06 52 94 00 60</a
            >
            <div class="flex mt-4 justify-center md:justify-end space-x-4">
              <a
                href="https://www.instagram.com/amstram.eu"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 bg-amstram-black rounded-full hover:bg-opacity-80 transition-all duration-300"
              >
                <InstagramIcon size="20" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61573754154420"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 bg-amstram-black rounded-full hover:bg-opacity-80 transition-all duration-300"
              >
                <FacebookIcon size="20" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </main>
{/if}

<style>
  .parallax-bg {
    transition: transform 0.8s ease-out;
  }

  .scroll-indicator {
    opacity: 0.5;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .scroll-indicator.active {
    opacity: 1;
    transform: scale(1.5);
  }

  .section {
    transition: background-color 0.8s ease;
  }

  @keyframes truckCalculationMove {
    0% {
      transform: translateX(-50px);
    }
    100% {
      transform: translateX(calc(100% + 50px));
    }
  }

  .truck-calculation-animation {
    animation: truckCalculationMove 1.5s infinite ease-in-out;
  }

  @keyframes truckMove {
    0% {
      transform: translateX(0);
      opacity: 0.3;
    }
    70% {
      transform: translateX(65vw);
      opacity: 1;
    }
    100% {
      transform: translateX(90vw);
      opacity: 0;
    }
  }

  @keyframes truckMove1 {
    0% {
      transform: translateY(100vh);
      opacity: 1;
    }
    20% {
      opacity: 1;
    }
    80% {
      transform: translateY(20vh);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .truck-animation {
    animation: truckMove 2s ease-in-out 1s forwards;
  }
  .section:last-child {
    min-height: auto;
  }
</style>
