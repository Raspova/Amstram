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
  import { calculatePrice, getUser } from "$lib/appwrite";
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
  let last_price = 0;
  let showDepannageDropdown = false;
  function handleDepartSet(event: CustomEvent) {
    depart_set = event.detail;
    if (arrivalInput) arrivalInput.setShowAutocomplete(false);
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

  $: console.log(selectedDepannage);
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
        <section class="max-w-7xl mx-auto mt-24 px-4 sm:px-8">
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
                  : 'text-gray-300 border border-gray-500'} flex items-center justify-center py-2 px-3 rounded-lg transition-all duration-300"
                on:click={() => (selectedService = "Remorquage")}
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
              placeholder={contenu[lang].departLocation}
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
                        class="w-full px-4 py-2 text-left flex items-center hover:bg-gray-100"
                        on:click={() => {
                          selectedDepannage = type.name;
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
            </div>
            <!-- EL BUTTON RESERVER-->
            <button
              on:click={(event) => {
                event.preventDefault();
                handlePrice(true);
              }}
              bind:this={reserveButton}
              disabled={!(
                selectedVehicle &&
                (arrival_set || selectedDepannage != "" || selectedService == "Remorquage") &&
                depart_set
              )}
              class="{selectedVehicle &&
              (arrival_set || selectedDepannage != '' || selectedService == "Remorquage") &&
              depart_set
                ? 'bg-amstram-purple scale-105 transition-all duration-1000'
                : 'bg-black bg-opacity-10'} text-white py-3 px-6 rounded-lg text-lg font-semibold"
              >{contenu[lang].reserve}</button
            >
          </form>
        </section>

        <section
          class="max-w-7xl mx-auto mr-20 mt-10 px-4 sm:px-8 flex flex-col md:flex-row items-center"
        >
          <div class="md:w-1/2 mb-12 md:mb-0">
            <p class="text-5xl font-bold mb-6">{contenu[lang].subtitle}</p>

            <p class="text-gray-300 text-3xl">
              {#if selectedService != "Dépannage"}
                {contenu[lang][selectedService].description}
              {:else}
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
          <div class="hidden lg:block">
            <Eumap />
          </div>
          {:else}
          <img src="map-mu.png" alt="map of glorious mauritus" class="hidden md:flex md:w-1/3 lg:w-1/4 mx-auto">
          {/if}
        </section>

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
