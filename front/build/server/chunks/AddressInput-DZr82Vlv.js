import { c as create_ssr_component, v as validate_component, f as compute_rest_props, h as spread, i as escape_attribute_value, j as escape_object, k as createEventDispatcher, d as add_attribute, e as escape, b as each } from './ssr-DlLcKc17.js';
import { I as Icon, i as is_void } from './Header-CLrXPYps.js';
import { c as cn } from './utils-Z8CT6ubJ.js';
import { c as contenu } from './contenu-BdDV-JPk.js';
import './appwrite-C9dUL3ii.js';

const Chevron_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Circle_alert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "8",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12.01",
        "y1": "16",
        "y2": "16"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "circle-alert" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Map_pin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    ["circle", { "cx": "12", "cy": "10", "r": "3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "map-pin" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("bg-card text-card-foreground rounded-lg border shadow-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("p-6", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col space-y-1.5 p-6 pb-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "tag"]);
  let { class: className = void 0 } = $$props;
  let { tag = "h3" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        {
          class: escape_attribute_value(cn("text-lg font-semibold leading-none tracking-tight", className))
        },
        escape_object($$restProps)
      ],
      {}
    )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`;
});
const AddressInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const dispatch = createEventDispatcher();
  let input;
  let { lang = "fr" } = $$props;
  let selectedIndex = -1;
  let autocompleteResults = [];
  let precise = true;
  let { showAutocomplete = false } = $$props;
  let { value_set = false } = $$props;
  let { countryCode = "FRA" } = $$props;
  const focus = false;
  let { route = "" } = $$props;
  let { placeholder = contenu[lang].departLocation } = $$props;
  function getValue() {
    return input.value;
  }
  function empty() {
    input.value = "";
    value_set = false;
    dispatch("value_set", false);
    autocompleteResults = [];
    showAutocomplete = false;
    precise = false;
  }
  function getShowAutocomplete() {
    return showAutocomplete;
  }
  function setShowAutocomplete(show) {
    showAutocomplete = show;
  }
  function selectLocation(location, pressise) {
    input.value = location;
    value_set = pressise;
    dispatch("value_set", pressise);
    autocompleteResults = [];
    showAutocomplete = false;
    precise = pressise;
  }
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0) $$bindings.lang(lang);
  if ($$props.showAutocomplete === void 0 && $$bindings.showAutocomplete && showAutocomplete !== void 0) $$bindings.showAutocomplete(showAutocomplete);
  if ($$props.value_set === void 0 && $$bindings.value_set && value_set !== void 0) $$bindings.value_set(value_set);
  if ($$props.countryCode === void 0 && $$bindings.countryCode && countryCode !== void 0) $$bindings.countryCode(countryCode);
  if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0) $$bindings.focus(focus);
  if ($$props.route === void 0 && $$bindings.route && route !== void 0) $$bindings.route(route);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.getValue === void 0 && $$bindings.getValue && getValue !== void 0) $$bindings.getValue(getValue);
  if ($$props.empty === void 0 && $$bindings.empty && empty !== void 0) $$bindings.empty(empty);
  if ($$props.getShowAutocomplete === void 0 && $$bindings.getShowAutocomplete && getShowAutocomplete !== void 0) $$bindings.getShowAutocomplete(getShowAutocomplete);
  if ($$props.setShowAutocomplete === void 0 && $$bindings.setShowAutocomplete && setShowAutocomplete !== void 0) $$bindings.setShowAutocomplete(setShowAutocomplete);
  if ($$props.selectLocation === void 0 && $$bindings.selectLocation && selectLocation !== void 0) $$bindings.selectLocation(selectLocation);
  return `<div class="relative w-full max-w-md mx-auto"><div class="relative">${validate_component(Map_pin, "MapPin").$$render(
    $$result,
    {
      class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
    },
    {},
    {}
  )} <input type="text"${add_attribute("placeholder", placeholder, 0)} class="${"w-full pl-10 pr-4 py-2 rounded-lg bg-white text-gray-900 text-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out " + escape(value_set ? "ring-2 ring-purple-500" : "", true) + " " + escape(precise ? "" : "ring-2 ring-red-500", true) + " " + escape("", true)}"${add_attribute("this", input, 0)}${add_attribute("value", route, 0)}> ${!precise ? `<div class="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2">${validate_component(Circle_alert, "AlertCircle").$$render($$result, { class: "text-red-500 h-5 w-5" }, {}, {})}</div>` : ``}</div> ${showAutocomplete ? `<div class="absolute z-10 w-full mt-1"><ul class="bg-white border border-gray-300 rounded-md shadow-lg">${each(autocompleteResults, (result, index) => {
    return `<li><button type="button" class="${"w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out " + escape(
      selectedIndex === index ? "bg-gray-100 font-semibold" : "",
      true
    )}">${escape(result)}</button> </li>`;
  })}</ul></div>` : ``} ${!precise ? `<div class="absolute z-20 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md shadow-lg mt-2 right-0">${escape(contenu[lang].needMorePreciseAddress)}</div>` : ``}</div>`;
});

export { AddressInput as A, Chevron_down as C, Card as a, Card_header as b, Card_title as c, Card_content as d };
//# sourceMappingURL=AddressInput-DZr82Vlv.js.map
