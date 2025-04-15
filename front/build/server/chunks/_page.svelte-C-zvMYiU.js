import { c as create_ssr_component, a as subscribe, v as validate_component } from './ssr-DlLcKc17.js';
import { p as page } from './stores-DmpT9XNO.js';
import './appwrite-C9dUL3ii.js';
import 'aos';
import { H as Header } from './Header-B2gz-SeN.js';
import './exports-DKuYoYKl.js';
import 'appwrite';
import './public-CNzjf1yT.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $page.params.id;
  $$unsubscribe_page();
  return `<div class="min-h-screen py-8 px-4"><div class="h-24">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}</div> <div class="container mx-auto max-w-6xl">${`<div class="flex items-center justify-center min-h-[60vh]" data-svelte-h="svelte-sldrg3"><div class="text-center space-y-4"><div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-purple-400 border-t-transparent"></div> <p class="text-gray-300 text-lg">Loading route information...</p></div></div>`}</div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-C-zvMYiU.js.map
