<script lang="ts">
    import { Calendar, Clock, HelpCircle } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";
    import { contenu } from "$lib/contenu";
    const dispatch = createEventDispatcher();
  
    // Props
    export let lang = "en";
  
    // State
    let collectionDate: string = "";
    let collectionTime: string = "";
    let deliveryDate: string = "";
    let deliveryTime: string = "";
    let isValid: boolean = false;
  
    // Get tomorrow's date as minimum date for collection
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
  
    // Get min delivery date (3 days from collection)
    $: minDeliveryDate = collectionDate ? 
      new Date(new Date(collectionDate).getTime() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] 
      : "";
  
    // Validation
    $: {
      const isCollectionFilled = collectionDate && collectionTime;
      const isDeliveryFilled = deliveryDate && deliveryTime;
      const isDeliveryAfterMin = isCollectionFilled && isDeliveryFilled && 
        new Date(deliveryDate) >= new Date(minDeliveryDate);
      
      isValid = isCollectionFilled && isDeliveryFilled && isDeliveryAfterMin;
      
      dispatch('change', {
        collection: {
          date: collectionDate,
          time: collectionTime
        },
        delivery: {
          date: deliveryDate,
          time: deliveryTime
        },
        isValid
      });
    }
  
    export function getData() {
      return {
        collection: {
          date: collectionDate,
          time: collectionTime
        },
        delivery: {
          date: deliveryDate,
          time: deliveryTime
        },
        isValid
      };
    }
  </script>
  
  <div class="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
    <div class="flex items-center gap-3 mb-8">
      <Calendar class="w-6 h-6 text-purple-600" />
      <h2 class="text-xl font-semibold text-gray-900">{contenu[lang].vehiculeAvailability}</h2>
    </div>
  
    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Collection Section -->
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-700">{contenu[lang].collectionNoEarlierThan}</span>
          <button 
            class="text-gray-400 hover:text-gray-600"
            on:click={() => alert("Collection date must be from tomorrow onwards")}
          >
            <HelpCircle class="w-4 h-4" />
          </button>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="relative flex-1">
            <div class="relative flex items-center">
              <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="date"
                min={minDate}
                bind:value={collectionDate}
                class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm"
              />
            </div>
          </div>
          <div class="relative w-full sm:w-40">
            <div class="relative flex items-center">
              <Clock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="time"
                bind:value={collectionTime}
                class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
  
      <!-- Delivery Section -->
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-700">{contenu[lang].deliveryUntil}</span>
          <button 
            class="text-gray-400 hover:text-gray-600"
            on:click={() => alert("Delivery must be at least 3 days after collection")}
          >
            <HelpCircle class="w-4 h-4" />
          </button>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="relative flex-1">
            <div class="relative flex items-center">
              <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="date"
                min={minDeliveryDate}
                bind:value={deliveryDate}
                disabled={!collectionDate}
                class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
          <div class="relative w-full sm:w-40">
            <div class="relative flex items-center">
              <Clock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="time"
                bind:value={deliveryTime}
                disabled={!deliveryDate}
                class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="mt-8 text-sm text-gray-500 flex items-center gap-2">
      <HelpCircle class="w-4 h-4 flex-shrink-0" />
      <span>{contenu[lang].availabilityDescription}</span>
    </div>
  </div>