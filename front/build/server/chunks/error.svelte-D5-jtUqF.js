import { c as create_ssr_component, a as subscribe, e as escape } from './ssr-F6ii-uTE.js';
import { p as page } from './stores-D9KoPb7d.js';
import './client-CnCRRyPd.js';
import './exports-CTha0ECg.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-D5-jtUqF.js.map
