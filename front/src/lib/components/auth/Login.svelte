<script lang="ts">
    import { LogIn, X } from 'lucide-svelte';
    import AuthComponant from './AuthComponant.svelte';
    import { onMount } from 'svelte';
    import { getUser, logout } from '$lib/appwrite';   

    let user: any = null;
    let isLoggedIn = false;
    let showAuthComponent = false;
    export let lang = "fr";
    const contenu: any = {
        fr: {
            welcome: "Bienvenue",
            login: "Se connecter",
            logout: "Se déconnecter"
        },
        en: {
            welcome: "Welcome",
            login: "Login",
            logout: "Logout"
        }
    }

    async function refreshUser() {
        user = await getUser();
        isLoggedIn = user ? true : false;
    }
    onMount(async () => {
        await refreshUser();
    });

    function closeAuthComponent() {
        showAuthComponent = false;
    }
</script>

{#if !isLoggedIn && !showAuthComponent}
    <button on:click={() => showAuthComponent = true} class="flex items-center space-x-1 bg-amstram-purple px-3 py-1 rounded">
        <LogIn class="w-4 h-4" />
        <span>{contenu[lang].login}</span>
    </button>    
{:else if showAuthComponent}
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="relative bg-white rounded-lg shadow-lg p-6">
            <button 
                on:click={closeAuthComponent}
                class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 ease-in-out"
                aria-label="Close authentication component"
            >
                <X class="w-6 h-6" />
            </button>
            <AuthComponant lang={lang} on:login={() => {refreshUser().then(() => {showAuthComponent = false;});}} />
        </div>
    </div>
{/if}

{#if isLoggedIn && !showAuthComponent}
    <p class="text-lg text-center hidden md:block ">{contenu[lang].welcome}, {user.name}</p>
    <button 
        on:click={() => {
            logout().then(() => {
                getUser();
                isLoggedIn = false;
            });
        }} 
        class=" py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amstram-purple hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300 ease-in-out"
    >
        {contenu[lang].logout}
    </button>
{/if}