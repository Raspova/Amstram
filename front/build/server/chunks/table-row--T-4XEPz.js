import { c as create_ssr_component, v as validate_component, f as compute_rest_props, h as spread, i as escape_attribute_value, j as escape_object, d as add_attribute } from './ssr-DlLcKc17.js';
import { I as Icon, i as is_void } from './Header-B2gz-SeN.js';
import './create-DtR7pMyr.js';
import { t as twMerge, e as extendTailwindMerge, c as cn } from './utils-Z8CT6ubJ.js';

var l=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,u=e=>!e||typeof e!="object"||Object.keys(e).length===0,x=(e,o)=>JSON.stringify(e)===JSON.stringify(o);function i(e,o){e.forEach(function(r){Array.isArray(r)?i(r,o):o.push(r);});}function y(e){let o=[];return i(e,o),o}var a=(...e)=>y(e).filter(Boolean),p=(e,o)=>{let r={},c=Object.keys(e),f=Object.keys(o);for(let t of c)if(f.includes(t)){let s=e[t],n=o[t];typeof s=="object"&&typeof n=="object"?r[t]=p(s,n):Array.isArray(s)||Array.isArray(n)?r[t]=a(n,s):r[t]=n+" "+s;}else r[t]=e[t];for(let t of f)c.includes(t)||(r[t]=o[t]);return r},g=e=>!e||typeof e!="string"?e:e.replace(/\s+/g," ").trim();

var ie={twMerge:!0,twMergeConfig:{},responsiveVariants:!1},_=s=>s||void 0,M=(...s)=>_(y(s).filter(Boolean).join(" ")),R=null,v={},q=!1,j=(...s)=>b$1=>b$1.twMerge?((!R||q)&&(q=!1,R=u(v)?twMerge:extendTailwindMerge({...v,extend:{theme:v.theme,classGroups:v.classGroups,conflictingClassGroupModifiers:v.conflictingClassGroupModifiers,conflictingClassGroups:v.conflictingClassGroups,...v.extend}})),_(R(M(s)))):M(s),Z=(s,b)=>{for(let e in b)s.hasOwnProperty(e)?s[e]=M(s[e],b[e]):s[e]=b[e];return s},ce=(s,b$1)=>{let{extend:e=null,slots:N={},variants:F={},compoundVariants:U=[],compoundSlots:C=[],defaultVariants:W={}}=s,m={...ie,...b$1},S=e!=null&&e.base?M(e.base,s==null?void 0:s.base):s==null?void 0:s.base,g$1=e!=null&&e.variants&&!u(e.variants)?p(F,e.variants):F,A=e!=null&&e.defaultVariants&&!u(e.defaultVariants)?{...e.defaultVariants,...W}:W;!u(m.twMergeConfig)&&!x(m.twMergeConfig,v)&&(q=!0,v=m.twMergeConfig);let O=u(e==null?void 0:e.slots),$=u(N)?{}:{base:M(s==null?void 0:s.base,O&&(e==null?void 0:e.base)),...N},w=O?$:Z({...e==null?void 0:e.slots},u($)?{base:s==null?void 0:s.base}:$),h$1=u(e==null?void 0:e.compoundVariants)?U:a(e==null?void 0:e.compoundVariants,U),V=f=>{if(u(g$1)&&u(N)&&O)return j(S,f==null?void 0:f.class,f==null?void 0:f.className)(m);if(h$1&&!Array.isArray(h$1))throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof h$1}`);if(C&&!Array.isArray(C))throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof C}`);let K=(t,n,a=[],i)=>{let r=a;if(typeof n=="string")r=r.concat(g(n).split(" ").map(o=>`${t}:${o}`));else if(Array.isArray(n))r=r.concat(n.reduce((o,c)=>o.concat(`${t}:${c}`),[]));else if(typeof n=="object"&&typeof i=="string"){for(let o in n)if(n.hasOwnProperty(o)&&o===i){let c=n[o];if(c&&typeof c=="string"){let l=g(c);r[i]?r[i]=r[i].concat(l.split(" ").map(u=>`${t}:${u}`)):r[i]=l.split(" ").map(u=>`${t}:${u}`);}else Array.isArray(c)&&c.length>0&&(r[i]=c.reduce((l,u)=>l.concat(`${t}:${u}`),[]));}}return r},z=(t,n=g$1,a$1=null,i=null)=>{var J;let r=n[t];if(!r||u(r))return null;let o=(J=i==null?void 0:i[t])!=null?J:f==null?void 0:f[t];if(o===null)return null;let c=l(o),l$1=Array.isArray(m.responsiveVariants)&&m.responsiveVariants.length>0||m.responsiveVariants===!0,u$1=A==null?void 0:A[t],d=[];if(typeof c=="object"&&l$1)for(let[T,L]of Object.entries(c)){let ne=r[L];if(T==="initial"){u$1=L;continue}Array.isArray(m.responsiveVariants)&&!m.responsiveVariants.includes(T)||(d=K(T,ne,d,a$1));}let ae=c!=null&&typeof c!="object"?c:l(u$1),k=r[ae||"false"];return typeof d=="object"&&typeof a$1=="string"&&d[a$1]?Z(d,k):d.length>0?(d.push(k),d):k},P=()=>g$1?Object.keys(g$1).map(t=>z(t,g$1)):null,p=(t,n)=>{if(!g$1||typeof g$1!="object")return null;let a=new Array;for(let i in g$1){let r=z(i,g$1,t,n),o=t==="base"&&typeof r=="string"?r:r&&r[t];o&&(a[a.length]=o);}return a},D={};for(let t in f)f[t]!==void 0&&(D[t]=f[t]);let H=(t,n)=>{var i;let a=typeof(f==null?void 0:f[t])=="object"?{[t]:(i=f[t])==null?void 0:i.initial}:{};return {...A,...D,...a,...n}},I=(t=[],n)=>{let a=[];for(let{class:i,className:r,...o}of t){let c=!0;for(let[l,u]of Object.entries(o)){let d=H(l,n);if(Array.isArray(u)){if(!u.includes(d[l])){c=!1;break}}else if(d[l]!==u){c=!1;break}}c&&(i&&a.push(i),r&&a.push(r));}return a},ee=t=>{let n=I(h$1,t);if(!Array.isArray(n))return n;let a={};for(let i of n)if(typeof i=="string"&&(a.base=j(a.base,i)(m)),typeof i=="object")for(let[r,o]of Object.entries(i))a[r]=j(a[r],o)(m);return a},te=t=>{if(C.length<1)return null;let n={};for(let{slots:a=[],class:i,className:r,...o}of C){if(!u(o)){let c=!0;for(let l of Object.keys(o)){let u=H(l,t)[l];if(u===void 0||(Array.isArray(o[l])?!o[l].includes(u):o[l]!==u)){c=!1;break}}if(!c)continue}for(let c of a)n[c]=n[c]||[],n[c].push([i,r]);}return n};if(!u(N)||!O){let t={};if(typeof w=="object"&&!u(w))for(let n of Object.keys(w))t[n]=a=>{var i,r;return j(w[n],p(n,a),((i=ee(a))!=null?i:[])[n],((r=te(a))!=null?r:[])[n],a==null?void 0:a.class,a==null?void 0:a.className)(m)};return t}return j(S,P(),I(h$1),f==null?void 0:f.class,f==null?void 0:f.className)(m)},x$1=()=>{if(!(!g$1||typeof g$1!="object"))return Object.keys(g$1)};return V.variantKeys=x$1(),V.extend=e,V.base=S,V.slots=w,V.variants=g$1,V.defaultVariants=A,V.compoundSlots=C,V.compoundVariants=h$1,V};

const Arrow_up_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "m21 16-4 4-4-4" }],
    ["path", { "d": "M17 20V4" }],
    ["path", { "d": "m3 8 4-4 4 4" }],
    ["path", { "d": "M7 4v16" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-up-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
function getAttrs(builders) {
  const attrs = {};
  builders.forEach((builder) => {
    Object.keys(builder).forEach((key) => {
      if (key !== "action") {
        attrs[key] = builder[key];
      }
    });
  });
  return attrs;
}
const Button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "type", "builders", "el"]);
  let { href = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { builders = [] } = $$props;
  let { el = void 0 } = $$props;
  const attrs = { "data-button-root": "" };
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0) $$bindings.builders(builders);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${builders && builders.length ? ` ${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        {
          type: escape_attribute_value(href ? void 0 : type)
        },
        { href: escape_attribute_value(href) },
        { tabindex: "0" },
        escape_object(getAttrs(builders)),
        escape_object($$restProps),
        escape_object(attrs)
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}` : ` ${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        {
          type: escape_attribute_value(href ? void 0 : type)
        },
        { href: escape_attribute_value(href) },
        { tabindex: "0" },
        escape_object($$restProps),
        escape_object(attrs)
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}`}`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size", "builders"]);
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  let { size = "default" } = $$props;
  let { builders = [] } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0) $$bindings.builders(builders);
  return `${validate_component(Button$1, "ButtonPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      { builders },
      {
        class: cn(buttonVariants({ variant, size, className }))
      },
      { type: "button" },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const buttonVariants = ce({
  base: "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div class="relative w-full overflow-auto"><table${spread(
    [
      {
        class: escape_attribute_value(cn("w-full caption-bottom text-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</table></div>`;
});
const Table_body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<tbody${spread(
    [
      {
        class: escape_attribute_value(cn("[&_tr:last-child]:border-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</tbody>`;
});
const Table_cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<td${spread(
    [
      {
        class: escape_attribute_value(cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</td>`;
});
const Table_head = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<th${spread(
    [
      {
        class: escape_attribute_value(cn("text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</th>`;
});
const Table_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return ` <thead${spread(
    [
      {
        class: escape_attribute_value(cn("[&_tr]:border-b", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</thead>`;
});
const Table_row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<tr${spread(
    [
      {
        class: escape_attribute_value(cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</tr>`;
});

export { Arrow_up_down as A, Button as B, Table as T, Table_header as a, Table_row as b, Table_head as c, Table_body as d, Table_cell as e };
//# sourceMappingURL=table-row--T-4XEPz.js.map
