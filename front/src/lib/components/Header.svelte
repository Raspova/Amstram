<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import Login from "$lib/components/auth/Login.svelte";
  import { onMount } from "svelte";
  import { getUser } from "$lib/appwrite";
  import { goto } from "$app/navigation";
  import { contenu } from "$lib/contenu";
  import { Settings2 } from "lucide-svelte";
  import { fade, slide } from "svelte/transition";
  export let lang: string = "fr";
  export let loginComponent: Login | null = null;
  export let last_service: string = "";
  export let last_price: number = 0;

  export function reserve(service: string, price: number) {
    console.log(service, price);
  }

  // Liste des langues avec leurs drapeaux emoji
  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "mu", name: "Kreol Morisien", flag: "🇲🇺" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "vl", name: "Vlaams", flag: "🇧🇪" },
    { code: "pl", name: "Polski", flag: "🇵🇱" }
  ];

  let admin: boolean = false;
  let isMenuOpen = false;
  let connected = false;
  let user: any = null;
  onMount(async () => {
    user = await getUser();
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
  <button
    type="button"
    class="absolute left-0 top-0 mt-5 ml-10"
    data-aos="zoom-in-right"
    on:click={() => goto("/")}
  >
    <Logo />
  </button>
  <button
    class="md:-mt-40 absolute right-5 top-12 text-amstram-white hover:text-amstram-purple transition-colors"
    data-aos="fade-left"
    data-aos-delay="100"
    data-aos-duration="1000"
    on:click={toggleMenu}
    aria-label="Toggle menu"
  >
    <Settings2 size={40} />
  </button>

  <div
    class="flex absolute right-1 md:top-9 flex-col md:flex-row items-center space-x-4 md:mr-20 mr-1 md:mt-5 mt-5"
    data-aos="fade-left"
    data-aos-delay="100"
    data-aos-duration="1500"
  >
    <div>
      <p class="text-lg text-center font-bold hidden md:block">
        {contenu[lang].welcome}, {user ? user.name : ""}
      </p>

      <div class="flex flex-row gap-4">
        <div class="-mt-40 md:mt-0">
          <!-- mt-40 = BC AUTH SHIT-->
          <Login
            bind:this={loginComponent}
            {lang}
            on:login={(e) => {
              reserve(last_service, last_price);
              e.preventDefault();
            }}
          />
        </div>
        <div class="hidden md:block">
          {#if admin}
            <button
              on:click={() => goto("/admin")}
              class="bg-amstram-purple text-black font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Admin Page
            </button>
          {:else if connected}
            <button
              on:click={() => goto("/route")}
              class="bg-amstram-purple text-black font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              {contenu[lang].myRoutes}
            </button>
          {/if}
        </div>
      </div>
    </div>

    <label for="language-select" class="sr-only">Choisir la langue</label>

    <div class="hidden md:block mt-7 relative">
      <select
        id="language-select"
        bind:value={lang}
        class="appearance-none pl-8 pr-10 py-1 rounded bg-transparent text-amstram-white border border-amstram-white focus:outline-none focus:ring-1 focus:ring-amstram-purple"
      >
        {#each languages as language}
          <option value={language.code} class="text-amstram-black bg-gray-700 py-2 flex items-center">
            {language.flag} {language.code.toUpperCase()}
          </option>
        {/each}
      </select>
      
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg class="fill-current h-4 w-4 text-amstram-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isMenuOpen}
    <button
      class="fixed inset-0 bg-black bg-opacity-50 z-10"
      on:click={toggleMenu}
      on:keydown={(e) => e.key === "Escape" && toggleMenu()}
      transition:fade
    ></button>

    <div
      class="absolute top-16 right-4 bg-gray-800 rounded-lg shadow-lg p-4 space-y-4 min-w-[200px] z-20"
      transition:slide={{ duration: 200 }}
    >
      <div class="flex flex-col space-y-4">
        <Login
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
        {:else if connected}
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

        <div class="relative">
          <select
            bind:value={lang}
            class="appearance-none pl-8 pr-10 py-2 rounded bg-transparent text-amstram-white border border-amstram-white focus:outline-none focus:ring-1 focus:ring-amstram-purple w-full"
          >
            {#each languages as language}
              <option value={language.code} class="text-amstram-black bg-gray-700 py-2">
                {language.flag} {language.name}
              </option>
            {/each}
          </select>
          
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg class="fill-current h-4 w-4 text-amstram-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  {/if}
</header>