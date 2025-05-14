<script lang="ts">
  import { MapPin, AlertCircle, Crosshair } from "lucide-svelte";
  import { contenu } from "$lib/contenu";
  import { handleAutocomplete } from "$lib/appwrite";
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  let input: HTMLInputElement;
  export let lang = "fr";
  let selectedIndex = -1;
  let autocompleteResults: string[] = [];
  let autocompletePressions: boolean[] = [];
  let isLoadingDepart = false;
  let isGettingLocation = false;
  let geolocationError = "";
  let precise: boolean = true;
  export let showAutocomplete = false;
  export let value_set: boolean = false;
  export let countryCode: string = "FRA";
  export const focus: boolean = false;
  export let route: string = '';
  export let placeholder: string = contenu[lang].departLocation;
  let showTooltip: boolean;
  const MAX_RESULTS = 10; // Maximum number of autocomplete results to display
  let shouldTriggerEvent = false;

  function handleKeyDown(event: KeyboardEvent) {
    if (showAutocomplete) {
      if (event.key === 'ArrowDown') {
        selectedIndex = (selectedIndex + 1) % autocompleteResults.length;
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        selectedIndex = (selectedIndex - 1 + autocompleteResults.length) % autocompleteResults.length;
        event.preventDefault();
      } else if (event.key === 'Enter') {
        if (selectedIndex >= 0) {
          selectLocation(autocompleteResults[selectedIndex], autocompletePressions[selectedIndex]);
          event.preventDefault();
        }
      }
    }
  }

  export function getValue() {
    return input.value;
  }

  export function empty() {
    input.value = "";
    value_set = false;
    dispatch("value_set", false);
    autocompleteResults = [];
    autocompletePressions = [];
    showAutocomplete = false;
    precise = false;
  }

  export function getShowAutocomplete() {
    return showAutocomplete;
  }

  export function setShowAutocomplete(show: boolean) {
    showAutocomplete = show;
  }

  function handleDepart(event: Event, triggerEvent: boolean = false) {
    const val = (event.target as HTMLInputElement).value;
    value_set = false;
    precise = true;
    dispatch("value_set", false);
    selectedIndex = -1;
    if (val.length == 0) {
      autocompleteResults = [];
      showAutocomplete = false;
      return;
    }
    isLoadingDepart = true;
    handleAutocomplete(val, countryCode, lang).then((data) => {
      autocompleteResults = (data?.result || []).slice(0, MAX_RESULTS);
      autocompletePressions = (data?.precise || []).slice(0, MAX_RESULTS);
      showAutocomplete = autocompleteResults && autocompleteResults.length > 0;
    }).finally(() => {
      isLoadingDepart = false; 
      if (triggerEvent) { 
      if (autocompleteResults.length === 1) {
          selectLocation(autocompleteResults[0], autocompletePressions[0]);
        }
    }
    }); 
    shouldTriggerEvent = false
  }

  export function selectLocation(location: string, pressise: boolean) {
    input.value = location;
    value_set = pressise;
    dispatch("value_set", pressise);
    autocompleteResults = [];
    autocompletePressions = [];
    showAutocomplete = false;
    precise = pressise;
  }

  async function getCurrentLocation() {
    if (!navigator.geolocation) {
      geolocationError = "Geolocation is not supported by your browser";
      return;
    }

    isGettingLocation = true;
    geolocationError = "";

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Use reverse geocoding to get address from coordinates
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }
      
      const data = await response.json();
      
      // Format the address based on available data
      const formattedAddress = formatAddress(data);
      
      // Use the formatted address
      input.value = formattedAddress;
      
      shouldTriggerEvent = true;
      const inputEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(inputEvent);
      
   
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            geolocationError = "User denied the request for geolocation";
            break;
          case error.POSITION_UNAVAILABLE:
            geolocationError = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            geolocationError = "The request to get user location timed out";
            break;
        }
      } else {
        geolocationError = "An error occurred while getting location";
      }
    } finally {
      isGettingLocation = false;
      
      // If there was an error, show it temporarily and then hide it
      if (geolocationError) {
        setTimeout(() => {
          geolocationError = "";
        }, 3000);
      }
    }
  }

  function formatAddress(data: any): string {
    // Extract relevant address components
    const { address } = data;
    
    if (!address) return data.display_name || "";
    
    const components = [];
    
    if (address.road) components.push(address.road);
    if (address.house_number) components.push(address.house_number);
    if (address.city || address.town || address.village) 
      components.push(address.city || address.town || address.village);
    if (address.postcode) components.push(address.postcode);
    if (address.country) components.push(address.country);
    
    return components.join(", ");
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (focus) input.focus();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<div class="relative w-full max-w-md mx-auto">
  <div class="relative">
    <MapPin class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    <input 
      bind:this={input}
      bind:value={route}
      type="text" 
      placeholder={placeholder} 
      class="w-full pl-10 pr-12 py-2 rounded-lg bg-white text-gray-900 text-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out {value_set ? 'ring-2 ring-purple-500' : ''} {precise ? '' : 'ring-2 ring-red-500'} {isLoadingDepart ? 'opacity-50' : ''}" 
      on:input={(e) => handleDepart(e, shouldTriggerEvent)}
    />
    
    <!-- Location button -->
    <button 
      type="button"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amstram-purple transition-colors duration-200"
      on:click={getCurrentLocation}
      title="Use current location"
      disabled={isGettingLocation}
    >
      <Crosshair class={`h-5 w-5 ${isGettingLocation ? 'animate-spin text-amstram-purple' : ''}`} />
    </button>
    
    {#if !precise}
      <div 
        class="absolute right-10 top-1/2 transform -translate-y-1/2 mr-2"
        on:mouseenter={() => showTooltip = true}
        on:mouseleave={() => showTooltip = false}
      >
        <AlertCircle class="text-red-500 h-5 w-5" />
      </div>
    {/if}
  </div>
  
  {#if showAutocomplete}
    <div 
      class="absolute z-10 w-full mt-1"
      transition:fade={{ duration: 100 }}
    >
      <ul class="bg-white border border-gray-300 rounded-md shadow-lg">
        {#each autocompleteResults as result, index}
          <li>
            <button 
              type="button" 
              class="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out {selectedIndex === index ? 'bg-gray-100 font-semibold' : ''}" 
              on:click={() => selectLocation(result, autocompletePressions[index])}
            >
              {result}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  
  {#if !precise}
    <div 
      class="absolute z-20 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md shadow-lg mt-2 right-0"
      transition:fly={{ y: 10, duration: 200 }}
    >
      {contenu[lang].needMorePreciseAddress}
    </div>
  {/if}
  
  {#if geolocationError}
    <div 
      class="absolute z-20 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md shadow-lg mt-2 left-0 right-0"
      transition:fly={{ y: 10, duration: 200 }}
    >
      {geolocationError}
    </div>
  {/if}
</div>