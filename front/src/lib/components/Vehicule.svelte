<script lang="ts">
  import { Car, Search, FileText, Users, Cog } from 'lucide-svelte'
  import { contenu } from '$lib/contenu';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  // Props with default values
  export let vehicleType = ''
  export let makeModel = ''
  export let numberPlate = ''
  export let seatingCapacity = ''
  export let gearbox = ''
  export let comments = ''
  export let lang = 'fr'
  // Vehicle types
  const vehicleTypes = contenu[lang].vehicleTypes
  
  // Seating capacities
  const capacities = ['2', '4', '5', '7', '8', '9']
  
  // Gearbox types
  const gearboxTypes = ['Manual', 'Automatic', 'Semi-automatic', 'CVT']

  // Export function to get all values
  export function getVehicleInfo() {
    return {
      "vType": vehicleType,
      "vMark": makeModel,
      "vImmatriculation": numberPlate,
      "vCap": seatingCapacity,
      "vBox": gearbox,
      "vComment": comments
    }
  }

  let valid = false;
  $: valid = vehicleType.length > 0 && makeModel.length > 0 && numberPlate.length > 0 && seatingCapacity.length > 0 && gearbox.length > 0;
  $: if (valid) {
      dispatch('valid');
  } else {
      dispatch('invalid');
  }
  export function isValid(): boolean {
    return (
      vehicleType.length > 0 &&
      makeModel.length > 0 &&
      numberPlate.length > 0 &&
      seatingCapacity.length > 0 &&
      gearbox.length > 0
    )
  }
</script>

<div class="bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
  <div class="flex items-center gap-2 mb-8">
    <Car class="w-6 h-6 text-amstram-purple" />
    <h2 class="text-xl font-medium text-gray-700">{contenu[lang].vehicle}</h2>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Type of Vehicle -->
    <div class="space-y-2">
      <label for="vehicleType" class="block text-lg font-medium text-gray-600">{contenu[lang].vehicleType}</label>
      <select
        id="vehicleType"
        bind:value={vehicleType}
        class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
      >
        <option disabled selected value="">{contenu[lang].vehicleType}</option>
        {#each vehicleTypes as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
    </div>

    <!-- Make and Model -->
    <div class="space-y-2">
      <label for="makeModel" class="block text-lg font-medium text-gray-600">{contenu[lang].makeAndModel}</label>
      <div class="relative">
        <Search class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          id="makeModel"
          type="text"
          bind:value={makeModel}
          placeholder={contenu[lang].enterMakeAndModel}
          class="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          maxlength={32}
        />
      </div>
    </div>

    <!-- Number Plate -->
    <div class="space-y-2">
      <label for="numberPlate" class="block text-lg font-medium text-gray-600">{contenu[lang].numberPlate}</label>
      <div class="relative">
        <FileText class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          id="numberPlate"
          type="text"
          bind:value={numberPlate}
          placeholder={contenu[lang].enterNumberPlate}
          class="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          maxlength={15}
        />
      </div>
    </div>

    <!-- Seating Capacity -->
    <div class="space-y-2">
      <label for="seatingCapacity" class="block text-lg font-medium text-gray-600">{contenu[lang].seatingCapacity}</label>
      <div class="relative">
        <Users class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <select
          id="seatingCapacity"
          bind:value={seatingCapacity}
          class="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        >
          <option disabled selected value="">{contenu[lang].seatingCapacity}</option>
          {#each capacities as capacity}
            <option value={capacity}>{capacity} {contenu[lang].seats}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Gearbox -->
    <div class="space-y-2">
      <label for="gearbox" class="block text-lg font-medium text-gray-600">{contenu[lang].gearbox}</label>
      <div class="relative">
        <Cog class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <select
          id="gearbox"
          bind:value={gearbox}
          class="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        >
          <option disabled selected value="">{contenu[lang].gearbox}</option>
          {#each gearboxTypes as type}
            <option value={type}>{contenu[lang][type.toLowerCase()] || type}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Comments -->
  <div class="mt-6 space-y-2">
    <label for="comments" class="block text-lg font-medium text-gray-600">{contenu[lang].commentsDriver}</label>
    <textarea
      id="comments"
      bind:value={comments}
      placeholder={contenu[lang].enterAdditionalComments}
      class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] text-black"
      maxlength={510}
    ></textarea>
  </div>
</div>