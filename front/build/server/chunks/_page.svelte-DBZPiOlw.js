import { c as create_ssr_component, v as validate_component, e as escape, f as createEventDispatcher, d as add_attribute, b as each, g as compute_rest_props, h as spread, i as escape_attribute_value, j as escape_object, a as subscribe } from './ssr-F6ii-uTE.js';
import { a as Card, b as Card_header, c as Card_title, d as Card_content, A as AddressInput, C as Chevron_down } from './AddressInput-BY_p4nXZ.js';
import { c as cn } from './utils-Z8CT6ubJ.js';
import { c as contenu } from './contenu-BYO61Ok2.js';
import { H as Header, I as Icon } from './Header-B274UKdZ.js';
import { m as makeElement, w as withGet } from './create-BsenWm4N.js';
import { w as writable } from './index2-CChkn_po.js';
import './client-CnCRRyPd.js';
import 'appwrite';
import './public-CNzjf1yT.js';
import './exports-CTha0ECg.js';

const Calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2"
      }
    ],
    ["path", { "d": "M3 10h18" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "calendar" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Car = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"
      }
    ],
    ["circle", { "cx": "7", "cy": "17", "r": "2" }],
    ["path", { "d": "M9 17h6" }],
    ["circle", { "cx": "17", "cy": "17", "r": "2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "car" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Circle_check_big = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M21.801 10A10 10 0 1 1 17 3.335" }],
    ["path", { "d": "m9 11 3 3L22 4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "circle-check-big" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Circle_help = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    [
      "path",
      {
        "d": "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
      }
    ],
    ["path", { "d": "M12 17h.01" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "circle-help" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Cog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
      }
    ],
    [
      "path",
      {
        "d": "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      }
    ],
    ["path", { "d": "M12 2v2" }],
    ["path", { "d": "M12 22v-2" }],
    ["path", { "d": "m17 20.66-1-1.73" }],
    ["path", { "d": "M11 10.27 7 3.34" }],
    ["path", { "d": "m20.66 17-1.73-1" }],
    ["path", { "d": "m3.34 7 1.73 1" }],
    ["path", { "d": "M14 12h8" }],
    ["path", { "d": "M2 12h2" }],
    ["path", { "d": "m20.66 7-1.73 1" }],
    ["path", { "d": "m3.34 17 1.73-1" }],
    ["path", { "d": "m17 3.34-1 1.73" }],
    ["path", { "d": "m11 13.73-4 6.93" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "cog" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Euro = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M4 10h12" }],
    ["path", { "d": "M4 14h9" }],
    [
      "path",
      {
        "d": "M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "euro" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const File_text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
      }
    ],
    ["path", { "d": "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { "d": "M10 9H8" }],
    ["path", { "d": "M16 13H8" }],
    ["path", { "d": "M16 17H8" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "file-text" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Map_pinned = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"
      }
    ],
    ["circle", { "cx": "12", "cy": "8", "r": "2" }],
    [
      "path",
      {
        "d": "M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "map-pinned" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Phone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "phone" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "plus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "11", "cy": "11", "r": "8" }],
    ["path", { "d": "m21 21-4.3-4.3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "search" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Shield = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "shield" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const User = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      }
    ],
    ["circle", { "cx": "12", "cy": "7", "r": "4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "user" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Users = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      }
    ],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }],
    ["path", { "d": "M22 21v-2a4 4 0 0 0-3-3.87" }],
    ["path", { "d": "M16 3.13a4 4 0 0 1 0 7.75" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "users" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Card_description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<p${spread(
    [
      {
        class: escape_attribute_value(cn("text-muted-foreground text-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</p>`;
});
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
const defaults = {
  orientation: "horizontal",
  decorative: false
};
const createSeparator = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(withDefaults);
  const { orientation, decorative } = options;
  const root = makeElement("separator", {
    stores: [orientation, decorative],
    returned: ([$orientation, $decorative]) => {
      const ariaOrientation = $orientation === "vertical" ? $orientation : void 0;
      return {
        role: $decorative ? "none" : "separator",
        "aria-orientation": ariaOrientation,
        "aria-hidden": $decorative,
        "data-orientation": $orientation
      };
    }
  });
  return {
    elements: {
      root
    },
    options
  };
};
function createBitAttrs(bit, parts) {
  const attrs = {};
  parts.forEach((part) => {
    attrs[part] = {
      [`data-${bit}-${part}`]: ""
    };
  });
  return (part) => attrs[part];
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function getOptionUpdater(options) {
  return function(key, value) {
    if (value === void 0)
      return;
    const store = options[key];
    if (store) {
      store.set(value);
    }
  };
}
function getSeparatorData() {
  const NAME = "separator";
  const PARTS = ["root"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getSeparatorData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const separator = { ...createSeparator(removeUndefined(props)), getAttrs };
  return {
    ...separator,
    updateOption: getOptionUpdater(separator.options)
  };
}
const Separator$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["orientation", "decorative", "asChild", "el"]);
  let $root, $$unsubscribe_root;
  let { orientation = "horizontal" } = $$props;
  let { decorative = true } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, updateOption, getAttrs } = setCtx({ orientation, decorative });
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  const attrs = getAttrs("root");
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.decorative === void 0 && $$bindings.decorative && decorative !== void 0) $$bindings.decorative(decorative);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    updateOption("orientation", orientation);
  }
  {
    updateOption("decorative", decorative);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>`}`;
});
const PhoneVerification = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { sms_sent = false } = $$props;
  let code = "";
  let telephone = "";
  let { lang = "fr" } = $$props;
  let { verified = false } = $$props;
  const contenu2 = {
    fr: {
      title: "Vérification du téléphone",
      titleVerified: "Numéro vérifié",
      phoneNumber: "Numéro de téléphone",
      enterPhoneNumber: "Entrez votre numéro de téléphone, commencez par +, (+337 ou +336)",
      enterCode: "Entrez le code que vous avez reçu par SMS",
      sendCode: "Envoyer le code",
      verifyNumber: "Vérifier le numéro",
      verifyCode: "Vérifier le code"
    },
    en: {
      title: "Phone verification",
      titleVerified: "Number verified",
      phoneNumber: "Phone number",
      enterPhoneNumber: "Enter your phone number, start with +, (+337 or +336)",
      enterCode: "Enter the code you received by SMS",
      sendCode: "Send code",
      verifyNumber: "Verify number",
      verifyCode: "Verify code"
    }
  };
  function get_verified() {
    return verified;
  }
  if ($$props.sms_sent === void 0 && $$bindings.sms_sent && sms_sent !== void 0) $$bindings.sms_sent(sms_sent);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0) $$bindings.lang(lang);
  if ($$props.verified === void 0 && $$bindings.verified && verified !== void 0) $$bindings.verified(verified);
  if ($$props.get_verified === void 0 && $$bindings.get_verified && get_verified !== void 0) $$bindings.get_verified(get_verified);
  return `${validate_component(Card, "Card.Root").$$render(
    $$result,
    {
      class: "w-full  max-w-md bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
    },
    {},
    {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render(
          $$result,
          {
            class: "bg-gradient-to-r from-white to-gray-200 text-black p-6"
          },
          {},
          {
            default: () => {
              return `<div class="flex flex-col items-center justify-center">${!verified ? `${validate_component(Card_title, "Card.Title").$$render(
                $$result,
                {
                  class: "text-2xl font-bold mb-2 flex items-center"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(Shield, "Shield").$$render($$result, { class: "mr-2" }, {}, {})} ${escape(contenu2[lang].title)}`;
                  }
                }
              )} ${validate_component(Card_description, "Card.Description").$$render($$result, { class: "text-black" }, {}, {
                default: () => {
                  return `${escape(sms_sent ? contenu2[lang].enterCode : contenu2[lang].enterPhoneNumber)}`;
                }
              })}` : `${validate_component(Card_title, "Card.Title").$$render(
                $$result,
                {
                  class: "text-2xl font-bold mb-2 flex items-center"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(Circle_check_big, "CheckCircle").$$render($$result, { class: "mr-2 text-amstram-purple" }, {}, {})} ${escape(contenu2[lang].titleVerified)}`;
                  }
                }
              )}`}</div>`;
            }
          }
        )} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "p-6" }, {}, {
          default: () => {
            return `${!verified ? `${sms_sent ? `<div class="space-y-4"><p>SMS envoyé à ${escape(telephone)}</p> <input type="text" class="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amstram-purple"${add_attribute("placeholder", contenu2[lang].enterCode, 0)}${add_attribute("value", code, 0)}> <button class="w-full bg-amstram-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center">${validate_component(Shield, "Shield").$$render($$result, { class: "mr-2" }, {}, {})} ${escape(contenu2[lang].verifyCode)}</button> <a href="#" data-svelte-h="svelte-1gr8xki">Renvoyer le code</a></div>` : `<div class="space-y-4"><label for="telephone" class="block text-sm font-medium text-gray-700">${escape(contenu2[lang].phoneNumber)}</label> <div class="relative">${validate_component(Phone, "Phone").$$render(
              $$result,
              {
                class: "absolute top-3 left-3 text-gray-400"
              },
              {},
              {}
            )} <input id="telephone" type="text"${add_attribute("placeholder", contenu2[lang].phoneNumber, 0)} class="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amstram-purple" required pattern="^\\+.*" title="Le numéro de téléphone doit commencer par un +."${add_attribute("value", telephone, 0)}></div> <button class="w-full bg-amstram-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center">${validate_component(Shield, "Shield").$$render($$result, { class: "mr-2" }, {}, {})} ${escape(sms_sent ? contenu2[lang].sendCode : contenu2[lang].verifyNumber)}</button></div>`}` : `<div class="flex items-center justify-center space-x-2 text-amstram-purple">${validate_component(Circle_check_big, "CheckCircle").$$render($$result, { class: "w-8 h-8" }, {}, {})} <span class="text-lg font-semibold">${escape(telephone)}</span></div>`}`;
          }
        })}`;
      }
    }
  )}`;
});
const Separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "orientation", "decorative"]);
  let { class: className = void 0 } = $$props;
  let { orientation = "horizontal" } = $$props;
  let { decorative = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.decorative === void 0 && $$bindings.decorative && decorative !== void 0) $$bindings.decorative(decorative);
  return `${validate_component(Separator$1, "SeparatorPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn(
          "bg-border shrink-0",
          orientation === "horizontal" ? "h-[1px] w-full" : "min-h-full w-[1px]",
          className
        )
      },
      { orientation },
      { decorative },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const css$1 = {
  code: ".text-primary-600{color:rgb(79, 70, 229)}.hover\\:text-primary-700:hover{color:rgb(67, 56, 202)}.bg-primary-600{background-color:rgb(79, 70, 229)}.hover\\:bg-primary-700:hover{background-color:rgb(67, 56, 202)}.focus\\:ring-primary-500:focus{--tw-ring-color:rgb(99, 102, 241)}",
  map: `{"version":3,"file":"TravelContainer.svelte","sources":["TravelContainer.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount, createEventDispatcher } from \\"svelte\\";\\nimport { calculatePrice } from \\"$lib/appwrite\\";\\nimport * as Card from \\"$lib/components/ui/card/index.js\\";\\nimport { Separator } from \\"$lib/components/ui/separator\\";\\nimport { contenu } from \\"$lib/contenu\\";\\nimport AddressInput from \\"./AddressInput.svelte\\";\\nimport { Plus, User, Phone, Calendar, Clock, HelpCircle, MapPin, MapPinned } from \\"lucide-svelte\\";\\nimport { fade } from \\"svelte/transition\\";\\nimport Avalability from \\"./Avalability.svelte\\";\\nconst dispatch = createEventDispatcher();\\nlet depart_input;\\nexport let lang = \\"fr\\";\\nexport let isDepart = true;\\nlet comment;\\nexport let route;\\nexport let contact = [];\\nlet showNewContactForm = false;\\nlet selectedContact = null;\\nlet newContact = { name: \\"\\", telephone: \\"\\" };\\nlet collectionDate;\\nlet collectionTime;\\nlet completeDate;\\n$: completeDate = collectionDate + \\"T\\" + collectionTime;\\nexport let minDate = \\"\\";\\nexport function getComment() {\\n  return comment;\\n}\\nexport function getContact() {\\n  return selectedContact;\\n}\\nexport function getCompleteDate() {\\n  return completeDate;\\n}\\nexport function updateContact(contact2) {\\n  selectedContact = contact2;\\n}\\nexport function selectRoute(route2) {\\n  depart_input.selectLocation(route2, true);\\n}\\nonMount(async () => {\\n  const urlParams = new URLSearchParams(window.location.search);\\n  lang = urlParams.get(\\"lang\\") || \\"fr\\";\\n  depart_input.selectLocation(route, true);\\n  selectedContact = contact[0];\\n  if (minDate == \\"\\") {\\n    const tomorrow = /* @__PURE__ */ new Date();\\n    tomorrow.setDate(tomorrow.getDate() + 1);\\n    collectionDate = tomorrow.toISOString().split(\\"T\\")[0];\\n  }\\n  collectionDate = minDate;\\n  collectionTime = \\"09:00\\";\\n  completeDate = collectionDate + \\"T\\" + collectionTime;\\n});\\nfunction handleAddContact() {\\n  if (newContact.name && newContact.telephone) {\\n    dispatch(\\"contactUpdate\\", { contact: newContact });\\n    newContact = { name: \\"\\", telephone: \\"\\" };\\n    showNewContactForm = false;\\n  }\\n}\\n$: if (collectionDate < minDate) {\\n  collectionDate = minDate;\\n}\\nfunction validateCollectionDate() {\\n  if (collectionDate < minDate) {\\n    collectionDate = minDate;\\n  }\\n}\\n$: minDate, validateCollectionDate();\\n<\/script>\\n\\n<div class=\\"w-full\\">\\n    <Card.Root class=\\"w-full\\">\\n        <Card.Header>\\n            <div class=\\"flex items-center\\">\\n                <MapPinned class=\\"w-7 h-7 mr-2 text-amstram-purple\\" size={20} />\\n                <Card.Title class=\\"text-2xl font-semibold\\">{contenu[lang][isDepart ? \\"departLocation\\" : \\"arrivalLocation\\"]}</Card.Title>\\n            </div>\\n        </Card.Header>\\n        <Card.Content>\\n            <AddressInput bind:this={depart_input} bind:route={route} {lang} focus={true} placeholder={isDepart ? contenu[lang].departLocation : contenu[lang].arrivalLocation} on:value_set={(event) => { \\n                dispatch('value_set', event.detail ); \\n            }}/>\\n            \\n            <Separator class=\\"my-4\\" />\\n            \\n            <div class=\\"space-y-4\\">\\n                <label for=\\"contact\\" class=\\"block text-lg font-semibold flex items-center\\">\\n                    <User class=\\"mr-2 text-black\\" size={20} />\\n                    {contenu[lang].contact}\\n                </label>\\n\\n                <!-- Contact Selection -->\\n                {#if contact.length > 0}\\n                    <select \\n                        bind:value={selectedContact}\\n                        class=\\"w-full p-2 border rounded-md bg-white\\"\\n                    >\\n                        <option  value={null}>{contenu[lang].selectContact}</option>\\n                        {#each contact as c}\\n                            <option value={c}>{c.name} - {c.telephone}</option>\\n                        {/each}\\n                    </select>\\n                {/if}\\n\\n                <!-- Add New Contact Button -->\\n                <button\\n                    on:click={() => showNewContactForm = !showNewContactForm}\\n                    class=\\"flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700\\"\\n                >\\n                    <Plus size={16} />\\n                    {showNewContactForm ? contenu[lang].cancel : contenu[lang].addNewContact}\\n                </button>\\n\\n                <!-- New Contact Form -->\\n                {#if showNewContactForm}\\n                    <div class=\\"space-y-3\\" transition:fade>\\n                        <div class=\\"relative\\">\\n                            <User class=\\"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500\\" size={16} />\\n                            <input\\n                                type=\\"text\\"\\n                                placeholder=\\"Name\\"\\n                                bind:value={newContact.name}\\n                                class=\\"w-full pl-10 pr-4 py-2 border rounded-md\\"\\n                            />\\n                        </div>\\n                        <div class=\\"relative\\">\\n                            <Phone class=\\"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500\\" size={16} />\\n                            <input\\n                                type=\\"tel\\"\\n                                placeholder={contenu[lang].enterPhoneNumber}\\n                                bind:value={newContact.telephone}\\n                                class=\\"w-full pl-10 pr-4 py-2 border rounded-md\\"\\n                                on:input={e => {\\n                                    if (newContact.telephone.startsWith('0')) {\\n                                        newContact.telephone = '+33' + newContact.telephone.slice(1);\\n                                    }\\n                                }}\\n                            />\\n                        </div>\\n                        <button\\n                            on:click={handleAddContact}\\n                            class=\\"w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700\\"\\n                        >\\n                            {contenu[lang].addContact}\\n                        </button>\\n                    </div>\\n                {/if}\\n            </div>\\n\\n            {#if isDepart}\\n            <Separator class=\\"my-4\\" />\\n                <div class=\\"flex  gap-3 mb-2\\">\\n                  <Calendar class=\\"w-5 h-5 text-black\\" />\\n                  <h2 class=\\"text-lg font-semibold text-black\\">{contenu[lang].vehiculeAvailability}</h2>\\n                </div>\\n                <div class=\\"grid lg:grid-cols-2 gap-8\\">\\n                    <!-- Collection Section -->\\n                    <div class=\\"space-y-4\\">\\n                      <div class=\\"flex items-center gap-2\\">\\n                        <span class=\\"text-sm font-medium text-gray-700\\">{isDepart ? contenu[lang].collectionNoEarlierThan : contenu[lang].deliveryUntil}</span>\\n                        <button \\n                          class=\\"text-gray-400 hover:text-gray-600\\"\\n                          on:click={() => alert(isDepart ? contenu[lang].collectionNoEarlierThanHelp : contenu[lang].deliveryUntilHelp)}\\n                        >\\n                          <HelpCircle class=\\"w-4 h-4\\" />\\n                        </button>\\n                      </div>\\n                      \\n                      <div class=\\"flex flex-col sm:flex-row gap-4\\">\\n                        <div class=\\"relative flex-1\\">\\n                          <div class=\\"relative flex items-center\\">\\n                            <input\\n                              type=\\"date\\"\\n                              min={minDate}\\n                              bind:value={collectionDate}\\n                              class=\\"w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm\\"\\n                             \\n                            />\\n                          </div>\\n                        </div>\\n                        <div class=\\"relative w-full sm:w-40\\">\\n                          <div class=\\"relative flex items-center\\">\\n                             <input\\n                              type=\\"time\\"\\n                              bind:value={collectionTime}\\n                              class=\\"w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm\\"\\n                            />\\n                          </div>\\n                        </div>\\n                      </div>\\n                    </div>\\n                </div>\\n                {/if}\\n            <Separator class=\\"my-4\\" />\\n            <label for=\\"comment\\" class=\\"block text-sm font-medium\\">\\n                {contenu[lang].comment}\\n            </label>\\n            <br>\\n            <textarea\\n                class=\\"w-full h-24 mt-1 border rounded-md p-2 resize-none focus:ring-2 focus:ring-primary-500\\"\\n                bind:value={comment}\\n                maxlength={510}\\n            />\\n        </Card.Content>\\n    </Card.Root>\\n</div>\\n\\n<style>\\n    :global(.text-primary-600) {\\n        color: rgb(79, 70, 229);\\n    }\\n    :global(.hover\\\\:text-primary-700:hover) {\\n        color: rgb(67, 56, 202);\\n    }\\n    :global(.bg-primary-600) {\\n        background-color: rgb(79, 70, 229);\\n    }\\n    :global(.hover\\\\:bg-primary-700:hover) {\\n        background-color: rgb(67, 56, 202);\\n    }\\n    :global(.focus\\\\:ring-primary-500:focus) {\\n        --tw-ring-color: rgb(99, 102, 241);\\n    }\\n</style>\\n"],"names":[],"mappings":"AAiNY,iBAAmB,CACvB,KAAK,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAC1B,CACQ,8BAAgC,CACpC,KAAK,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAC1B,CACQ,eAAiB,CACrB,gBAAgB,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CACrC,CACQ,4BAA8B,CAClC,gBAAgB,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CACrC,CACQ,8BAAgC,CACpC,eAAe,CAAE,iBACrB"}`
};
const TravelContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let depart_input;
  let { lang = "fr" } = $$props;
  let { isDepart = true } = $$props;
  let comment;
  let { route } = $$props;
  let { contact = [] } = $$props;
  let selectedContact = null;
  let collectionDate;
  let collectionTime;
  let completeDate;
  let { minDate = "" } = $$props;
  function getComment() {
    return comment;
  }
  function getContact() {
    return selectedContact;
  }
  function getCompleteDate() {
    return completeDate;
  }
  function updateContact(contact2) {
    selectedContact = contact2;
  }
  function selectRoute(route2) {
    depart_input.selectLocation(route2, true);
  }
  function validateCollectionDate() {
    if (collectionDate < minDate) {
      collectionDate = minDate;
    }
  }
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0) $$bindings.lang(lang);
  if ($$props.isDepart === void 0 && $$bindings.isDepart && isDepart !== void 0) $$bindings.isDepart(isDepart);
  if ($$props.route === void 0 && $$bindings.route && route !== void 0) $$bindings.route(route);
  if ($$props.contact === void 0 && $$bindings.contact && contact !== void 0) $$bindings.contact(contact);
  if ($$props.minDate === void 0 && $$bindings.minDate && minDate !== void 0) $$bindings.minDate(minDate);
  if ($$props.getComment === void 0 && $$bindings.getComment && getComment !== void 0) $$bindings.getComment(getComment);
  if ($$props.getContact === void 0 && $$bindings.getContact && getContact !== void 0) $$bindings.getContact(getContact);
  if ($$props.getCompleteDate === void 0 && $$bindings.getCompleteDate && getCompleteDate !== void 0) $$bindings.getCompleteDate(getCompleteDate);
  if ($$props.updateContact === void 0 && $$bindings.updateContact && updateContact !== void 0) $$bindings.updateContact(updateContact);
  if ($$props.selectRoute === void 0 && $$bindings.selectRoute && selectRoute !== void 0) $$bindings.selectRoute(selectRoute);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (collectionDate < minDate) {
        collectionDate = minDate;
      }
    }
    completeDate = collectionDate + "T" + collectionTime;
    {
      validateCollectionDate();
    }
    $$rendered = `<div class="w-full">${validate_component(Card, "Card.Root").$$render($$result, { class: "w-full" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="flex items-center">${validate_component(Map_pinned, "MapPinned").$$render(
              $$result,
              {
                class: "w-7 h-7 mr-2 text-amstram-purple",
                size: 20
              },
              {},
              {}
            )} ${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-2xl font-semibold" }, {}, {
              default: () => {
                return `${escape(contenu[lang][isDepart ? "departLocation" : "arrivalLocation"])}`;
              }
            })}</div>`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(AddressInput, "AddressInput").$$render(
              $$result,
              {
                lang,
                focus: true,
                placeholder: isDepart ? contenu[lang].departLocation : contenu[lang].arrivalLocation,
                this: depart_input,
                route
              },
              {
                this: ($$value) => {
                  depart_input = $$value;
                  $$settled = false;
                },
                route: ($$value) => {
                  route = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Separator, "Separator").$$render($$result, { class: "my-4" }, {}, {})} <div class="space-y-4"><label for="contact" class="block text-lg font-semibold flex items-center">${validate_component(User, "User").$$render($$result, { class: "mr-2 text-black", size: 20 }, {}, {})} ${escape(contenu[lang].contact)}</label>  ${contact.length > 0 ? `<select class="w-full p-2 border rounded-md bg-white"><option${add_attribute("value", null, 0)}>${escape(contenu[lang].selectContact)}</option>${each(contact, (c) => {
              return `<option${add_attribute("value", c, 0)}>${escape(c.name)} - ${escape(c.telephone)}</option>`;
            })}</select>` : ``}  <button class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700">${validate_component(Plus, "Plus").$$render($$result, { size: 16 }, {}, {})} ${escape(contenu[lang].addNewContact)}</button>  ${``}</div> ${isDepart ? `${validate_component(Separator, "Separator").$$render($$result, { class: "my-4" }, {}, {})} <div class="flex gap-3 mb-2">${validate_component(Calendar, "Calendar").$$render($$result, { class: "w-5 h-5 text-black" }, {}, {})} <h2 class="text-lg font-semibold text-black">${escape(contenu[lang].vehiculeAvailability)}</h2></div> <div class="grid lg:grid-cols-2 gap-8"> <div class="space-y-4"><div class="flex items-center gap-2"><span class="text-sm font-medium text-gray-700">${escape(isDepart ? contenu[lang].collectionNoEarlierThan : contenu[lang].deliveryUntil)}</span> <button class="text-gray-400 hover:text-gray-600">${validate_component(Circle_help, "HelpCircle").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></div> <div class="flex flex-col sm:flex-row gap-4"><div class="relative flex-1"><div class="relative flex items-center"><input type="date"${add_attribute("min", minDate, 0)} class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm"${add_attribute("value", collectionDate, 0)}></div></div> <div class="relative w-full sm:w-40"><div class="relative flex items-center"><input type="time" class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm"${add_attribute("value", collectionTime, 0)}></div></div></div></div></div>` : ``} ${validate_component(Separator, "Separator").$$render($$result, { class: "my-4" }, {}, {})} <label for="comment" class="block text-sm font-medium">${escape(contenu[lang].comment)}</label> <br> <textarea class="w-full h-24 mt-1 border rounded-md p-2 resize-none focus:ring-2 focus:ring-primary-500"${add_attribute("maxlength", 510, 0)}>${escape("")}</textarea>`;
          }
        })}`;
      }
    })} </div>`;
  } while (!$$settled);
  return $$rendered;
});
const Vehicule = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const dispatch = createEventDispatcher();
  let { vehicleType = "" } = $$props;
  let { makeModel = "" } = $$props;
  let { numberPlate = "" } = $$props;
  let { seatingCapacity = "" } = $$props;
  let { gearbox = "" } = $$props;
  let { comments = "" } = $$props;
  let { lang = "fr" } = $$props;
  const vehicleTypes = contenu[lang].vehicleTypes;
  const capacities = ["2", "4", "5", "7", "8", "9"];
  const gearboxTypes = ["Manual", "Automatic", "Semi-automatic", "CVT"];
  function getVehicleInfo() {
    return {
      "vType": vehicleType,
      "vMark": makeModel,
      "vImmatriculation": numberPlate,
      "vCap": seatingCapacity,
      "vBox": gearbox,
      "vComment": comments
    };
  }
  let valid = false;
  function isValid() {
    return vehicleType.length > 0 && makeModel.length > 0 && numberPlate.length > 0 && seatingCapacity.length > 0 && gearbox.length > 0;
  }
  if ($$props.vehicleType === void 0 && $$bindings.vehicleType && vehicleType !== void 0) $$bindings.vehicleType(vehicleType);
  if ($$props.makeModel === void 0 && $$bindings.makeModel && makeModel !== void 0) $$bindings.makeModel(makeModel);
  if ($$props.numberPlate === void 0 && $$bindings.numberPlate && numberPlate !== void 0) $$bindings.numberPlate(numberPlate);
  if ($$props.seatingCapacity === void 0 && $$bindings.seatingCapacity && seatingCapacity !== void 0) $$bindings.seatingCapacity(seatingCapacity);
  if ($$props.gearbox === void 0 && $$bindings.gearbox && gearbox !== void 0) $$bindings.gearbox(gearbox);
  if ($$props.comments === void 0 && $$bindings.comments && comments !== void 0) $$bindings.comments(comments);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0) $$bindings.lang(lang);
  if ($$props.getVehicleInfo === void 0 && $$bindings.getVehicleInfo && getVehicleInfo !== void 0) $$bindings.getVehicleInfo(getVehicleInfo);
  if ($$props.isValid === void 0 && $$bindings.isValid && isValid !== void 0) $$bindings.isValid(isValid);
  valid = vehicleType.length > 0 && makeModel.length > 0 && numberPlate.length > 0 && seatingCapacity.length > 0 && gearbox.length > 0;
  {
    if (valid) {
      dispatch("valid");
    } else {
      dispatch("invalid");
    }
  }
  return `<div class="bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto"><div class="flex items-center gap-2 mb-8">${validate_component(Car, "Car").$$render($$result, { class: "w-6 h-6 text-amstram-purple" }, {}, {})} <h2 class="text-xl font-medium text-gray-700">${escape(contenu[lang].vehicle)}</h2></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="space-y-2"><label for="vehicleType" class="block text-lg font-medium text-gray-600">${escape(contenu[lang].vehicleType)}</label> <select id="vehicleType" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"><option disabled selected value="">${escape(contenu[lang].vehicleType)}</option>${each(vehicleTypes, (type) => {
    return `<option${add_attribute("value", type, 0)}>${escape(type)}</option>`;
  })}</select></div>  <div class="space-y-2"><label for="makeModel" class="block text-lg font-medium text-gray-600">${escape(contenu[lang].makeAndModel)}</label> <div class="relative">${validate_component(Search, "Search").$$render(
    $$result,
    {
      class: "absolute left-3 top-3 w-5 h-5 text-gray-400"
    },
    {},
    {}
  )} <input id="makeModel" type="text" placeholder="Enter make and model..." class="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"${add_attribute("maxlength", 32, 0)}${add_attribute("value", makeModel, 0)}></div></div>  <div class="space-y-2"><label for="numberPlate" class="block text-lg font-medium text-gray-600">${escape(contenu[lang].numberPlate)}</label> <div class="relative">${validate_component(File_text, "FileText").$$render(
    $$result,
    {
      class: "absolute left-3 top-3 w-5 h-5 text-gray-400"
    },
    {},
    {}
  )} <input id="numberPlate" type="text" placeholder="AA-123-AA" class="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"${add_attribute("maxlength", 15, 0)}${add_attribute("value", numberPlate, 0)}></div></div>  <div class="space-y-2"><label for="seatingCapacity" class="block text-lg font-medium text-gray-600">${escape(contenu[lang].seatingCapacity)}</label> <div class="relative">${validate_component(Users, "Users").$$render(
    $$result,
    {
      class: "absolute left-3 top-3 w-5 h-5 text-gray-400"
    },
    {},
    {}
  )} <select id="seatingCapacity" class="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"><option disabled selected value="">${escape(contenu[lang].seatingCapacity)}</option>${each(capacities, (capacity) => {
    return `<option${add_attribute("value", capacity, 0)}>${escape(capacity)} seats</option>`;
  })}</select></div></div>  <div class="space-y-2"><label for="gearbox" class="block text-lg font-medium text-gray-600">${escape(contenu[lang].gearbox)}</label> <div class="relative">${validate_component(Cog, "Cog").$$render(
    $$result,
    {
      class: "absolute left-3 top-3 w-5 h-5 text-gray-400"
    },
    {},
    {}
  )} <select id="gearbox" class="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"><option disabled selected value="">${escape(contenu[lang].gearbox)}</option>${each(gearboxTypes, (type) => {
    return `<option${add_attribute("value", type, 0)}>${escape(type)}</option>`;
  })}</select></div></div></div>  <div class="mt-6 space-y-2"><label for="comments" class="block text-lg font-medium text-gray-600">${escape(contenu[lang].commentsDriver)}</label> <textarea id="comments" placeholder="Enter any additional comments..." class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] text-black"${add_attribute("maxlength", 510, 0)}>${escape(comments || "")}</textarea></div></div>`;
});
const ServiceRecap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formattedPrice;
  let { price = 0 } = $$props;
  let { selectedService = "" } = $$props;
  let { lang = "fr" } = $$props;
  const services = [
    {
      value: "car",
      label: contenu[lang].piloteExpress.title
    },
    {
      value: "truck",
      label: contenu[lang].coconRoulant.title
    }
  ];
  function getSelectedService() {
    return selectedService;
  }
  if ($$props.price === void 0 && $$bindings.price && price !== void 0) $$bindings.price(price);
  if ($$props.selectedService === void 0 && $$bindings.selectedService && selectedService !== void 0) $$bindings.selectedService(selectedService);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0) $$bindings.lang(lang);
  if ($$props.getSelectedService === void 0 && $$bindings.getSelectedService && getSelectedService !== void 0) $$bindings.getSelectedService(getSelectedService);
  formattedPrice = price.toFixed(2).replace(".", ",");
  return `<div class="bg-white w-full md:w-auto p-6 rounded-xl shadow-lg max-w-4xl mx-auto text-black"><div class="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8"><div class="w-full md:w-1/2"><h2 class="text-2xl font-semibold mb-2" data-svelte-h="svelte-1rifmi2">Select Your Service</h2> <div class="relative"><select class="appearance-none w-full bg-white border border-gray-300 text-black py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option value="" disabled selected data-svelte-h="svelte-hjpv2s">Choose a service</option>${each(services, (service) => {
    return `<option${add_attribute("value", service.value, 0)}>${escape(service.label)}</option>`;
  })}</select> <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">${validate_component(Chevron_down, "ChevronDown").$$render($$result, { size: 24 }, {}, {})}</div></div></div> <div class="w-full md:w-1/2 text-center md:text-right"><p class="text-xl mb-2" data-svelte-h="svelte-17v4sni">Total Price</p> <div class="flex items-center justify-center md:justify-end">${validate_component(Euro, "Euro").$$render(
    $$result,
    {
      size: 36,
      class: "mr-2 text-amstram-purple"
    },
    {},
    {}
  )} <span class="text-6xl font-bold">${escape(formattedPrice)}</span></div></div></div></div>`;
});
const css = {
  code: "body{margin:0;padding:0}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import PhoneVerification from \\"$lib/components/auth/PhoneVerification.svelte\\";\\nimport AuthComponant from \\"$lib/components/auth/AuthComponant.svelte\\";\\nimport TravelContainer from \\"$lib/components/TravelContainer.svelte\\";\\nimport Vehicule from \\"$lib/components/Vehicule.svelte\\";\\nimport { getUser } from \\"$lib/appwrite\\";\\nimport { onMount } from \\"svelte\\";\\nimport { Check } from \\"lucide-svelte\\";\\nimport ServiceRecap from \\"$lib/components/ServiceRecap.svelte\\";\\nimport { calculatePrice, addRoute } from \\"$lib/appwrite\\";\\nimport Header from \\"$lib/components/Header.svelte\\";\\nimport { goto } from \\"$app/navigation\\";\\nlet depart;\\nlet arrival;\\nlet vehicleComponent;\\nlet depart_route = \\"\\";\\nlet arrival_route = \\"\\";\\nlet lang = \\"fr\\";\\nlet service = \\"\\";\\nlet selectedTypeofVehicle = \\"\\";\\nlet price = 0;\\nlet contact = [];\\nlet tomorrow = /* @__PURE__ */ new Date();\\ntomorrow.setDate(tomorrow.getDate() + 1);\\nlet minDateDepart = tomorrow.toISOString().split(\\"T\\")[0];\\ntomorrow.setDate(tomorrow.getDate() + 3);\\nlet minDateArival = tomorrow.toISOString().split(\\"T\\")[0];\\nlet valid = false;\\nlet verified = false;\\nlet dataPrice;\\nlet user;\\nonMount(async () => {\\n  user = await getUser();\\n  const urlParams = new URLSearchParams(window.location.search);\\n  depart_route = urlParams.get(\\"r1\\") || \\"\\";\\n  arrival_route = urlParams.get(\\"r2\\") || \\"\\";\\n  lang = urlParams.get(\\"lang\\") || \\"fr\\";\\n  service = urlParams.get(\\"service\\") || \\"\\";\\n  selectedTypeofVehicle = urlParams.get(\\"selected\\") || \\"\\";\\n  if (user) {\\n    let contact_user = {\\n      name: user.name,\\n      telephone: user.phone\\n    };\\n    contact.push(contact_user);\\n    depart.updateContact(contact_user);\\n    arrival.updateContact(contact_user);\\n  }\\n  contact = [...contact];\\n  dataPrice = await calculatePrice(depart_route, arrival_route);\\n  price = dataPrice ? dataPrice[service] && dataPrice[service][\\"price\\"] ? dataPrice[service][\\"price\\"] : 0 : 0;\\n});\\n$: price = dataPrice ? dataPrice[service] && dataPrice[service][\\"price\\"] ? dataPrice[service][\\"price\\"] : 0 : 0;\\nfunction contactUpdate(event) {\\n  contact.push(event.detail.contact);\\n  contact = [...contact];\\n}\\nfunction collectionDateUpdate(event) {\\n  tomorrow = new Date(event.detail.collectionDate);\\n  tomorrow.setDate(tomorrow.getDate() + 4);\\n  minDateArival = tomorrow.toISOString().split(\\"T\\")[0];\\n}\\nasync function handleSubmit() {\\n  if (!valid || !verified) return;\\n  let completeDate = new Date(depart.getCompleteDate());\\n  let vehicleInfo = vehicleComponent.getVehicleInfo();\\n  console.log(vehicleInfo);\\n  let departContact = depart.getContact();\\n  let arrivalContact = arrival.getContact();\\n  let departContactFull = departContact ? departContact.name + \\" - \\" + departContact.telephone : \\"\\";\\n  let arrivalContactFull = arrivalContact ? arrivalContact.name + \\" - \\" + arrivalContact.telephone : \\"\\";\\n  let ownerContact = user.name + \\" - \\" + user.phone;\\n  departContactFull = departContactFull == ownerContact ? \\"owner\\" : departContactFull;\\n  arrivalContactFull = arrivalContactFull == ownerContact ? \\"owner\\" : arrivalContactFull;\\n  let route = {\\n    owner: user.$id,\\n    depart: depart_route,\\n    ownerContact,\\n    arrival: arrival_route,\\n    disponibility: completeDate,\\n    vType: vehicleInfo.vType,\\n    vMark: vehicleInfo.vMark,\\n    vImmatriculation: vehicleInfo.vImmatriculation,\\n    vCap: vehicleInfo.vCap,\\n    vBox: vehicleInfo.vBox,\\n    departComment: depart.getComment(),\\n    arrivalComment: arrival.getComment(),\\n    departContact: departContactFull,\\n    arrivalContact: arrivalContactFull,\\n    price: price.toString(),\\n    service,\\n    status: 0\\n  };\\n  console.log(route);\\n  try {\\n    const res = await addRoute(route);\\n    goto(\`/route/\${res.$id}\`);\\n  } catch (error) {\\n    console.error(error);\\n  }\\n}\\n<\/script>\\n\\n<div class=\\"min-h-screen py-4 px-2 sm:px-4\\">\\n    <div class=\\" h-24\\">\\n        <Header bind:lang  last_service={service} last_price={price} />\\n    </div>\\n    <br/>\\n    <div class=\\"max-w-fit\\">\\n        <!-- Top Section with reduced spacing -->\\n        <div class=\\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4\\">\\n            <!-- Service Recap Section -->\\n             <div class=\\"bg-gradient-to-br from-amstram-black/50 to-white/30 rounded-lg shadow-sm p-3 flex items-center justify-center\\">\\n                <ServiceRecap {lang} bind:selectedService={service} price={price} />\\n            </div>\\n            \\n            <!-- Phone Verification Section -->\\n            <div class=\\"bg-gradient-to-br from-amstram-black/50 to-white/30 rounded-lg shadow-sm p-3 flex items-center justify-center\\">\\n                <PhoneVerification \\n                    {lang}\\n                    bind:verified\\n                    on:phone_verified={(event) => {\\n                        contact[0].telephone = event.detail.phone;\\n                    }} \\n                />\\n            </div>\\n        </div>\\n\\n        <!-- Rest of the form with reduced spacing -->\\n        <div class=\\"grid grid-cols-1 lg:grid-cols-3 gap-4\\">\\n            <!-- Travel Containers -->\\n            <div class=\\"bg-white rounded-lg shadow-sm p-3 h-full  \\">\\n                <TravelContainer\\n                    minDate={minDateDepart}\\n                    on:collectionDateUpdate={collectionDateUpdate}\\n                    {lang}\\n                    isDepart={true}\\n                    bind:route={depart_route}\\n                    bind:this={depart}\\n                    {contact}\\n                    on:contactUpdate={contactUpdate}\\n                    on:value_set={async (event) =>   {\\n                        if (event.detail) dataPrice = await calculatePrice(depart_route, arrival_route);\\n                    }}\\n                />\\n            </div>\\n            <div class=\\"bg-white rounded-lg shadow-sm p-3 h-full  \\">\\n                <TravelContainer\\n                    minDate={minDateArival}\\n                    {lang}\\n                    isDepart={false}\\n                    bind:route={arrival_route}\\n                    bind:this={arrival}\\n                    {contact}\\n                    on:contactUpdate={contactUpdate}\\n                    on:value_set={async (event) =>    {\\n                        if (event.detail) dataPrice = await calculatePrice(depart_route, arrival_route);\\n                    }}\\n                />\\n            </div>\\n\\n            <!-- Vehicle Section -->\\n            <div class=\\"bg-white rounded-lg shadow-sm p-3 h-full  \\">\\n                <Vehicule bind:this={vehicleComponent} on:valid={() => {valid = true;}} on:invalid={() => {valid = false;}} {lang} bind:vehicleType={selectedTypeofVehicle}/>\\n            </div>\\n        </div>\\n\\n        <!-- Validate Button -->\\n        <div class=\\"mt-6 flex justify-center\\">\\n            <button\\n                on:click={handleSubmit}\\n                class=\\"flex items-center justify-center gap-2 {valid && verified ? 'bg-amstram-purple hover:bg-purple-700' : 'bg-gray-400'} text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-colors duration-200 text-lg w-full max-w-md\\"\\n            >\\n                <Check class=\\"w-5 h-5\\" />\\n                Valider\\n            </button>\\n        </div>\\n    </div>\\n</div>\\n\\n<style>\\n    :global(body) {\\n        margin: 0;\\n        padding: 0;\\n    }\\n</style>\\n\\n"],"names":[],"mappings":"AAoLY,IAAM,CACV,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CACb"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let depart;
  let arrival;
  let vehicleComponent;
  let depart_route = "";
  let arrival_route = "";
  let lang = "fr";
  let service = "";
  let selectedTypeofVehicle = "";
  let price = 0;
  let contact = [];
  let tomorrow = /* @__PURE__ */ new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let minDateDepart = tomorrow.toISOString().split("T")[0];
  tomorrow.setDate(tomorrow.getDate() + 3);
  let minDateArival = tomorrow.toISOString().split("T")[0];
  let verified = false;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    price = 0;
    $$rendered = `<div class="min-h-screen py-4 px-2 sm:px-4"><div class="h-24">${validate_component(Header, "Header").$$render(
      $$result,
      {
        last_service: service,
        last_price: price,
        lang
      },
      {
        lang: ($$value) => {
          lang = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <br> <div class="max-w-fit"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"> <div class="bg-gradient-to-br from-amstram-black/50 to-white/30 rounded-lg shadow-sm p-3 flex items-center justify-center">${validate_component(ServiceRecap, "ServiceRecap").$$render(
      $$result,
      { lang, price, selectedService: service },
      {
        selectedService: ($$value) => {
          service = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div class="bg-gradient-to-br from-amstram-black/50 to-white/30 rounded-lg shadow-sm p-3 flex items-center justify-center">${validate_component(PhoneVerification, "PhoneVerification").$$render(
      $$result,
      { lang, verified },
      {
        verified: ($$value) => {
          verified = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4"> <div class="bg-white rounded-lg shadow-sm p-3 h-full ">${validate_component(TravelContainer, "TravelContainer").$$render(
      $$result,
      {
        minDate: minDateDepart,
        lang,
        isDepart: true,
        contact,
        route: depart_route,
        this: depart
      },
      {
        route: ($$value) => {
          depart_route = $$value;
          $$settled = false;
        },
        this: ($$value) => {
          depart = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="bg-white rounded-lg shadow-sm p-3 h-full ">${validate_component(TravelContainer, "TravelContainer").$$render(
      $$result,
      {
        minDate: minDateArival,
        lang,
        isDepart: false,
        contact,
        route: arrival_route,
        this: arrival
      },
      {
        route: ($$value) => {
          arrival_route = $$value;
          $$settled = false;
        },
        this: ($$value) => {
          arrival = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div class="bg-white rounded-lg shadow-sm p-3 h-full ">${validate_component(Vehicule, "Vehicule").$$render(
      $$result,
      {
        lang,
        this: vehicleComponent,
        vehicleType: selectedTypeofVehicle
      },
      {
        this: ($$value) => {
          vehicleComponent = $$value;
          $$settled = false;
        },
        vehicleType: ($$value) => {
          selectedTypeofVehicle = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>  <div class="mt-6 flex justify-center"><button class="${"flex items-center justify-center gap-2 " + escape(
      "bg-gray-400",
      true
    ) + " text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-colors duration-200 text-lg w-full max-w-md"}">${validate_component(Check, "Check").$$render($$result, { class: "w-5 h-5" }, {}, {})}
                Valider</button></div></div> </div>`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DBZPiOlw.js.map
