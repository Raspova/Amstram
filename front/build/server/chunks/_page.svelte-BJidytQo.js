import { c as create_ssr_component, a as subscribe, v as validate_component } from './ssr-DO2O6IHR.js';
import { p as page } from './stores-DN7bB664.js';
import './appwrite-Dos-RaEz.js';
import 'aos';
import { H as Header } from './Header-BzCaoItO.js';
import './client-CnCRRyPd.js';
import './exports-CTha0ECg.js';
import 'appwrite';
import './public-CNzjf1yT.js';
import './contenu-C9v4NG6M.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $page.params.id;
  $$unsubscribe_page();
  return `<div class="min-h-screen py-8 px-4"><div class="h-24">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}</div> <div class="container mx-auto">${`<div class="text-center p-8 bg-white rounded-lg shadow" data-svelte-h="svelte-1vx17ij"><div class="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div> <p class="text-xl text-gray-700">Loading route information...</p></div>`}</div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BJidytQo.js.map
