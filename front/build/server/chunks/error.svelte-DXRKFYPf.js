import { c as create_ssr_component, a as subscribe, e as escape } from './ssr-DlLcKc17.js';
import { p as page } from './stores-DmpT9XNO.js';
import './exports-DKuYoYKl.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-DXRKFYPf.js.map
