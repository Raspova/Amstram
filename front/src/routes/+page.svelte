<script lang="ts">
    import { MapPin, ChevronDown, LogIn } from 'lucide-svelte'
  </script>
  
  <main class="min-h-screen text-amstram-white font-sans">
    <header class="flex justify-between items-center p-4">
      <div class="flex items-center space-x-2">
        <h1 class="text-2xl font-bold">AMSTRAM</h1>
        <div class="text-sm">Livraison de véhicule sur mesure</div>
      </div>
      <div class="flex items-center space-x-4">
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
  
    <section class="max-w-4xl mx-auto mt-16 p-4">
      <h2 class="text-4xl font-bold mb-8">Votre véhicule, notre route</h2>
      <form class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="relative">
          <MapPin class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Lieux de départ" class="w-full pl-10 pr-3 py-2 rounded bg-white text-amstram-black" />
        </div>
        <div class="relative">
          <MapPin class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Lieux de livraison" class="w-full pl-10 pr-3 py-2 rounded bg-white text-amstram-black" />
        </div>
        <div class="relative">
          <select class="w-full pl-3 pr-10 py-2 rounded bg-white text-amstram-black appearance-none">
            <option>Type de Véhicule</option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button class="bg-amstram-purple text-white py-2 px-4 rounded">Reserver</button>
      </form>
    </section>
  
    <section class="max-w-4xl mx-auto mt-16 p-4 flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 mb-8 md:mb-0 md:pr-8">
        <p class="text-2xl font-bold mb-4">livraison sur mesure dans toute l'europe</p>
        <p class="text-gray-300">
          que vous soyez un particulier ou une entreprise, amstram vous offre une solution de transport de véhicules adaptée à vos besoins.
        </p>
      </div>
      <div class="md:w-1/2">
        <img src="/europe-map.png" alt="Carte de l'Europe" class="w-1/1 h-auto" />
      </div>
    </section>
  
    <section class="max-w-4xl mx-auto mt-16 p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-xl font-bold mb-4">1. Le Pilote Express</h3>
        <p class="text-gray-300">
          Un chauffeur professionnel prend le volant de votre véhicule pour une livraison en conduite directe.
        </p>
      </div>
      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-xl font-bold mb-4">2. Le Cocon Roulant</h3>
        <p class="text-gray-300">
          Votre véhicule voyage confortablement dans un camion spécialisé, préservant son kilométrage et son état.
        </p>
      </div>
    </section>
  
    <section class="max-w-4xl mx-auto mt-16 p-4">
      <h2 class="text-3xl font-bold mb-8">Pourquoi choisir AMSTRAM ?</h2>
      <ul class="space-y-4">
        <li class="flex items-start">
          <svg class="w-6 h-6 text-amstram-purple mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <span>Flexibilité maximale : Du sur-mesure pour chaque trajet</span>
        </li>
        <li class="flex items-start">
          <svg class="w-6 h-6 text-amstram-purple mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <span>Sécurité garantie : Chauffeurs expérimentés et véhicules adaptés</span>
        </li>
        <li class="flex items-start">
          <svg class="w-6 h-6 text-amstram-purple mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <span>Rapport qualité-prix imbattable : Des tarifs compétitifs pour un service premium</span>
        </li>
        <li class="flex items-start">
          <svg class="w-6 h-6 text-amstram-purple mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <span>Sérénité : Un paiement différé, vous ne payez que quand votre véhicule est arrivé à destination.</span>
        </li>
      </ul>
    </section>
  
    <footer class="mt-16 bg-gray-800 py-8">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <p class="text-gray-300">
          Faites confiance à AMSTRAM pour le transport de votre véhicule et vivez une expérience de livraison sans précédent !
        </p>
      </div>
    </footer>
  </main>
