<script>
    import { page } from '$app/stores';
    import { verifyEmail, sendEmailVerification } from '$lib/appwrite';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    let id = $page.url.searchParams.get('userId') || '';
    let secret = $page.url.searchParams.get('secret') || '';
    console.log(id, secret)
    onMount(async () =>  {
        console.log("id : ", id, "secret : ", secret)
        const res = await verifyEmail(id, secret)
        if (! res) {
            alert("Erreur lors de la vérification de l'email, veuillez réessayer")
            try {
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
        font-size: 40px;
    }
    h1 {
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
    <h1  >Vérification de l'email</h1>
    <div class="loader"></div>
</div>