import { c as create_ssr_component, v as validate_component, b as each, e as escape } from './ssr-F6ii-uTE.js';
import './stores-BENe_ua0.js';
import './appwrite-C9dUL3ii.js';
import { T as Table, a as Table_header, b as Table_row, c as Table_head, A as Arrow_up_down, d as Table_body, e as Table_cell, B as Button } from './table-row-BNwc8gtI.js';
import { i as intStatus } from './contenu-DdOl5fvT.js';
import 'aos';
import { H as Header } from './Header-DKBMObN7.js';
import './exports-CTha0ECg.js';
import 'appwrite';
import './public-CNzjf1yT.js';
import './create-BsenWm4N.js';
import './index2-CChkn_po.js';
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
  let openDropdown = null;
  const columns_data = {
    "Depart": "depart",
    "Arrival": "arrival",
    "Disponibility": "disponibility",
    "Owner Contact": "ownerContact",
    "V Type": "vType",
    "V Mark": "vMark",
    "Prix": "price",
    "Status": "status",
    "Created At": "$createdAt",
    "Updated At": "$updatedAt"
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
                    return `${escape(route.ownerContact)}`;
                  }
                })} ${validate_component(Table_cell, "TableCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `<span class="px-2 py-1 rounded-full bg-gray-700 text-sm">${escape(route.vType)}</span> `;
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
                    return `<div class="relative">${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        variant: "outline",
                        size: "sm",
                        class: "bg-gray-800/50 border-gray-700 hover:bg-gray-700 w-full"
                      },
                      {},
                      {
                        default: () => {
                          return `${escape(intStatus[route.status] || "À traiter")} `;
                        }
                      }
                    )} ${openDropdown === route.$id ? `<div class="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg overflow-hidden z-10"><button class="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors" data-svelte-h="svelte-c7ssbp">Accepter</button> <button class="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors" data-svelte-h="svelte-1bky2g6">Annuler</button> <button class="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors" data-svelte-h="svelte-cqp431">Completer</button> </div>` : ``}</div> `;
                  }
                })} ${validate_component(Table_cell, "TableCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(formatDate(route.$createdAt))}`;
                  }
                })} ${validate_component(Table_cell, "TableCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(formatDate(route.$updatedAt))}`;
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
//# sourceMappingURL=_page.svelte-Bm2DtZjj.js.map
