<script>
    import { page } from '$app/stores';
    import { verifyEmail, sendEmailVerification, getUser } from '$lib/appwrite';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import AuthComponant from '$lib/components/auth/AuthComponant.svelte';
    
    let id = $page.url.searchParams.get('userId') || '';
    let secret = $page.url.searchParams.get('secret') || '';
    let isAuthenticated = true;
    console.log(id, secret)
    function handleLogin() {
        isAuthenticated = true;
        window.location.reload();
    }
    onMount(async () =>  {
        
        const res = await verifyEmail(id, secret)
        if (! res) {
            alert("Erreur lors de la vérification de l'email, veuillez réessayer")
            try {
                if (!await getUser())
                    isAuthenticated = false;
                else
                    await sendEmailVerification()
            } catch (error) {
                alert("Erreur lors du renvoi de l'email,vous etes possiblement pas connecter" + error)
                console.error(error)
            }
        }
        else {
          await goto("/");
        }

    })
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    #titleEmail {
        font-size: 40px;
        color: #333;
        margin-bottom: 20px;
        background: #f9f9f9;
        opacity: 4      0%;
         border-radius: 50px;
         padding: 20px;
    }
    .loader {
        border: 8px solid #f3f3f3; /* Couleur de fond */
        border-top: 8px solid #3498db; /* Couleur de la partie tournante */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

<div class="container">
    {#if !isAuthenticated}
    <AuthComponant  on:login={handleLogin}/> <!-- Affiche le composant d'authentification si l'utilisateur n'est pas connecté -->
    {:else}
    <h1 id="titleEmail"   >Vérification de l'email</h1>
    <div class="loader"></div>
    {/if}
</div>
