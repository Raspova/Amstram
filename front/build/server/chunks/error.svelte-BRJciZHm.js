import { c as create_ssr_component, s as subscribe, e as escape } from './hooks.server-DLkNd8Ku.js';
import { p as page } from './stores-D9SskGOa.js';
import './exports-CTha0ECg.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-BRJciZHm.js.map
