<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let onPasswordCorrect: () => void;
  
  let password = '';
  let error = false;
  let isVisible = true;

  function handleSubmit() {
    if (password === 'REVELATION') {
      isVisible = false;
      savePassword();
      onPasswordCorrect();
    } else {
      error = true;
    }
  }

  onMount(() => {
    if (browser) {
      const savedPassword = localStorage.getItem('site_password');
      if (savedPassword === 'REVELATION') {
        isVisible = false;
        onPasswordCorrect();
      }
    }
  });

  function savePassword() {
    if (browser) {
      localStorage.setItem('site_password', password);
    }
  }
</script>

{#if isVisible}
  <div class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
    <div class="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
      <h2 class="text-3xl font-bold text-white mb-6 text-center">Protection par mot de passe</h2>
      
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div>
          <input
            type="password"
            bind:value={password}
            placeholder="Entrez le mot de passe"
            class="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-amstram-purple"
          />
        </div>
        
        {#if error}
          <p class="text-red-500 text-sm">Mot de passe incorrect</p>
        {/if}
        
        <button
          type="submit"
          class="w-full bg-amstram-purple text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Accéder au site
        </button>
      </form>
    </div>
  </div>
{/if} 