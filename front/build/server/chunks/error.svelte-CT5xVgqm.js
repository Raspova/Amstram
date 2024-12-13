import { c as create_ssr_component, a as subscribe, e as escape } from './ssr-DO2O6IHR.js';
import { p as page } from './stores-DN7bB664.js';
import './client-CnCRRyPd.js';
import './exports-CTha0ECg.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-CT5xVgqm.js.map
