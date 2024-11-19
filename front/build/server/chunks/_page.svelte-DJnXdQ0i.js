import { c as create_ssr_component, s as subscribe } from './hooks.server-DLkNd8Ku.js';
import { p as page } from './stores-D9SskGOa.js';
import './appwrite-CTkzZmTY.js';
import './exports-CTha0ECg.js';
import 'appwrite';

const css = {
  code: ".container.svelte-1qvdd05{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-size:40px}h1.svelte-1qvdd05{color:#333;margin-bottom:20px;background:#f9f9f9;opacity:4      0%;border-radius:50px;padding:20px}.loader.svelte-1qvdd05{border:8px solid #f3f3f3;border-top:8px solid #3498db;border-radius:50%;width:50px;height:50px;animation:svelte-1qvdd05-spin 1s linear infinite}@keyframes svelte-1qvdd05-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    import { page } from '$app/stores';\\n    import { verifyEmail, sendEmailVerification } from '$lib/appwrite';\\n    import { onMount } from 'svelte';\\n    import { goto } from '$app/navigation';\\n    \\n    let id = $page.params.id || '';\\n    let secret = $page.params.secret || '';\\n    console.log(id, secret)\\n    onMount(async () =>  {\\n        const res = await verifyEmail(id, secret)\\n        if (! res) {\\n            alert(\\"Erreur lors de la vérification de l'email, veuillez réessayer\\")\\n            try {\\n                await sendEmailVerification()\\n            } catch (error) {\\n                alert(\\"Erreur lors du renvoi de l'email,vous etes possiblement pas connecter\\" + error)\\n                console.error(error)\\n            }\\n        }\\n        else {\\n          await goto(\\"/\\");\\n        }\\n\\n    })\\n<\/script>\\n\\n<style>\\n    .container {\\n        display: flex;\\n        flex-direction: column;\\n        align-items: center;\\n        justify-content: center;\\n        height: 100vh;\\n        font-size: 40px;\\n    }\\n    h1 {\\n        color: #333;\\n        margin-bottom: 20px;\\n        background: #f9f9f9;\\n        opacity: 4      0%;\\n         border-radius: 50px;\\n         padding: 20px;\\n    }\\n    .loader {\\n        border: 8px solid #f3f3f3; /* Couleur de fond */\\n        border-top: 8px solid #3498db; /* Couleur de la partie tournante */\\n        border-radius: 50%;\\n        width: 50px;\\n        height: 50px;\\n        animation: spin 1s linear infinite;\\n    }\\n    @keyframes spin {\\n        0% { transform: rotate(0deg); }\\n        100% { transform: rotate(360deg); }\\n    }\\n</style>\\n\\n<div class=\\"container\\">\\n    <h1  >Vérification de l'email</h1>\\n    <div class=\\"loader\\"></div>\\n</div>"],"names":[],"mappings":"AA4BI,yBAAW,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,KAAK,CACb,SAAS,CAAE,IACf,CACA,iBAAG,CACC,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,OAAO,CACnB,OAAO,CAAE,CAAC,MAAM,EAAE,CACjB,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IACd,CACA,sBAAQ,CACJ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAC7B,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,mBAAI,CAAC,EAAE,CAAC,MAAM,CAAC,QAC9B,CACA,WAAW,mBAAK,CACZ,EAAG,CAAE,SAAS,CAAE,OAAO,IAAI,CAAG,CAC9B,IAAK,CAAE,SAAS,CAAE,OAAO,MAAM,CAAG,CACtC"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let id = $page.params.id || "";
  let secret = $page.params.secret || "";
  console.log(id, secret);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<div class="container svelte-1qvdd05" data-svelte-h="svelte-1lafvz3"><h1 class="svelte-1qvdd05">Vérification de l&#39;email</h1> <div class="loader svelte-1qvdd05"></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DJnXdQ0i.js.map
