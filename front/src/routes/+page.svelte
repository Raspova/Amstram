<script lang="ts">
  import { browser } from '$app/environment';
  import { MapPin, ChevronDown  } from 'lucide-svelte'
  import  Login  from "$lib/components/auth/Login.svelte";  
  import * as Card from "$lib/components/ui/card/index.js";
  import { onMount } from 'svelte';
  import AOS from 'aos';
  import Logo from '$lib/components/Logo.svelte';
  import Eumap from  '$lib/components/Eumap.svelte';
  import { handleAutocomplete , calculatePrice } from '$lib/appwrite';
  let currentSection = 0;

  let lang = "fr";
  let isScrolling = false;
  let lastScrollTime = 0;
  let departInput: HTMLInputElement;
  let arrivalInput: HTMLInputElement;
  let selectedVehicle: string ; 

  function handleScroll(event: WheelEvent) {
    event.preventDefault();
    const now = new Date().getTime();
    if (now - lastScrollTime < 1000 || isScrolling) return;

    isScrolling = true;
    lastScrollTime = now;

    if (event.deltaY > 0 && currentSection < 2) {
      scrollToSection(currentSection + 1);
    } else if (event.deltaY < 0 && currentSection > 0) {
      scrollToSection(currentSection - 1);
    }

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }

  function updateParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    parallaxElements.forEach((el: Element) => {
      const speed = 0.5;
      const yPos = -(window.scrollY * speed);
      (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });
  }

  function updateScrollIndicators() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSection = index;
      }
    });
  }

  function onScroll() {
    updateParallax();
    updateScrollIndicators();
  }

  function scrollToSection(sectionIndex: number) {
    const sections = document.querySelectorAll('.section');
    if (sections[sectionIndex]) {
      const yOffset = 0; // Ajustez cette valeur si nécessaire pour tenir compte de l'en-tête fixe
      const y = sections[sectionIndex].getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
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

      // Ajoutez cette ligne pour focus l'input de départ
      if (departInput) departInput.focus();
      if (window.location.hostname !== 'localhost') {
        alert("Site en développement, veuillez patienter pour utiliser ce service\n\
Experts en développement web, nous créons votre solution numérique de A à Z. Du site web à l'intelligence artificielle, en passant par le SEO et l'analyse de données - nous transformons votre vision en réalité digitale.\n\n\
layduhurdevelopment@gmail.com");
      }

      // Vérifiez si les valeurs sont définies dans l'URL
      const urlParams = new URLSearchParams(window.location.search);
      const depart = urlParams.get('r1');
      const arrival = urlParams.get('r2');
      const vehicle = urlParams.get('selected');
      const lang_buffer = urlParams.get('lang');
      if (lang_buffer) {
        lang = lang_buffer;
      }

      if (depart) {
        selectLocation(depart); // Utiliser la fonction pour définir la valeur
      }
      if (arrival) {
        selectLocation1(arrival); // Utiliser la fonction pour définir la valeur
      }
      if (vehicle) {
        selectedVehicle = vehicle; // Définir le véhicule sélectionné
      }
      if (depart && arrival && vehicle) {
        handlePrice(false); 
      }
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('click', handleClickOutside);
      };
    }
  });
  let depart_set : boolean = false
  let autocompleteResults: string[] = [];
  let arrival_set: boolean = false;
  let arrivalAutocompleteResults: string[] = [];

  let showAutocomplete: boolean = false;
  let showArrivalAutocomplete: boolean = false;

  let isLoadingDepart: boolean = false;
  let isLoadingArrival: boolean = false;

  let selectedIndex: number = -1; // Index de l'élément actuellement sélectionné pour le départ
  let selectedArrivalIndex: number = -1; // Index de l'élément actuellement sélectionné pour l'arrivée

  function handleDepart(event: InputEvent) {
    const val = (event.target as HTMLInputElement).value;  
    depart_set = false;
    selectedIndex = -1; // Réinitialiser l'index lors d'une nouvelle saisie
    if (val.length == 0) {
      autocompleteResults = [];
      showAutocomplete = false;
      return;
    }
    
    isLoadingDepart = true;
    handleAutocomplete(val, true, lang).then((data) => {
      autocompleteResults = data;
      showAutocomplete = autocompleteResults.length > 0;
      showArrivalAutocomplete = false;
    }).finally(() => {
      isLoadingDepart = false;
    });
  }

  function handleArrival(event: InputEvent) {
    const val = (event.target as HTMLInputElement).value;  
    arrival_set = false;
    selectedArrivalIndex = -1; // Réinitialiser l'index lors d'une nouvelle saisie
    if (val.length == 0) {
      arrivalAutocompleteResults = [];
      showArrivalAutocomplete = false;
      return;
    }
    
    isLoadingArrival = true;
    handleAutocomplete(val, false, lang).then((data) => {
      arrivalAutocompleteResults = data;
      showArrivalAutocomplete = arrivalAutocompleteResults.length > 0;
      showAutocomplete = false;
    }).finally(() => {
      isLoadingArrival = false;
    });
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (showAutocomplete) {
      if (event.key === 'ArrowDown') {
        selectedIndex = (selectedIndex + 1) % autocompleteResults.length; // Naviguer vers le bas
        event.preventDefault(); // Empêcher le défilement de la page
      } else if (event.key === 'ArrowUp') {
        selectedIndex = (selectedIndex - 1 + autocompleteResults.length) % autocompleteResults.length; // Naviguer vers le haut
        event.preventDefault(); // Empêcher le défilement de la page
      } else if (event.key === 'Enter') {
        if (selectedIndex >= 0) {
          selectLocation(autocompleteResults[selectedIndex]); // Sélectionner l'élément actuellement surligné
          event.preventDefault(); // Empêcher le comportement par défaut
        }
      }
    } else if (showArrivalAutocomplete) {
      if (event.key === 'ArrowDown') {
        selectedArrivalIndex = (selectedArrivalIndex + 1) % arrivalAutocompleteResults.length; // Naviguer vers le bas
        event.preventDefault(); // Empêcher le défilement de la page
      } else if (event.key === 'ArrowUp') {
        selectedArrivalIndex = (selectedArrivalIndex - 1 + arrivalAutocompleteResults.length) % arrivalAutocompleteResults.length; // Naviguer vers le haut
        event.preventDefault(); // Empêcher le défilement de la page
      } else if (event.key === 'Enter') {
        if (selectedArrivalIndex >= 0) {
          selectLocation1(arrivalAutocompleteResults[selectedArrivalIndex]); // Sélectionner l'élément actuellement surligné
          event.preventDefault(); // Empêcher le comportement par défaut
        }
      }
    } else {
    if (event.key === 'ArrowDown') {
        if (currentSection < 2 && currentSection >= 0) {
            scrollToSection(currentSection + 1); // Changer de section vers le bas
            event.preventDefault(); // Empêcher le défilement de la page
        }
    } else if (event.key === 'ArrowUp') {
        if (currentSection > 0 && currentSection <= 2) {
            scrollToSection(currentSection - 1); // Changer de section vers le haut
            event.preventDefault(); // Empêcher le défilement de la page
        }
    }}
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-container')) {
        showAutocomplete = false;
        showArrivalAutocomplete = false;
    }
  }

  let price_set : boolean = false;
  let price_car : number = 0;
  let price_truck : number = 0;

  let reserveButton: HTMLButtonElement;
  async function handlePrice(set_param : boolean = true) {
    try {
      const data = await calculatePrice(departInput.value, arrivalInput.value, selectedVehicle || "");
      price_set = true;
      price_car = data["car"]["price"];
      price_truck = data["truck"]["price"];
      
      // Ajout des paramètres à l'URL
      if (set_param) {
      const params = new URLSearchParams({
        r1: departInput.value,
        r2: arrivalInput.value,
        selected: selectedVehicle || "",
        lang: lang
      });
        window.history.replaceState({}, '', `/?${params.toString()}`);
      }

      scrollToSection(1);
      reserveButton.focus();
      console.log(data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  }

  function selectLocation(location: string) {
    departInput.value = location;
    depart_set = true;
    autocompleteResults = [];
    showAutocomplete = false;
  }
  function selectLocation1(location: string) {
    arrivalInput.value = location;
    arrival_set = true;
    arrivalAutocompleteResults = [];
    showArrivalAutocomplete = false;
  }

 const contenu : any = {
    fr : {
      title : "Votre véhicule, notre route",
      subtitle : "Livraison sur mesure dans toute l'Europe",
      description : "Que vous soyez un particulier ou une entreprise, AMSTRAM vous offre une solution de transport de véhicules adaptée à vos besoins.",
      why_choose_us : "Pourquoi nous choisir ?",
      reserve : "Réserver",
      offersTitle: "Nos offres",
      deliveryDescription: "Livraison sur mesure dans toute l'Europe",
      flexibility: "Flexibilité maximale",
      flexibilityDescription: "Du sur-mesure pour chaque trajet. Nous adaptons nos services à vos besoins spécifiques, que ce soit pour le type de véhicule, le timing ou les exigences particulières.",
      security: "Sécurité garantie",
      securityDescription: "Chauffeurs expérimentés et véhicules adaptés. Nos professionnels sont formés pour manipuler tous types de véhicules, et notre flotte est équipée des dernières technologies de sécurité.",
      qualityPrice: "Rapport qualité-prix imbattable",
      qualityPriceDescription: "Des tarifs compétitifs pour un service premium. Nous offrons une transparence totale sur nos prix, sans frais cachés, tout en maintenant un niveau de service exceptionnel.",
      peaceOfMind: "Sérénité totale",
      peaceOfMindDescription: "Un paiement différé, vous ne payez que quand votre véhicule est arrivé à destination. Cette politique de paiement vous assure une tranquillité d'esprit tout au long du processus de livraison.",
      departLocation: "Lieux de départ (France)",
      arrivalLocation: "Lieux d'arrivée",
      vehicleType: "Type de véhicule",
      citadine: "Citadine",
      moto: "Moto",
      camion: "Camion",
      piloteExpress: {
        title: "1. Le Pilote Express",
        description: "Un chauffeur professionnel prend le volant de votre véhicule pour une livraison en conduite directe. Idéal pour une livraison rapide et personnalisée.",
        features: [
          "Livraison porte-à-porte",
          "Chauffeurs expérimentés et certifiés"
        ]
      },
      coconRoulant: {
        title: "2. Le Cocon Roulant",
        description: "Votre véhicule voyage confortablement dans un camion spécialisé, préservant son kilométrage et son état. Parfait pour les véhicules de luxe ou de collection.",
        features: [
          "Protection maximale contre les intempéries",
          "Transport multi-véhicules possible"
        ]
      },
      card1Title: "Flexibilité maximale",
      card1Description: "Du sur-mesure pour chaque trajet. Nous adaptons nos services à vos besoins spécifiques, que ce soit pour le type de véhicule, le timing ou les exigences particulières.",
      card2Title: "Sécurité garantie",
      card2Description: "Chauffeurs expérimentés et véhicules adaptés. Nos professionnels sont formés pour manipuler tous types de véhicules, et notre flotte est équipée des dernières technologies de sécurité.",
      card3Title: "Rapport qualité-prix imbattable",
      card3Description: "Des tarifs compétitifs pour un service premium. Nous offrons une transparence totale sur nos prix, sans frais cachés, tout en maintenant un niveau de service exceptionnel.",
      card4Title: "Sérénité totale",
      card4Description: "Un paiement différé, vous ne payez que quand votre véhicule est arrivé à destination. Cette politique de paiement vous assure une tranquillité d'esprit tout au long du processus de livraison.",
      footer : "Faites confiance à AMSTRAM pour le transport de votre véhicule et vivez une expérience de livraison sans précédent !",
      terms : "Conditions Générales",
      privacy : "Politique de Confidentialité",
    },
    en : {
      title : "Your vehicle, our route",
      subtitle : "Custom delivery across Europe",
      why_choose_us : "Why choose us ?",
      description : "Whether you're a private individual or a business, AMSTRAM offers a vehicle transport solution tailored to your needs.",
      reserve : "Reserve",
      offersTitle: "Our Offers",
      deliveryDescription: "Custom delivery across Europe",
      flexibility: "Maximum flexibility",
      flexibilityDescription: "Tailored for each trip. We adapt our services to your specific needs, whether it's for the type of vehicle, timing, or special requirements.",
      security: "Guaranteed security",
      securityDescription: "Experienced drivers and suitable vehicles. Our professionals are trained to handle all types of vehicles, and our fleet is equipped with the latest safety technologies.",
      qualityPrice: "Unbeatable value for money",
      qualityPriceDescription: "Competitive rates for premium service. We offer complete transparency on our prices, with no hidden fees, while maintaining an exceptional level of service.",
      peaceOfMind: "Total peace of mind",
      peaceOfMindDescription: "Deferred payment, you only pay when your vehicle has arrived at its destination. This payment policy ensures you peace of mind throughout the delivery process.",
      departLocation: "Departure (France)",
      arrivalLocation: "Arrival Locations",
      vehicleType: "Vehicle Type",
      citadine: "City car",
      moto: "Motorbike",
      camion: "Truck",
      piloteExpress: {
        title: "1. The Express Driver",
        description: "A professional driver takes the wheel of your vehicle for direct delivery. Ideal for fast and personalized delivery.",
        features: [
          "Door-to-door delivery",
          "Experienced and certified drivers"
        ]
      },
      coconRoulant: {
        title: "2. The Rolling Cocoon",
        description: "Your vehicle travels comfortably in a specialized truck, preserving its mileage and condition. Perfect for luxury or collectible vehicles.",
        features: [
          "Maximum protection against the elements",
          "Multi-vehicle transport possible"
        ]
      },
      card1Title: "Maximum flexibility",
      card1Description: "Tailored for each trip. We adapt our services to your specific needs, whether it's for the type of vehicle, timing, or special requirements.",
      card2Title: "Guaranteed security",
      card2Description: "Experienced drivers and suitable vehicles. Our professionals are trained to handle all types of vehicles, and our fleet is equipped with the latest safety technologies.",
      card3Title: "Unbeatable value for money",
      card3Description: "Competitive rates for premium service. We offer complete transparency on our prices, with no hidden fees, while maintaining an exceptional level of service.",
      card4Title: "Total peace of mind",
      card4Description: "Deferred payment, you only pay when your vehicle has arrived at its destination. This payment policy ensures you peace of mind throughout the delivery process.",
      footer : "Trust AMSTRAM for the transport of your vehicle and enjoy a delivery experience like no other!",
      terms :"Terms and Conditions",
      privacy : "Privacy Policy",
    }
  }
 
  
</script>
<svelte:head>
  <meta name="keywords" content="livraison de véhicules, livraison en europe, livraison en corse, transport de véhicules, livraison sur mesure, transport sur mesure, véhicules de collection, véhicules de luxe, transport de voiture, transport de camion, transport de motocyclette, service de transport de véhicules, livraison de voiture, livraison de camion, livraison de motocyclette">
  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
</svelte:head>

<main class="w-full text-amstram-white font-sans">
  <div class="section min-h-screen flex flex-col relative transition-colors duration-1000">
    <img src="/side.webp" alt="Décoration latérale" class="absolute left-0 top-20 h-full object-cover hidden md:block parallax-bg" style="z-index: -1;" />
    <header class="flex justify-between items-center p-4 max-w-7xl mx-auto">
      <div class="absolute left-0 top-0 mt-5 ml-10">
        <Logo />
      </div>
      <div class="absolute right-1 top-3 md:top-9   flex flex-col md:flex-row items-center space-x-4 md:mr-20 mr-1 md:mt-5 mt-5">
         <Login lang={lang}/>
        <select bind:value={lang} class="flex  mt-5 md:mt-0 items-center space-x-1 border border-amstram-white px-2 py-1 rounded bg-transparent text-amstram-white">
          <option value="fr" class="text-amstram-black bg-gray-600">FR</option>
          <option value="en" class="text-amstram-black bg-gray-600">EN</option>
        </select>
      </div>
    </header>
    <div class="w-full flex-grow" data-aos="fade-up" data-aos-duration="1500">
      <section class="max-w-7xl mx-auto  mt-24 px-4 sm:px-8">
        <h2 class="text-5xl font-bold mb-12 text-center md:text-left">{contenu[lang].title}</h2>
        <form class="grid grid-cols-1 md:grid-cols-4 gap-6 ml-10 mr-10">
          <div class="relative">
            <MapPin class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              bind:this={departInput}
              type="text" 
              placeholder={contenu[lang].departLocation} 
              class="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-amstram-black text-lg {depart_set ? 'outline outline-2 outline-amstram-purple' : ''} {isLoadingDepart ? 'opacity-50' : ''}" 
              on:input={handleDepart}
            />
            {#if showAutocomplete}
              <ul class="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg">
                {#each autocompleteResults as result, index}
                  <li class="cursor-pointer p-2 text-black hover:bg-gray-200 {selectedIndex === index ? 'bg-gray-200' : ''}" on:click={() => selectLocation(result)}>
                    {result}
                  </li>
                {/each}
              </ul>
            {:else}
              
            {/if}

          </div>
          <div class="relative">
            <MapPin class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              bind:this={arrivalInput}
              type="text" 
              placeholder={contenu[lang].arrivalLocation} 
              class="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-amstram-black text-lg {arrival_set ? 'outline outline-2 outline-amstram-purple' : ''} {isLoadingArrival ? 'opacity-50' : ''}" 
              on:input={handleArrival}
              
            />
            {#if showArrivalAutocomplete}
              <ul class="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg">
                {#each arrivalAutocompleteResults as result, index}
                  <li class="cursor-pointer p-2 text-black hover:bg-gray-200 {selectedArrivalIndex === index ? 'bg-gray-200' : ''}" on:click={() => selectLocation1(result)}>
                    {result}
                  </li>
                {/each}
              </ul>
            {:else}
            {/if}
          </div>
          <div class="relative">
             <select class="w-full pl-4 pr-12 py-3 rounded-lg bg-white text-amstram-black appearance-none text-lg {selectedVehicle  ? 'outline outline-2 outline-amstram-purple' : ''}" bind:value={selectedVehicle}>
              <option  disabled selected value="">{contenu[lang].vehicleType}</option>
              <option value="citadine">{contenu[lang].citadine}</option>
              <option value="moto">{contenu[lang].moto}</option>
              <option value="camion">{contenu[lang].camion}</option> 
            </select>
            <ChevronDown class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button on:click={handlePrice} bind:this={reserveButton} disabled={!selectedVehicle || !depart_set || !arrival_set} class="{(selectedVehicle && depart_set && arrival_set) ? 'bg-amstram-purple scale-105 transition-all duration-1000' : 'bg-black bg-opacity-10'} text-white py-3 px-6 rounded-lg text-lg font-semibold">{contenu[lang].reserve}</button>
        </form>
      </section>

      <section class="max-w-7xl mx-auto mr-20 mt-24 px-4 sm:px-8 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-12  md:mb-0">
          <p class="text-5xl font-bold mb-6">{contenu[lang].subtitle}</p>
          <p class="text-gray-300 text-3xl ">
            {contenu[lang].description}
          </p>
        </div>
        <div class="hidden lg:block ">
          <Eumap />
        </div>
      </section>
     
      <img 
        src="/truck.webp" 
        alt="Truck" 
        class="absolute left-0 bottom-0 w-1/8 md:w-1/12 truck-animation hidden md:block" 
        data-aos="fade-left" 
        data-aos-duration="2000"
        data-aos-delay="1000"
        data-aos-offset="0"
      />
    </div>
  </div>

 

  <div class="section w-full bg-gray-100 bg-hero-patern-b relative overflow-hidden transition-colors duration-1000">
    <img src="/side2.webp" alt="Décoration latérale" class="absolute right-0 bottom-0 object-cover hidden lg:block opacity-50 parallax-bg" style="z-index: 1;" />
    <div class="min-h-screen flex flex-col justify-center py-12 relative" style="z-index: 2;">
      <h2 class="text-5xl font-bold mb-5 text-center text-amstram-black" data-aos="fade-up" data-aos-duration="1500">{contenu[lang].offersTitle}</h2>
      <section class="max-w-7xl mx-auto mt-12 px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card.Root class="relative bg-white bg-opacity-40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-right" data-aos-duration="1500">
          <Card.Header class="pt-16">
            <Card.Title class="text-3xl font-bold mb-4 absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10 text-amstram-black text-center w-full px-4 mt-4">{contenu[lang].piloteExpress.title}</Card.Title>
            {#if price_set}
              <p class="text-gray-700 text-2xl text-center">
                {price_car} €
              </p>
            {/if}
          </Card.Header>
          <Card.Content>
            <img src="driver.webp" alt="Pilote Express" class="w-full h-48 object-cover rounded-lg mb-6" />
            <p class="text-gray-700 text-lg text-center">
              {contenu[lang].piloteExpress.description}
            </p>
            <ul class="text-gray-700 mt-4 list-disc pl-5">
              <li>{contenu[lang].piloteExpress.features[0]}</li> 
              <li>{contenu[lang].piloteExpress.features[1]}</li>
            </ul>
            {#if price_set}
              <button class="w-full bg-amstram-purple text-white px-4 py-2 rounded-lg mt-4">{contenu[lang].reserve}</button>
            {/if}
          </Card.Content>
        </Card.Root>

        <Card.Root class="relative bg-white bg-opacity-40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-left" data-aos-duration="1500">
          <Card.Header class="pt-16">
            <Card.Title class="text-3xl font-bold mb-4 absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10 text-amstram-black text-center w-full px-4 mt-4">{contenu[lang].coconRoulant.title}</Card.Title>
            {#if price_set}
              <p class="text-gray-700 text-2xl text-center">
                {price_truck} €
              </p>
            {/if}
          </Card.Header>
          <Card.Content>
            <img src="porte-voitures1.webp" alt="Cocon Roulant" class="w-full h-48 object-cover rounded-lg mb-6" />
            <p class="text-gray-700 text-lg text-center">
              {contenu[lang].coconRoulant.description}
            </p>
            <ul class="text-gray-700 mt-4 list-disc pl-5">
              <li>{contenu[lang].coconRoulant.features[0]}</li>
              <li>{contenu[lang].coconRoulant.features[1]}</li>
            </ul>
            {#if price_set}
              <button class="100 w-full bg-amstram-purple text-white px-4 py-2 rounded-lg mt-4">{contenu[lang].reserve}</button>
            {/if}
          </Card.Content>
        </Card.Root>
      </section>
    </div>
  </div>

  <div class="section min-h-screen flex flex-col relative overflow-hidden transition-colors duration-1000">
    <img src="/side1.webp" alt="Décoration latérale" class="absolute left-1 -bottom-0 h-3/4 w-50 object-cover hidden lg:block " style="z-index: -1;" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200" />
    <section class="max-w-7xl mx-auto mt-24 px-4 sm:px-8 flex-grow relative">
      <img src="/side0.webp" alt="Décoration latérale" class="absolute right-0 bottom-10 w-1/3  w-50 object-cover hidden lg:block parallax-bg" style="z-index: -1;" />

      <h2 class="text-4xl font-bold mb-12 text-center text-amstram-white" data-aos="fade-up" data-aos-duration="1500">{contenu[lang].why_choose_us}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="bg-black bg-opacity-80 outline outline-1 outline-white p-6 rounded-xl" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="100">
          <div class="flex items-start mb-4">
            <svg class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
            </svg>
            <h3 class="text-4xl font-semibold text-amstram-white">{contenu[lang].card1Title}</h3>
          </div>
          <p class="text-gray-300 text-2xl">{contenu[lang].card1Description}</p>
        </div>
        <div class="bg-black bg-opacity-80 outline outline-1 outline-white p-6 rounded-xl" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200">
          <div class="flex items-start mb-4">
            <svg class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <h3 class="text-4xl font-semibold text-amstram-white">{contenu[lang].card2Title}</h3>
          </div>
          <p class="text-gray-300 text-2xl">{contenu[lang].card2Description}</p>
        </div>
        <div class="bg-black bg-opacity-90 outline outline-1 outline-white p-6 rounded-xl" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="300">
          <div class="flex items-start mb-4">
            <svg class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08 .402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-4xl font-semibold text-amstram-white">{contenu[lang].card3Title}</h3>
          </div>
          <p class="text-gray-300 text-2xl">{contenu[lang].card3Description}</p>
        </div>
        <div class="bg-black bg-opacity-80 outline outline-1 outline-white p-6 rounded-xl" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="400">
          <div class="flex items-start mb-4">
            <svg class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-4xl font-semibold text-amstram-white">{contenu[lang].card4Title}</h3>
          </div>
          <p class="text-gray-300 text-2xl">{contenu[lang].card4Description}</p>
        </div>
      </div>
    </section>
  
  </div>

  <!-- Indicateurs de position de défilement -->
  <div class="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
    <div class="flex flex-col space-y-2">
      <div class="w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer" class:active={currentSection === 0} on:click={scrollToSection1}></div>
      <div class="w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer" class:active={currentSection === 1} on:click={scrollToSection2}></div>
      <div class="w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer" class:active={currentSection === 2} on:click={scrollToSection3}></div>
    </div>
  </div>

  <footer class="mt-16 bg-gray-800 py-8 w-full">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <p class="text-gray-300">
        {contenu[lang].footer}
      </p>
      <p class="text-gray-300">
        <a href="/general_condition" class="text-amstram-white hover:underline">{contenu[lang].terms}</a> | 
        <a href="/confidentiality" class="text-amstram-white hover:underline">{contenu[lang].privacy}</a>
      </p>
      <div class="text-gray-300 flex flex-col md:flex-row justify-between items-center">
        <div class="md:text-left text-center py-2">
          (CTO) Jonathan Layduhur - <a href="mailto:layduhurdevelopment@gmail.com" class="text-amstram-white hover:underline">layduhurdevelopment@gmail.com</a><br>
          (CEO) Abdoulatif Tall - <a href="mailto:Abd.tall124@gmail.com" class="text-amstram-white hover:underline">Abd.tall124@gmail.com</a><br>
        </div>
        <div class="py-2">
          Adresse : 28 Avenue Des Pepinieres, 94260 Fresnes<br>
          {contenu[lang].phone} : <a href="tel:+33766842045" class="text-amstram-white hover:underline">07 66 84 20 45</a>
        </div>
      </div>
    </div>
  </footer>
</main> 


<style>
  .parallax-bg {
    transition: transform 0.8s ease-out;
  }

  .scroll-indicator {
    opacity: 0.5;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .scroll-indicator.active {
    opacity: 1;
    transform: scale(1.5);
  }

  .section {
    transition: background-color 0.8s ease;
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
      opacity:1;
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
  .truck-animation1 {
    animation: truckMove1 2s ease-in-out 1s forwards;
  }
</style>
<!-- Suppression de l'écouteur d'événement de la roue de la souris -->












