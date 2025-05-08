<script lang="ts">
import { onMount } from "svelte";
import Header from "$lib/components/Header.svelte";

let lang: string;

onMount(async () => {
    
        const urlParams = new URLSearchParams(window.location.search);
      
        lang = urlParams.get('lang') || 'fr';
})
</script>

<div class=" h-24 mb-12">
    <Header bind:lang/>
</div>
<div>

    <slot /> 
</div>