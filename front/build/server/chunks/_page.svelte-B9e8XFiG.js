import { c as create_ssr_component, a as subscribe, e as escape } from './ssr-DlLcKc17.js';
import { p as page } from './stores-CwvfKQwl.js';
import './appwrite-C9dUL3ii.js';
import { c as contenu } from './contenu-CVz-VG3i.js';
import './exports-CTha0ECg.js';
import 'appwrite';
import './public-CNzjf1yT.js';

const css = {
  code: ".container.svelte-n6hqs5{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh}#titleEmail.svelte-n6hqs5{font-size:40px;color:#333;margin-bottom:20px;background:#f9f9f9;opacity:4      0%;border-radius:50px;padding:20px}.loader.svelte-n6hqs5{border:8px solid #f3f3f3;border-top:8px solid #3498db;border-radius:50%;width:50px;height:50px;animation:svelte-n6hqs5-spin 1s linear infinite}@keyframes svelte-n6hqs5-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    import { page } from '$app/stores';\\n    import { verifyEmail, sendEmailVerification, getUser } from '$lib/appwrite';\\n    import { onMount } from 'svelte';\\n    import { goto } from '$app/navigation';\\n    import AuthComponant from '$lib/components/auth/AuthComponant.svelte';\\n    import {contenu} from '$lib/contenu'\\n\\n    \\n    let id = $page.url.searchParams.get('userId') || '';\\n    let secret = $page.url.searchParams.get('secret') || '';\\n    let isAuthenticated = true;\\n    console.log(id, secret)\\n    function handleLogin() {\\n        isAuthenticated = true;\\n        window.location.reload();\\n    }\\n    onMount(async () =>  {\\n        \\n        const res = await verifyEmail(id, secret)\\n        if (! res) {\\n            alert(\\"Erreur lors de la vérification de l'email, veuillez réessayer\\")\\n            try {\\n                if (!await getUser())\\n                    isAuthenticated = false;\\n                else\\n                    await sendEmailVerification()\\n            } catch (error) {\\n                alert(\\"Erreur lors du renvoi de l'email,vous etes possiblement pas connecter\\" + error)\\n                console.error(error)\\n            }\\n        }\\n        else {\\n          await goto(\\"/\\");\\n        }\\n\\n    })\\n<\/script>\\n\\n<style>\\n    .container {\\n        display: flex;\\n        flex-direction: column;\\n        align-items: center;\\n        justify-content: center;\\n        height: 100vh;\\n    }\\n    #titleEmail {\\n        font-size: 40px;\\n        color: #333;\\n        margin-bottom: 20px;\\n        background: #f9f9f9;\\n        opacity: 4      0%;\\n         border-radius: 50px;\\n         padding: 20px;\\n    }\\n    .loader {\\n        border: 8px solid #f3f3f3; /* Couleur de fond */\\n        border-top: 8px solid #3498db; /* Couleur de la partie tournante */\\n        border-radius: 50%;\\n        width: 50px;\\n        height: 50px;\\n        animation: spin 1s linear infinite;\\n    }\\n    @keyframes spin {\\n        0% { transform: rotate(0deg); }\\n        100% { transform: rotate(360deg); }\\n    }\\n</style>\\n\\n<div class=\\"container\\">\\n    {#if !isAuthenticated}\\n    <AuthComponant  on:login={handleLogin}/> <!-- Affiche le composant d'authentification si l'utilisateur n'est pas connecté -->\\n    {:else}\\n    <h1 id=\\"titleEmail\\">{contenu.verifyEmail}</h1>\\n    <div class=\\"loader\\"></div>\\n    {/if}\\n</div>\\n"],"names":[],"mappings":"AAwCI,wBAAW,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,KACZ,CACA,yBAAY,CACR,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,OAAO,CACnB,OAAO,CAAE,CAAC,MAAM,EAAE,CACjB,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IACd,CACA,qBAAQ,CACJ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAC7B,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,kBAAI,CAAC,EAAE,CAAC,MAAM,CAAC,QAC9B,CACA,WAAW,kBAAK,CACZ,EAAG,CAAE,SAAS,CAAE,OAAO,IAAI,CAAG,CAC9B,IAAK,CAAE,SAAS,CAAE,OAAO,MAAM,CAAG,CACtC"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let id = $page.url.searchParams.get("userId") || "";
  let secret = $page.url.searchParams.get("secret") || "";
  console.log(id, secret);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<div class="container svelte-n6hqs5">${`<h1 id="titleEmail" class="svelte-n6hqs5">${escape(contenu.verifyEmail)}</h1> <div class="loader svelte-n6hqs5"></div>`}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-B9e8XFiG.js.map
