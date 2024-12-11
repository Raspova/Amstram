<script lang="ts">
    import { contenu } from '$lib/contenu';
    import { Euro, ChevronDown } from 'lucide-svelte'
    export let price: number = 0
    export let selectedService: string = ''
  
    export let lang: string = 'fr'

    const services = [
      { value: 'car', label: contenu[lang].piloteExpress.title },
      { value: 'truck', label: contenu[lang].coconRoulant.title }
    ]
  
    $: formattedPrice = price.toFixed(2).replace('.', ',')
  
    export function getSelectedService() {
      return selectedService
    }
  </script>
  
  <div class="bg-white w-full md:w-auto p-6 rounded-xl shadow-lg max-w-4xl mx-auto text-black">
    <div class="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8">
      <div class="w-full md:w-1/2">
        <h2 class="text-2xl font-semibold mb-2">Select Your Service</h2>
        <div class="relative">
          <select
            bind:value={selectedService}
            class="appearance-none w-full bg-white border border-gray-300 text-black py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>Choose a service</option>
            {#each services as service}
              <option value={service.value}>{service.label}</option>
            {/each}
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={24} />
          </div>
        </div>
      </div>
  
      <div class="w-full md:w-1/2 text-center md:text-right">
        <p class="text-xl mb-2">Total Price</p>
        <div class="flex items-center justify-center md:justify-end">
          <Euro size={36} class="mr-2 text-amstram-purple" />
          <span class="text-6xl font-bold">{formattedPrice}</span>
        </div>
      </div>
    </div>
  </div>
  
  