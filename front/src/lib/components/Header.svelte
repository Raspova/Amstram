<script lang="ts">
    import Logo from '$lib/components/Logo.svelte';
    import Login from "$lib/components/auth/Login.svelte";
    import { onMount } from "svelte";
    import { getUser } from "$lib/appwrite";
    import { goto } from '$app/navigation';
    import { contenu } from "$lib/contenu";
    import { Settings2 } from "lucide-svelte";
    import { fade, slide } from 'svelte/transition';
    export let lang: string = "fr";
    export let loginComponent: Login | null = null;
    export let last_service: string = "";
    export let last_price: number = 0;
    
    export function reserve(service: string, price: number) {
      console.log(service, price);
    }

    let admin: boolean = false;
    let isMenuOpen = false;
    let connected = false;

    onMount(async () => {
      const user = await getUser();
      if (!user) {
        connected = false;
        return;
      }
      connected = true;
      if (user.labels.includes("admin")) {
        admin = true;
      }
    });
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }

  </script>
  
  <header class="flex justify-between items-center p-4 max-w-7xl mx-auto">
    <div class="absolute left-0 top-0 mt-5 ml-10" data-aos="zoom-in-right" on:click={() => goto("/")}>
      <Logo />
    </div>
    <button 
    class="md:hidden absolute right-5 top-12  text-amstram-white hover:text-amstram-purple transition-colors"
    data-aos="fade-left"
    data-aos-delay="100"
    data-aos-duration="1000"
    on:click={toggleMenu}
    aria-label="Toggle menu"
  >
    <Settings2 size={40} />
  </button>
  
    <div class="hidden md:flex absolute right-1   md:top-9 flex flex-col md:flex-row items-center space-x-4 md:mr-20 mr-1 md:mt-5 mt-5" data-aos="fade-left"
    data-aos-delay="100"
    data-aos-duration="1500"
    >
      <Login bind:this={loginComponent} {lang} on:login={(e) => { reserve(last_service, last_price); e.preventDefault();}}/>
      {#if admin}
        <button on:click={() => goto("/admin")} class="bg-amstram-purple text-black font-bold py-2 px-4 rounded hover:bg-blue-700">Admin Page</button>
      {:else if connected}
        <button on:click={() => goto("/route")} class="bg-amstram-purple text-black font-bold py-2 px-4 rounded hover:bg-blue-700">{contenu[lang].myRoutes}</button>
      {/if}
      <label for="language-select" class="sr-only">Choisir la langue</label>
      <select id="language-select" bind:value={lang} class="flex mt-5 md:mt-0 items-center space-x-1 border border-amstram-white px-2 py-1 rounded bg-transparent text-amstram-white">
        <option value="fr" class="text-amstram-black bg-gray-600">FR</option>
        <option value="en" class="text-amstram-black bg-gray-600">EN</option>
      </select>
    </div>

  <!-- Mobile Menu -->
  {#if isMenuOpen}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 z-10"
    on:click={toggleMenu}
    transition:fade
  ></div>
  
  <div
    class="absolute top-16 right-4 bg-gray-800 rounded-lg shadow-lg p-4 space-y-4 min-w-[200px] z-20"
    transition:slide={{ duration: 200 }}
  >
    <div class="flex flex-col space-y-4">
      <Login 
        bind:this={loginComponent} 
        {lang} 
        on:login={(e) => { 
          reserve(last_service, last_price); 
          e.preventDefault();
          toggleMenu();
        }}
      />
      
      {#if admin}
        <button 
          on:click={() => {
            goto("/admin");
            toggleMenu();
          }} 
          class="bg-amstram-purple text-black font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-colors w-full"
        >
          Admin Page
        </button>
      {:else}
        <button 
          on:click={() => {
            goto("/route");
            toggleMenu();
          }} 
          class="bg-amstram-purple text-black font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-colors w-full"
        >
          {contenu[lang].myRoutes}
        </button>
      {/if}
      
      <select 
        bind:value={lang} 
        class="border border-amstram-white px-2 py-1 rounded bg-transparent text-amstram-white w-full"
      >
        <option value="fr" class="text-amstram-black bg-gray-600">FR</option>
        <option value="en" class="text-amstram-black bg-gray-600">EN</option>
      </select>
    </div>
  </div>
{/if}
</header>