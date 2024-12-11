<script lang="ts">
  import { browser } from '$app/environment';
  import { MapPin, ChevronDown  } from 'lucide-svelte'
  import  Login  from "$lib/components/auth/Login.svelte";  
  import * as Card from "$lib/components/ui/card/index.js";
  import { onMount } from 'svelte';
  import AOS from 'aos';
  import Logo from '$lib/components/Logo.svelte';
  import Eumap from  '$lib/components/Eumap.svelte';
  import {calculatePrice , getUser } from '$lib/appwrite';
  import { contenu } from "$lib/contenu";
  import AddressInput from "$lib/components/AddressInput.svelte";
  import { goto } from '$app/navigation';
  
  let currentSection = 0;
  const totalSections = 4; // Updated to include the footer
  let lang = "fr";
  let isScrolling = false;
  let lastScrollTime = 0;
  let departInput: AddressInput;
  let arrivalInput: AddressInput;
  let selectedVehicle: string ; 
  let price_set : boolean = false;
  let price_car : number = 0;
  let price_truck : number = 0;
  let reserveButton: HTMLButtonElement;
  let loginComponent: Login;
  let depart_set = false;
  let arrival_set = false;
  let act = false;
  let data_price : any;
  function handleDepartSet(event: CustomEvent) {
    depart_set = event.detail;
    arrivalInput.setShowAutocomplete(false);
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
    goto("/reserve?"+ new URLSearchParams({lang: lang, service: service , r1: departInput.getValue(), r2: arrivalInput.getValue() , selected: selectedVehicle}).toString());
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

  // Add a new function to scroll to the footer
  function scrollToFooter() {
    scrollToSection(totalSections - 1);
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
      const service = urlParams.get('service');
      if (lang_buffer) {
        lang = lang_buffer; 
      }

      if (depart) {
        departInput.selectLocation(depart, true); // Utiliser la fonction pour définir la valeur
      }
      if (arrival) {
        arrivalInput.selectLocation(arrival, true); // Utiliser la fonction pour définir la valeur
      }
      if (vehicle) {
        selectedVehicle = vehicle; // Définir le véhicule sélectionné
      }
      if (depart && arrival && vehicle) {
        handlePrice(false).then(
          () => {
             
        if (service) {
            act = true;
            reserve(service, data_price[service]["price"]);  
          }
        }
      );
      }
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('click', handleClickOutside);
      };
    }
  });
 
  function handleKeyDown(event: KeyboardEvent) {
    if (departInput.getShowAutocomplete() || arrivalInput.getShowAutocomplete()) {
      return;
    }
    if (event.key === 'ArrowDown') {
        if (currentSection < totalSections -1 && currentSection >= 0) {
            scrollToSection(currentSection + 1); // Changer de section vers le bas
            event.preventDefault(); // Empêcher le défilement de la page
        }
    } else if (event.key === 'ArrowUp') {
        if (currentSection > 0 && currentSection <= totalSections -1) {
            scrollToSection(currentSection - 1); // Changer de section vers le haut
            event.preventDefault(); // Empêcher le défilement de la page
        }
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-container')) {
      departInput.setShowAutocomplete(false);
      arrivalInput.setShowAutocomplete(false);
    }
  }


  async function handlePrice(set_param : boolean = true) {
    try {
      const depart_value = departInput.getValue();
      const arrival_value = arrivalInput.getValue();
      data_price = await calculatePrice(depart_value, arrival_value, selectedVehicle || "");
      price_set = true;
      price_car = data_price["car"]["price"];
      price_truck = data_price["truck"]["price"];
      
      // Ajout des paramètres à l'URL
      if (set_param) {
      const params = new URLSearchParams({
        r1: depart_value,
        r2: arrival_value,
        selected: selectedVehicle || "",
        lang: lang
      });
        window.history.replaceState({}, '', `/?${params.toString()}`);
      }

      scrollToSection(1);
      reserveButton.focus();
      //console.log(data_price);
    } catch (error) {
      console.error('Erreur:', error);
    }
  }

  let last_service = "";
  let last_price = 0;

  async function reserve(service: string, price: number) {
    if (!act) 
      return;
    const params = new URLSearchParams(window.location.search);
    params.set("service", service);
    window.history.replaceState({}, '', `/?${params.toString()}`);
    let user = await getUser();
    if (user) {
      console.log("User is logged in", user);
      nextStep(service, price);
    } else {
      last_service = service;
      last_price = price;
      loginComponent.openAuthComponent();
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
         <Login bind:this={loginComponent} lang={lang}   on:login={(e) => { reserve(last_service, last_price); e.preventDefault();}}/>
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
          <AddressInput bind:this={departInput} lang={lang} on:value_set={handleDepartSet} focus={true}/>
          <AddressInput bind:this={arrivalInput} lang={lang} on:value_set={handleArrivalSet} placeholder={contenu[lang].arrivalLocation} countryCode="FRA,CHE,ITA,ESP,NLD,BEL,DEU,POL"/>
          
  <div class="relative">
  <select class="w-full pl-4 pr-12 py-3 rounded-lg bg-white text-amstram-black appearance-none text-lg {selectedVehicle ? 'outline outline-2 outline-amstram-purple' : ''}"
    bind:value={selectedVehicle}>
            <option disabled selected value="">{contenu[lang].vehicleType}</option>
            {#each contenu[lang].vehicleTypes as type}
              <option value={type}>{type}</option>
            {/each}
            </select>
          <div class="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
            <ChevronDown class="text-gray-400" />
    </div>
  </div>
          <button on:click={(event) => { event.preventDefault(); handlePrice(true); }} bind:this={reserveButton} disabled={!selectedVehicle || !arrival_set || !depart_set} class="{(selectedVehicle && depart_set && arrival_set) ? 'bg-amstram-purple scale-105 transition-all duration-1000' : 'bg-black bg-opacity-10'} text-white py-3 px-6 rounded-lg text-lg font-semibold">{contenu[lang].reserve}</button>
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
              <button on:click={() => {act = true; reserve("car", price_car)}} class="w-full bg-amstram-purple text-white px-4 py-2 rounded-lg mt-4">{contenu[lang].reserve}</button>
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
              <button on:click={() => {act = true; reserve("truck", price_truck)}} class="w-full bg-amstram-purple text-white px-4 py-2 rounded-lg mt-4">{contenu[lang].reserve}</button>
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
      <div class="w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer" class:active={currentSection === 0} on:click={() => scrollToSection(0)}></div>
      <div class="w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer" class:active={currentSection === 1} on:click={() => scrollToSection(1)}></div>
      <div class="w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer" class:active={currentSection === 2} on:click={() => scrollToSection(2)}></div>
      <div class="w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer" class:active={currentSection === 3} on:click={scrollToFooter}></div>
    </div>
  </div>

  <div class="section bg-gray-800 py-8 w-full">
    <footer class="max-w-7xl mx-auto px-4 text-center">
      <p class="text-gray-300">
        {contenu[lang].footer}
      </p>
      <p class="text-gray-300">
        <a href="/general_condition" class="text-amstram-white hover:underline">{contenu[lang].terms}</a> | 
        <a href="/confidentiality" class="text-amstram-white hover:underline">{contenu[lang].privacy}</a>
      </p>
      <div class="text-gray-300 flex flex-col md:flex-row justify-between items-center">
        <div class="md:text-left text-center py-2">
          (CEO) Abdoulatif Tall - <a href="mailto:Abd.tall124@gmail.com" class="text-amstram-white hover:underline">Abd.tall124@gmail.com</a><br>
          (CTO) Jonathan Layduhur - <a href="mailto:layduhurdevelopment@gmail.com" class="text-amstram-white hover:underline">layduhurdevelopment@gmail.com</a><br>
        </div>
        <div class="py-2">
          Adresse : 28 Avenue Des Pepinieres, 94260 Fresnes<br>
          {contenu[lang].phone} : <a href="tel:+33766842045" class="text-amstram-white hover:underline">07 66 84 20 45</a>
        </div>
      </div>
    </footer>
  </div>

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
  .section:last-child {
    min-height: auto;
  }
</style>

