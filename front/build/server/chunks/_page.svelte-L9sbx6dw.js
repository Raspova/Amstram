import { c as create_ssr_component, v as validate_component, d as createEventDispatcher, e as escape, b as add_attribute, f as each, g as compute_rest_props, h as spread, i as escape_attribute_value, j as escape_object, a as subscribe, k as get_store_value } from './ssr-CbbsIBsB.js';
import { C as Card, a as Card_header, b as Card_title, c as Card_content, d as contenu, A as AddressInput, I as Icon, e as cn } from './AddressInput-Cz3gct4c.js';
import './appwrite-CTkzZmTY.js';
import { d as derived, r as readable, w as writable } from './index2-CQFslAWv.js';
import 'appwrite';

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
const PhoneVerification = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { sms_sent = false } = $$props;
  let code = "";
  let telephone = "";
  let { lang = "fr" } = $$props;
  let verified = false;
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
  if ($$props.get_verified === void 0 && $$bindings.get_verified && get_verified !== void 0) $$bindings.get_verified(get_verified);
  return `${validate_component(Card, "Card.Root").$$render(
    $$result,
    {
      class: "w-auto sm:w-full  max-w-md bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
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
              return `<div class="flex flex-col items-center justify-center">${`${validate_component(Card_title, "Card.Title").$$render(
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
              })}`}</div>`;
            }
          }
        )} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "p-6" }, {}, {
          default: () => {
            return `${`${sms_sent ? `<div class="space-y-4"><input type="text" class="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amstram-purple"${add_attribute("placeholder", contenu2[lang].enterCode, 0)}${add_attribute("value", code, 0)}> <button class="w-full bg-amstram-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center">${validate_component(Shield, "Shield").$$render($$result, { class: "mr-2" }, {}, {})} ${escape(contenu2[lang].verifyCode)}</button></div>` : `<div class="space-y-4"><label for="telephone" class="block text-sm font-medium text-gray-700">${escape(contenu2[lang].phoneNumber)}</label> <div class="relative">${validate_component(Phone, "Phone").$$render(
              $$result,
              {
                class: "absolute top-3 left-3 text-gray-400"
              },
              {},
              {}
            )} <input id="telephone" type="text"${add_attribute("placeholder", contenu2[lang].phoneNumber, 0)} class="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amstram-purple" required pattern="^\\+.*" title="Le numéro de téléphone doit commencer par un +."${add_attribute("value", telephone, 0)}></div> <button class="w-full bg-amstram-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center">${validate_component(Shield, "Shield").$$render($$result, { class: "mr-2" }, {}, {})} ${escape(sms_sent ? contenu2[lang].sendCode : contenu2[lang].verifyNumber)}</button></div>`}`}`;
          }
        })}`;
      }
    }
  )}`;
});
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
({
  type: "hidden",
  "aria-hidden": true,
  hidden: true,
  tabIndex: -1,
  style: styleToString({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function lightable(value) {
  function subscribe2(run) {
    run(value);
    return () => {
    };
  }
  return { subscribe: subscribe2 };
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
makeElement("empty");
function makeElement(name, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction({
              ...result(...args2),
              [`data-melt-${name}`]: "",
              action: action ?? noop
            });
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction({
          ...result,
          [`data-melt-${name}`]: "",
          action: action ?? noop
        });
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction({
            ...result(...args2),
            [`data-melt-${name}`]: "",
            action: action ?? noop
          });
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction({
        ...result,
        [`data-melt-${name}`]: "",
        action: action ?? noop
      }));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function noop() {
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function withGet(store) {
  return {
    ...store,
    get: () => get_store_value(store)
  };
}
withGet.writable = function(initial) {
  const internal = writable(initial);
  let value = initial;
  return {
    subscribe: internal.subscribe,
    set(newValue) {
      internal.set(newValue);
      value = newValue;
    },
    update(updater) {
      const newValue = updater(value);
      internal.set(newValue);
      value = newValue;
    },
    get() {
      return value;
    }
  };
};
withGet.derived = function(stores, fn) {
  const subscribers = /* @__PURE__ */ new Map();
  const get = () => {
    const values = Array.isArray(stores) ? stores.map((store) => store.get()) : stores.get();
    return fn(values);
  };
  const subscribe2 = (subscriber) => {
    const unsubscribers = [];
    const storesArr = Array.isArray(stores) ? stores : [stores];
    storesArr.forEach((store) => {
      unsubscribers.push(store.subscribe(() => {
        subscriber(get());
      }));
    });
    subscriber(get());
    subscribers.set(subscriber, unsubscribers);
    return () => {
      const unsubscribers2 = subscribers.get(subscriber);
      if (unsubscribers2) {
        for (const unsubscribe of unsubscribers2) {
          unsubscribe();
        }
      }
      subscribers.delete(subscriber);
    };
  };
  return {
    get,
    subscribe: subscribe2
  };
};
const kbd = {
  ALT: "Alt",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  CAPS_LOCK: "CapsLock",
  CONTROL: "Control",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  F1: "F1",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  HOME: "Home",
  META: "Meta",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SHIFT: "Shift",
  SPACE: " ",
  TAB: "Tab",
  CTRL: "Control",
  ASTERISK: "*",
  A: "a",
  P: "p"
};
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
readable(void 0, (set) => {
  function clicked(event) {
    set(event);
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "pointerup", clicked, {
    passive: false,
    capture: true
  });
  return unsubscribe;
});
readable(void 0, (set) => {
  function keydown(event) {
    if (event && event.key === kbd.ESCAPE) {
      set(event);
    }
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "keydown", keydown, {
    passive: false
  });
  return unsubscribe;
});
({
  prefix: "",
  disabled: readable(false),
  required: readable(false),
  name: readable(void 0)
});
const defaults$1 = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
({
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  positioning: {
    placement: "bottom"
  },
  closeOnEscape: true,
  closeOnOutsideClick: true,
  onOutsideClick: void 0,
  preventScroll: false,
  forceVisible: false,
  locale: "en",
  granularity: void 0,
  disabled: false,
  readonly: false,
  minValue: void 0,
  maxValue: void 0,
  weekdayFormat: "narrow",
  ...omit(defaults$1, "isDateDisabled", "isDateUnavailable", "value", "locale", "disabled", "readonly", "minValue", "maxValue", "weekdayFormat")
});
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
const css = {
  code: ".text-primary-600{color:rgb(79, 70, 229)}.hover\\:text-primary-700:hover{color:rgb(67, 56, 202)}.bg-primary-600{background-color:rgb(79, 70, 229)}.hover\\:bg-primary-700:hover{background-color:rgb(67, 56, 202)}.focus\\:ring-primary-500:focus{--tw-ring-color:rgb(99, 102, 241)}",
  map: `{"version":3,"file":"TravelContainer.svelte","sources":["TravelContainer.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount, createEventDispatcher } from \\"svelte\\";\\nimport { calculatePrice } from \\"$lib/appwrite\\";\\nimport * as Card from \\"$lib/components/ui/card/index.js\\";\\nimport { Separator } from \\"$lib/components/ui/separator\\";\\nimport { contenu } from \\"$lib/contenu\\";\\nimport AddressInput from \\"./AddressInput.svelte\\";\\nimport { Plus, User, Phone, Calendar, Clock, HelpCircle, MapPin, MapPinned } from \\"lucide-svelte\\";\\nimport { fade } from \\"svelte/transition\\";\\nconst dispatch = createEventDispatcher();\\nlet depart_input;\\nexport let lang = \\"fr\\";\\nexport let isDepart = true;\\nlet comment;\\nexport let route;\\nexport let contact = [];\\nlet showNewContactForm = false;\\nlet selectedContact = null;\\nlet newContact = { name: \\"\\", telephone: \\"\\" };\\nlet collectionDate;\\nlet collectionTime;\\nexport let minDate = \\"\\";\\nexport function updateContact(contact2) {\\n  selectedContact = contact2;\\n}\\nexport function selectRoute(route2) {\\n  depart_input.selectLocation(route2, true);\\n}\\nonMount(async () => {\\n  const urlParams = new URLSearchParams(window.location.search);\\n  lang = urlParams.get(\\"lang\\") || \\"fr\\";\\n  depart_input.selectLocation(route, true);\\n  selectedContact = contact[0];\\n  if (minDate == \\"\\") {\\n    const tomorrow = /* @__PURE__ */ new Date();\\n    tomorrow.setDate(tomorrow.getDate() + 1);\\n    collectionDate = tomorrow.toISOString().split(\\"T\\")[0];\\n  }\\n  collectionDate = minDate;\\n  collectionTime = \\"09:00\\";\\n});\\nfunction handleAddContact() {\\n  if (newContact.name && newContact.telephone) {\\n    dispatch(\\"contactUpdate\\", { contact: newContact });\\n    newContact = { name: \\"\\", telephone: \\"\\" };\\n    showNewContactForm = false;\\n  }\\n}\\n$: if (collectionDate < minDate) {\\n  collectionDate = minDate;\\n}\\nfunction validateCollectionDate() {\\n  if (collectionDate < minDate) {\\n    collectionDate = minDate;\\n  }\\n}\\n$: minDate, validateCollectionDate();\\n<\/script>\\n\\n<div class=\\"w-full max-w-md md:max-w-xl \\">\\n    <Card.Root class=\\"w-full\\">\\n        <Card.Header>\\n            <div class=\\"flex items-center\\">\\n                <MapPinned class=\\"w-7 h-7 mr-2 text-amstram-purple\\" size={20} />\\n                <Card.Title class=\\"text-2xl font-semibold\\">{contenu[lang][isDepart ? \\"departLocation\\" : \\"arrivalLocation\\"]}</Card.Title>\\n            </div>\\n        </Card.Header>\\n        <Card.Content>\\n            <AddressInput bind:this={depart_input} {lang} focus={true}/>\\n            \\n            <Separator class=\\"my-4\\" />\\n            \\n            <div class=\\"space-y-4\\">\\n                <label for=\\"contact\\" class=\\"block text-lg font-semibold flex items-center\\">\\n                    <User class=\\"mr-2 text-black\\" size={20} />\\n                    {contenu[lang].contact}\\n                </label>\\n\\n                <!-- Contact Selection -->\\n                {#if contact.length > 0}\\n                    <select \\n                        bind:value={selectedContact}\\n                        class=\\"w-full p-2 border rounded-md bg-white\\"\\n                    >\\n                        <option value={null}>{contenu[lang].selectContact}</option>\\n                        {#each contact as c}\\n                            <option value={c}>{c.name} - {c.telephone}</option>\\n                        {/each}\\n                    </select>\\n                {/if}\\n\\n                <!-- Add New Contact Button -->\\n                <button\\n                    on:click={() => showNewContactForm = !showNewContactForm}\\n                    class=\\"flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700\\"\\n                >\\n                    <Plus size={16} />\\n                    {showNewContactForm ? contenu[lang].cancel : contenu[lang].addNewContact}\\n                </button>\\n\\n                <!-- New Contact Form -->\\n                {#if showNewContactForm}\\n                    <div class=\\"space-y-3\\" transition:fade>\\n                        <div class=\\"relative\\">\\n                            <User class=\\"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500\\" size={16} />\\n                            <input\\n                                type=\\"text\\"\\n                                placeholder=\\"Name\\"\\n                                bind:value={newContact.name}\\n                                class=\\"w-full pl-10 pr-4 py-2 border rounded-md\\"\\n                            />\\n                        </div>\\n                        <div class=\\"relative\\">\\n                            <Phone class=\\"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500\\" size={16} />\\n                            <input\\n                                type=\\"tel\\"\\n                                placeholder={contenu[lang].enterPhoneNumber}\\n                                bind:value={newContact.telephone}\\n                                class=\\"w-full pl-10 pr-4 py-2 border rounded-md\\"\\n                                on:input={e => {\\n                                    if (newContact.telephone.startsWith('0')) {\\n                                        newContact.telephone = '+33' + newContact.telephone.slice(1);\\n                                    }\\n                                }}\\n                            />\\n                        </div>\\n                        <button\\n                            on:click={handleAddContact}\\n                            class=\\"w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700\\"\\n                        >\\n                            {contenu[lang].addContact}\\n                        </button>\\n                    </div>\\n                {/if}\\n            </div>\\n\\n            {#if isDepart}\\n            <Separator class=\\"my-4\\" />\\n                <div class=\\"flex  gap-3 mb-2\\">\\n                  <Calendar class=\\"w-5 h-5 text-black\\" />\\n                  <h2 class=\\"text-lg font-semibold text-black\\">{contenu[lang].vehiculeAvailability}</h2>\\n                </div>\\n                <div class=\\"grid lg:grid-cols-2 gap-8\\">\\n                    <!-- Collection Section -->\\n                    <div class=\\"space-y-4\\">\\n                      <div class=\\"flex items-center gap-2\\">\\n                        <span class=\\"text-sm font-medium text-gray-700\\">{isDepart ? contenu[lang].collectionNoEarlierThan : contenu[lang].deliveryUntil}</span>\\n                        <button \\n                          class=\\"text-gray-400 hover:text-gray-600\\"\\n                          on:click={() => alert(isDepart ? contenu[lang].collectionNoEarlierThanHelp : contenu[lang].deliveryUntilHelp)}\\n                        >\\n                          <HelpCircle class=\\"w-4 h-4\\" />\\n                        </button>\\n                      </div>\\n                      \\n                      <div class=\\"flex flex-col sm:flex-row gap-4\\">\\n                        <div class=\\"relative flex-1\\">\\n                          <div class=\\"relative flex items-center\\">\\n                            <input\\n                              type=\\"date\\"\\n                              min={minDate}\\n                              bind:value={collectionDate}\\n                              class=\\"w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm\\"\\n                              on:change={(e) => {\\n                                dispatch('collectionDateUpdate', { collectionDate: collectionDate })\\n                              }}\\n                            />\\n                          </div>\\n                        </div>\\n                        <div class=\\"relative w-full sm:w-40\\">\\n                          <div class=\\"relative flex items-center\\">\\n                             <input\\n                              type=\\"time\\"\\n                              bind:value={collectionTime}\\n                              class=\\"w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm\\"\\n                            />\\n                          </div>\\n                        </div>\\n                      </div>\\n                    </div>\\n                </div>\\n                {/if}\\n            <Separator class=\\"my-4\\" />\\n            <label for=\\"comment\\" class=\\"block text-sm font-medium\\">\\n                {contenu[lang].comment}\\n            </label>\\n            <br>\\n            <textarea\\n                class=\\"w-full h-24 mt-1 border rounded-md p-2 resize-none focus:ring-2 focus:ring-primary-500\\"\\n                bind:value={comment}\\n            />\\n        </Card.Content>\\n    </Card.Root>\\n</div>\\n\\n<style>\\n    :global(.text-primary-600) {\\n        color: rgb(79, 70, 229);\\n    }\\n    :global(.hover\\\\:text-primary-700:hover) {\\n        color: rgb(67, 56, 202);\\n    }\\n    :global(.bg-primary-600) {\\n        background-color: rgb(79, 70, 229);\\n    }\\n    :global(.hover\\\\:bg-primary-700:hover) {\\n        background-color: rgb(67, 56, 202);\\n    }\\n    :global(.focus\\\\:ring-primary-500:focus) {\\n        --tw-ring-color: rgb(99, 102, 241);\\n    }\\n</style>\\n"],"names":[],"mappings":"AAmMY,iBAAmB,CACvB,KAAK,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAC1B,CACQ,8BAAgC,CACpC,KAAK,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAC1B,CACQ,eAAiB,CACrB,gBAAgB,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CACrC,CACQ,4BAA8B,CAClC,gBAAgB,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CACrC,CACQ,8BAAgC,CACpC,eAAe,CAAE,iBACrB"}`
};
const TravelContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let depart_input;
  let { lang = "fr" } = $$props;
  let { isDepart = true } = $$props;
  let { route } = $$props;
  let { contact = [] } = $$props;
  let collectionDate;
  let collectionTime;
  let { minDate = "" } = $$props;
  function updateContact(contact2) {
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
  if ($$props.updateContact === void 0 && $$bindings.updateContact && updateContact !== void 0) $$bindings.updateContact(updateContact);
  if ($$props.selectRoute === void 0 && $$bindings.selectRoute && selectRoute !== void 0) $$bindings.selectRoute(selectRoute);
  $$result.css.add(css);
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
    {
      validateCollectionDate();
    }
    $$rendered = `<div class="w-full max-w-md md:max-w-xl ">${validate_component(Card, "Card.Root").$$render($$result, { class: "w-full" }, {}, {
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
              { lang, focus: true, this: depart_input },
              {
                this: ($$value) => {
                  depart_input = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Separator, "Separator").$$render($$result, { class: "my-4" }, {}, {})} <div class="space-y-4"><label for="contact" class="block text-lg font-semibold flex items-center">${validate_component(User, "User").$$render($$result, { class: "mr-2 text-black", size: 20 }, {}, {})} ${escape(contenu[lang].contact)}</label>  ${contact.length > 0 ? `<select class="w-full p-2 border rounded-md bg-white"><option${add_attribute("value", null, 0)}>${escape(contenu[lang].selectContact)}</option>${each(contact, (c) => {
              return `<option${add_attribute("value", c, 0)}>${escape(c.name)} - ${escape(c.telephone)}</option>`;
            })}</select>` : ``}  <button class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700">${validate_component(Plus, "Plus").$$render($$result, { size: 16 }, {}, {})} ${escape(contenu[lang].addNewContact)}</button>  ${``}</div> ${isDepart ? `${validate_component(Separator, "Separator").$$render($$result, { class: "my-4" }, {}, {})} <div class="flex gap-3 mb-2">${validate_component(Calendar, "Calendar").$$render($$result, { class: "w-5 h-5 text-black" }, {}, {})} <h2 class="text-lg font-semibold text-black">${escape(contenu[lang].vehiculeAvailability)}</h2></div> <div class="grid lg:grid-cols-2 gap-8"> <div class="space-y-4"><div class="flex items-center gap-2"><span class="text-sm font-medium text-gray-700">${escape(isDepart ? contenu[lang].collectionNoEarlierThan : contenu[lang].deliveryUntil)}</span> <button class="text-gray-400 hover:text-gray-600">${validate_component(Circle_help, "HelpCircle").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></div> <div class="flex flex-col sm:flex-row gap-4"><div class="relative flex-1"><div class="relative flex items-center"><input type="date"${add_attribute("min", minDate, 0)} class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm"${add_attribute("value", collectionDate, 0)}></div></div> <div class="relative w-full sm:w-40"><div class="relative flex items-center"><input type="time" class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white shadow-sm"${add_attribute("value", collectionTime, 0)}></div></div></div></div></div>` : ``} ${validate_component(Separator, "Separator").$$render($$result, { class: "my-4" }, {}, {})} <label for="comment" class="block text-sm font-medium">${escape(contenu[lang].comment)}</label> <br> <textarea class="w-full h-24 mt-1 border rounded-md p-2 resize-none focus:ring-2 focus:ring-primary-500">${escape("")}</textarea>`;
          }
        })}`;
      }
    })} </div>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let depart;
  let arrival;
  let depart_route = "";
  let arrival_route = "";
  let lang = "fr";
  let contact = [];
  let tomorrow = /* @__PURE__ */ new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let minDateDepart = tomorrow.toISOString().split("T")[0];
  tomorrow.setDate(tomorrow.getDate() + 3);
  let minDateArival = tomorrow.toISOString().split("T")[0];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = ` <div class="flex flex-col gap-5 justify-center items-center"><div class="w-auto md:w-full max-w-md">${validate_component(PhoneVerification, "PhoneVerification").$$render($$result, { lang }, {}, {})}</div> <div class="flex md:justify-center "><div class="flex justify-start flex-col md:flex-row gap-5 ">${validate_component(TravelContainer, "TravelContainer").$$render(
      $$result,
      {
        minDate: minDateDepart,
        lang,
        isDepart: true,
        route: depart_route,
        contact,
        this: depart
      },
      {
        this: ($$value) => {
          depart = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(TravelContainer, "TravelContainer").$$render(
      $$result,
      {
        minDate: minDateArival,
        lang,
        isDepart: false,
        route: arrival_route,
        contact,
        this: arrival
      },
      {
        this: ($$value) => {
          arrival = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-L9sbx6dw.js.map
