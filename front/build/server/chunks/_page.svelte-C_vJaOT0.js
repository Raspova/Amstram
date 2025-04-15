import { c as create_ssr_component, v as validate_component, b as each, e as escape } from './ssr-DlLcKc17.js';
import './stores-DmpT9XNO.js';
import './appwrite-C9dUL3ii.js';
import { T as Table, a as Table_header, b as Table_row, c as Table_head, A as Arrow_up_down, d as Table_body, e as Table_cell, B as Button } from './table-row--T-4XEPz.js';
import { i as intStatus } from './contenu-CVz-VG3i.js';
import { H as Header } from './Header-B2gz-SeN.js';
import 'aos';
import './exports-DKuYoYKl.js';
import 'appwrite';
import './public-CNzjf1yT.js';
import './create-DtR7pMyr.js';
import './index2-XWNibX1_.js';
import './utils-Z8CT6ubJ.js';

let searchTerm = "";
function filterRoutes(route) {
  return Object.values(route).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()));
}
function formatDate(dateString) {
  return new Date(dateString).toLocaleString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredRoutes;
  let routes = [];
  const columns_data = {
    "Depart": "depart",
    "Arrival": "arrival",
    "Disponibility": "disponibility",
    "Vehicle Mark": "vMark",
    "Price": "price",
    "Status": "status",
    "Created At": "$createdAt"
  };
  filteredRoutes = routes.filter(filterRoutes);
  return `<div class="my-10">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}</div> <div class="min-h-screen p-6"><div class="max-w-[1400px] mx-auto space-y-6"><div class="flex items-center justify-between" data-svelte-h="svelte-2miess"><h1 class="text-3xl font-bold">Tableau de bord</h1> <div class="relative w-96"></div></div> <div class="rounded-lg border border-gray-700 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white"><div class="overflow-x-auto">${validate_component(Table, "Table").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Table_header, "TableHeader").$$render($$result, { class: "bg-gray-800/50" }, {}, {
        default: () => {
          return `${validate_component(Table_row, "TableRow").$$render($$result, {}, {}, {
            default: () => {
              return `${each(Object.keys(columns_data), (header) => {
                return `${validate_component(Table_head, "TableHead").$$render($$result, { class: "text-gray-300 hover:text-white" }, {}, {
                  default: () => {
                    return `<button class="flex items-center space-x-1 w-full"><span>${escape(header)}</span> ${validate_component(Arrow_up_down, "ArrowUpDown").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button> `;
                  }
                })}`;
              })}`;
            }
          })}`;
        }
      })} ${validate_component(Table_body, "TableBody").$$render($$result, {}, {}, {
        default: () => {
          return `${each(filteredRoutes, (route) => {
            return `${validate_component(Table_row, "TableRow").$$render($$result, { class: "hover:bg-gray-800/50" }, {}, {
              default: () => {
                return `${validate_component(Table_cell, "TableCell").$$render($$result, { class: "min-w-[250px] p-4" }, {}, {
                  default: () => {
                    return `<div class="bg-gray-800/30 p-3 rounded-lg">${escape(route.depart)}</div> `;
                  }
                })} ${validate_component(Table_cell, "TableCell").$$render($$result, { class: "min-w-[250px] p-4" }, {}, {
                  default: () => {
                    return `<div class="bg-gray-800/30 p-3 rounded-lg">${escape(route.arrival)}</div> `;
                  }
                })} ${validate_component(Table_cell, "TableCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(formatDate(route.disponibility))}`;
                  }
                })} ${validate_component(Table_cell, "TableCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(route.vMark)}`;
                  }
                })} ${validate_component(Table_cell, "TableCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(route.price)}`;
                  }
                })} ${validate_component(Table_cell, "TableCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(intStatus[route.status])} `;
                  }
                })} ${validate_component(Table_cell, "TableCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(formatDate(route.$createdAt))}`;
                  }
                })} ${validate_component(Table_cell, "TableCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Button, "Button").$$render($$result, { class: "bg-blue-500 text-white" }, {}, {
                      default: () => {
                        return `Voir Détails
                                    `;
                      }
                    })} `;
                  }
                })} `;
              }
            })}`;
          })}`;
        }
      })}`;
    }
  })}</div></div></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-C_vJaOT0.js.map
