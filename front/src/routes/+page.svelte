<script lang="ts">
  import { browser } from '$app/environment';
  import { MapPin, ChevronDown, LogIn } from 'lucide-svelte'
  import * as Card from "$lib/components/ui/card/index.js";
  import { onMount } from 'svelte';
  import AOS from 'aos';
  import Logo from '$lib/components/Logo.svelte';
  import Eumap from  '$lib/components/Eumap.svelte';
  let currentSection = 0;

  let isScrolling = false;
  let lastScrollTime = 0;

  let departInput: HTMLInputElement;

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
    parallaxElements.forEach((el: HTMLElement) => {
      const speed = 0.5;
      const yPos = -(window.scrollY * speed);
      el.style.transform = `translateY(${yPos}px)`;
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

      // Ajoutez cette ligne pour focus l'input de départ
      if (departInput) departInput.focus();

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('wheel', handleScroll);
      };
    }
  });
</script>
<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
</svelte:head>

<main class="w-full text-amstram-white font-sans">
  <div class="section min-h-screen flex flex-col relative transition-colors duration-1000">
    <img src="/side.webp" alt="Décoration latérale" class="absolute left-0 top-20 h-full object-cover hidden md:block parallax-bg" style="z-index: -1;" />
    <header class="flex justify-between items-center p-4 max-w-7xl mx-auto">
      <div class="absolute left-0 top-0 mt-5">
        <Logo />
      </div>
      <div class="absolute right-1 top-0 mt-5 flex items-center space-x-4 md:mr-20 mr-1 md:mt-5 mt-14">
        <button class="flex items-center space-x-1 bg-amstram-purple px-3 py-1 rounded">
          <LogIn class="w-4 h-4" />
          <span>Login</span>
        </button>
        <button class="flex items-center space-x-1 border border-amstram-white px-2 py-1 rounded">
          <span>FR</span>
          <ChevronDown class="w-4 h-4" />
        </button>
      </div>
    </header>
    <div class="w-full flex-grow" data-aos="fade-up" data-aos-duration="1500">
      <section class="max-w-7xl mx-auto mt-24 px-4 sm:px-8">
        <h2 class="text-5xl font-bold mb-12">Votre véhicule, notre route</h2>
        <form class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="relative">
            <MapPin class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              bind:this={departInput}
              type="text" 
              placeholder="Lieu de départ (France)" 
              class="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-amstram-black text-lg" 
            />
          </div>
          <div class="relative">
            <MapPin class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Lieux de livraison" class="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-amstram-black text-lg" />
          </div>
          <div class="relative">
            <select class="w-full pl-4 pr-12 py-3 rounded-lg bg-white text-amstram-black appearance-none text-lg">
              <option>Type de Véhicule</option>
            </select>
            <ChevronDown class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button class="bg-amstram-purple text-white py-3 px-6 rounded-lg text-lg font-semibold">Reserver</button>
        </form>
      </section>

      <section class="max-w-7xl mx-auto mr-20 mt-24 px-4 sm:px-8 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-12  md:mb-0 md:pr-12">
          <p class="text-3xl font-bold mb-6">Livraison sur mesure dans toute l'Europe</p>
          <p class="text-gray-300 text-xl">
            Que vous soyez un particulier ou une entreprise, AMSTRAM vous offre une solution de transport de véhicul  es adaptée à vos besoins.
          </p>
        </div>
        <div class="hidden md:block ">
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
      <h2 class="text-5xl font-bold mb-5 text-center text-amstram-black" data-aos="fade-up" data-aos-duration="1500">Nos offres</h2>
      <section class="max-w-7xl mx-auto mt-12 px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card.Root class="relative bg-white bg-opacity-40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-right" data-aos-duration="1500">
          <Card.Header class="pt-16">
            <Card.Title class="text-3xl font-bold mb-4 absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10 text-amstram-black text-center w-full px-4 mt-4">1. Le Pilote Express</Card.Title>
          </Card.Header>
          <Card.Content>
            <img src="driver.webp" alt="Pilote Express" class="w-full h-48 object-cover rounded-lg mb-6" />
            <p class="text-gray-700 text-lg text-center">
              Un chauffeur professionnel prend le volant de votre véhicule pour une livraison en conduite directe. Idéal pour une livraison rapide et personnalisée.
            </p>
            <ul class="text-gray-700 mt-4 list-disc pl-5">
              <li>Livraison porte-à-porte</li>
              <li>Chauffeurs expérimentés et certifiés</li>
            </ul>
          </Card.Content>
        </Card.Root>

        <Card.Root class="relative bg-white bg-opacity-40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-left" data-aos-duration="1500">
          <Card.Header class="pt-16">
            <Card.Title class="text-3xl font-bold mb-4 absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10 text-amstram-black text-center w-full px-4 mt-4">2. Le Cocon Roulant</Card.Title>
          </Card.Header>
          <Card.Content>
            <img src="porte-voitures1.webp" alt="Cocon Roulant" class="w-full h-48 object-cover rounded-lg mb-6" />
            <p class="text-gray-700 text-lg text-center">
              Votre véhicule voyage confortablement dans un camion spécialisé, préservant son kilométrage et son état. Parfait pour les véhicules de luxe ou de collection.
            </p>
            <ul class="text-gray-700 mt-4 list-disc pl-5">
              <li>Protection maximale contre les intempéries</li>
              <li>Transport multi-véhicules possible</li>
            </ul>
          </Card.Content>
        </Card.Root>
      </section>
    </div>
  </div>

  <div class="section min-h-screen flex flex-col relative overflow-hidden transition-colors duration-1000">
    <img src="/side1.webp" alt="Décoration latérale" class="absolute left-1 -bottom-0 h-3/4 w-50 object-cover hidden lg:block " style="z-index: -1;" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200" />
    <section class="max-w-7xl mx-auto mt-24 px-4 sm:px-8 flex-grow relative">
      <img src="/side0.webp" alt="Décoration latérale" class="absolute right-0 bottom-10 w-1/3  w-50 object-cover hidden lg:block parallax-bg" style="z-index: -1;" />

      <h2 class="text-4xl font-bold mb-12 text-center text-amstram-white" data-aos="fade-up" data-aos-duration="1500">Pourquoi choisir AMSTRAM ?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="outline outline-1 outline-white p-6 rounded-xl" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="100">
          <div class="flex items-start mb-4">
            <svg class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
            </svg>
            <h3 class="text-2xl font-semibold text-amstram-white">Flexibilité maximale</h3>
          </div>
          <p class="text-gray-300 text-lg">Du sur-mesure pour chaque trajet. Nous adaptons nos services à vos besoins spécifiques, que ce soit pour le type de véhicule, le timing ou les exigences particulières.</p>
        </div>
        <div class="outline outline-1 outline-white p-6 rounded-xl" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200">
          <div class="flex items-start mb-4">
            <svg class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <h3 class="text-2xl font-semibold text-amstram-white">Sécurité garantie</h3>
          </div>
          <p class="text-gray-300 text-lg">Chauffeurs expérimentés et véhicules adaptés. Nos professionnels sont formés pour manipuler tous types de véhicules, et notre flotte est équipée des dernières technologies de sécurité.</p>
        </div>
        <div class="outline outline-1 outline-white p-6 rounded-xl" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="300">
          <div class="flex items-start mb-4">
            <svg class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08 .402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-2xl font-semibold text-amstram-white">Rapport qualité-prix imbattable</h3>
          </div>
          <p class="text-gray-300 text-lg">Des tarifs compétitifs pour un service premium. Nous offrons une transparence totale sur nos prix, sans frais cachés, tout en maintenant un niveau de service exceptionnel.</p>
        </div>
        <div class="outline outline-1 outline-white p-6 rounded-xl" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="400">
          <div class="flex items-start mb-4">
            <svg class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-2xl font-semibold text-amstram-white">Sérénité totale</h3>
          </div>
          <p class="text-gray-300 text-lg">Un paiement différé, vous ne payez que quand votre véhicule est arrivé à destination. Cette politique de paiement vous assure une tranquillité d'esprit tout au long du processus de livraison.</p>
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
    <div class="max-w-4xl mx-auto px-4 text-center">
      <p class="text-gray-300">
        Faites confiance à AMSTRAM pour le transport de votre véhicule et vivez une expérience de livraison sans précédent !
      </p>
    </div>
  </footer>
</main>
<!-- Le reste du HTML reste inchangé -->

<style>
  .parallax-bg {
    transition: transform 0.5s ease-out;
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
    transition: background-color 1s ease;
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

  .truck-animation {
    animation: truckMove 2s ease-in-out 1s forwards;
  }
</style>
<!-- Suppression de l'écouteur d'événement de la roue de la souris -->










