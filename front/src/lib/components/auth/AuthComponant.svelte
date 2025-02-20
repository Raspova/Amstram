<script lang="ts">
    import { goto } from "$app/navigation";
    import { loginGoogle, loginEmail, signupEmail, getUser, logout } from "$lib/appwrite";
    import { onMount } from "svelte";
    let isSignIn = true; // État pour basculer entre la connexion et l'inscription
    let email = '';
    let password = '';
    let name = '';
    let passwordConfirmation = '';
    export let user: any = null;
    let isLoggedIn = false;
    export let onLogin: (service: string) => void = () => {};
    export let act = false;
    import { createEventDispatcher } from 'svelte'
    let telephone = '';
	
    export let lang = "fr";
    const contenu: any = {
        fr: {
            welcome: "Bienvenue",
            login: "Se connecter",
            signUp: "S'inscrire",
            logout: "Se déconnecter",
            forgotPassword: "Mot de passe oublié ?",
            name: "Nom",
            password : "Mot de passe",
            passwordConfirmation: "Confirmation du mot de passe",
            googleSignIn: "Se connecter avec Google",
            orContinueWith: "Ou continuez avec",
            telephone: "Telephone",
            phoneNumber: "Numéro de téléphone commence par + (+337 ou +336)",
            enterPhoneNumber: "Entrez votre numéro de téléphone"
        },
        en: {
            welcome: "Welcome",
            login: "Login",
            signUp: "Sign Up",
            logout: "Logout",
            forgotPassword: "Forgot password ?",
            name: "Name",
            password : "Password",
            passwordConfirmation: "Password confirmation",
            googleSignIn: "Login with Google",
            orContinueWith: "Or continue with",
            telephone: "Telephone",
            phoneNumber: "Phone number start with + (+337 or +336)",
            enterPhoneNumber: "Enter your phone number"
        }
    }
  
    const dispatch = createEventDispatcher()

    async function handleSignIn() {
        try {
            await loginEmail(email, password);
            user = await getUser();
            if (!user) {
                throw new Error("User not found");
            }
            isLoggedIn = user ? true : false;
            if (act) {
               console.log("act");
            }
            dispatch('login');
        } catch (error) {
            alert("Email or password incorrect");
            console.error("Error during login:", error);
        }
    };

    async function handleSignUp() {
        try {
            let res = await signupEmail(email, password, passwordConfirmation, name, telephone);
            user = await getUser();
            if (!user) {
                throw new Error("User not found");
            }
            isLoggedIn = user ? true : false;
            if (act) {
                onLogin();
            }
            dispatch('login');
        } catch (error) {
            alert("Accout Creation fail");
            console.error("Error during signup:", error);
        }
    };

    const handleGoogleSignIn = () => {
        const params = new URLSearchParams(window.location.search);
        loginGoogle(params.toString());
    };

    async function getUserInfo() {
        try {
            user = await getUser();
            //console.log("->>>  getUser", user);
            isLoggedIn = user ? true : false;
        } catch (error) {
            console.error("Error during getUserInfo:", error);
        }
    }
    onMount(() => {
        getUserInfo();
    });
</script>

{#if !isLoggedIn}
     <div class="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div class="flex justify-center p-4 bg-gray-200">
            <button 
                on:click={() => isSignIn = true} 
                class="{isSignIn ? 'bg-white text-gray-900' : 'bg-gray-200 text-gray-600'} px-4 py-2 rounded-tl-lg rounded-tr-lg font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-gray-900"
            >
                {contenu[lang].login}
            </button>
            <button 
                on:click={() => isSignIn = false} 
                class="{!isSignIn ? 'bg-white text-gray-900' : 'bg-gray-200 text-gray-600'} px-4 py-2 rounded-tl-lg rounded-tr-lg font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-gray-900"
            >
                {contenu[lang].signUp}
            </button>
        </div>

        <div class="p-8">
            {#if isSignIn}
                <form on:submit|preventDefault={handleSignIn} class="space-y-6">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input id="email" type="email" bind:value={email} placeholder="Enter your email" class="text-black mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required />
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">{contenu[lang].password}</label>
                        <input id="password" type="password" bind:value={password} placeholder="Enter your password" class="text-black mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required />
                    </div>
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                        {contenu[lang].login}
                    </button>
                    <div class="text-sm">
                        <a href="#" class="font-medium text-black hover:text-gray-600 transition duration-300 ease-in-out">{contenu[lang].forgotPassword}</a>
                    </div>
                </form>
            {:else}
                <form on:submit|preventDefault={handleSignUp} class="space-y-6">
                    <div>
                        <label for="signup-email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input id="signup-email" type="email" bind:value={email} placeholder="Enter your email" class="mt-1 text-black block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required />
                    </div>
                    <div>
                        <label for="signup-name" class="block text-sm font-medium text-gray-700">{contenu[lang].name}</label>
                        <input id="signup-name" type="text" bind:value={name} placeholder="Enter your name" class=" text-black mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required />
                    </div>
                    <div>
                        <label for="signup-password" class="block text-sm font-medium text-amstram-black">{contenu[lang].password}</label>
                        <input id="signup-password" type="password" bind:value={password} placeholder="Enter your password" class=" text-black mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required />
                    </div>
                    <div>
                        <label for="password-confirmation" class="block text-sm font-medium text-amstram-black">{contenu[lang].passwordConfirmation}</label>
                        <input id="password-confirmation" type="password" bind:value={passwordConfirmation} placeholder="Confirm your password" class=" text-black mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required />
                    </div>
                    <div>
                        <label for="telephone" class="block text-sm font-medium text-amstram-black">{contenu[lang].phoneNumber}</label>
                        <input id="telephone" type="text" bind:value={telephone} placeholder={contenu[lang].enterPhoneNumber} class=" text-black mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required pattern="^\+.*" title="Le numéro de téléphone doit commencer par un +." on:input={e => {
                            if (telephone.startsWith('0')) {
                                telephone = '+33' + telephone.slice(1);
                            }
                        }} />
                    </div>
                        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                            {contenu[lang].signUp}
                    </button>
                </form>
            {/if}

            <div class="mt-6">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">{contenu[lang].orContinueWith}</span>
                    </div>
                </div>

                <div class="mt-6">
                    <button on:click={handleGoogleSignIn} class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out">
                        <img src="icons/Google_logo.svg.webp" alt="Google Logo" class="h-5 w-5 mr-2" />
                        {contenu[lang].googleSignIn}
                    </button>
                </div>
            </div>
        </div>
    </div>
 
{:else if user }
    <div class="flex flex-col items-center justify-center bg-gray-100 text-gray-900 p-4">
        <div class="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
            <div class="flex justify-center p-4 bg-gray-200">
                <h2 class="text-lg font-semibold">{contenu[lang].welcome}, {user.name}!</h2>
            </div>
            <div class="p-8">
                <p class="text-sm">Email: {user.email}</p>
                <button on:click={() => {logout().then(() =>  goto('/')  )}} class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300 ease-in-out">
                    {contenu[lang].logout}
                </button>
            </div>
        </div>
    </div>
{/if}