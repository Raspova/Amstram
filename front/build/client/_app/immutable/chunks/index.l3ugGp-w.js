var j=Object.defineProperty;var T=(e,t,n)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var $=(e,t,n)=>T(e,typeof t!="symbol"?t+"":t,n);import{r as h,n as y,f as b,h as D,i as A,j as O,k as N,l as B,m as H,p as E,q as I,v as L,w as P}from"./scheduler._PVTacox.js";let p=!1;function q(){p=!0}function M(){p=!1}function R(e,t,n,i){for(;e<t;){const s=e+(t-e>>1);n(s)<=i?e=s+1:t=s}return e}function k(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const r=[];for(let l=0;l<t.length;l++){const u=t[l];u.claim_order!==void 0&&r.push(u)}t=r}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let s=0;for(let r=0;r<t.length;r++){const l=t[r].claim_order,u=(s>0&&t[n[s]].claim_order<=l?s+1:R(1,s,d=>t[n[d]].claim_order,l))-1;i[r]=n[u]+1;const o=u+1;n[o]=r,s=Math.max(o,s)}const a=[],c=[];let f=t.length-1;for(let r=n[s]+1;r!=0;r=i[r-1]){for(a.push(t[r-1]);f>=r;f--)c.push(t[f]);f--}for(;f>=0;f--)c.push(t[f]);a.reverse(),c.sort((r,l)=>r.claim_order-l.claim_order);for(let r=0,l=0;r<c.length;r++){for(;l<a.length&&c[r].claim_order>=a[l].claim_order;)l++;const u=l<a.length?a[l]:null;e.insertBefore(c[r],u)}}function z(e,t){if(p){for(k(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function le(e,t,n){p&&!n?z(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function F(e){e.parentNode&&e.parentNode.removeChild(e)}function ce(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function G(e){return document.createElement(e)}function J(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function g(e){return document.createTextNode(e)}function ae(){return g(" ")}function fe(){return g("")}function oe(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function x(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}const K=["width","height"];function U(e,t){const n=Object.getOwnPropertyDescriptors(e.__proto__);for(const i in t)t[i]==null?e.removeAttribute(i):i==="style"?e.style.cssText=t[i]:i==="__value"?e.value=e[i]=t[i]:n[i]&&n[i].set&&K.indexOf(i)===-1?e[i]=t[i]:x(e,i,t[i])}function ue(e,t){for(const n in t)x(e,n,t[n])}function V(e,t){Object.keys(t).forEach(n=>{W(e,n,t[n])})}function W(e,t,n){const i=t.toLowerCase();i in e?e[i]=typeof e[i]=="boolean"&&n===""?!0:n:t in e?e[t]=typeof e[t]=="boolean"&&n===""?!0:n:x(e,t,n)}function _e(e){return/-/.test(e)?V:U}function de(e){return e.dataset.svelteH}function Q(e){return Array.from(e.childNodes)}function X(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function S(e,t,n,i,s=!1){X(e);const a=(()=>{for(let c=e.claim_info.last_index;c<e.length;c++){const f=e[c];if(t(f)){const r=n(f);return r===void 0?e.splice(c,1):e[c]=r,s||(e.claim_info.last_index=c),f}}for(let c=e.claim_info.last_index-1;c>=0;c--){const f=e[c];if(t(f)){const r=n(f);return r===void 0?e.splice(c,1):e[c]=r,s?r===void 0&&e.claim_info.last_index--:e.claim_info.last_index=c,f}}return i()})();return a.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,a}function C(e,t,n,i){return S(e,s=>s.nodeName===t,s=>{const a=[];for(let c=0;c<s.attributes.length;c++){const f=s.attributes[c];n[f.name]||a.push(f.name)}a.forEach(c=>s.removeAttribute(c))},()=>i(t))}function me(e,t,n){return C(e,t,n,G)}function he(e,t,n){return C(e,t,n,J)}function Y(e,t){return S(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>g(t),!0)}function pe(e){return Y(e," ")}function $e(e,t){t=""+t,e.data!==t&&(e.data=t)}function ye(e,t){e.value=t??""}function ge(e,t,n,i){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,"")}function xe(e,t,n){for(let i=0;i<e.options.length;i+=1){const s=e.options[i];if(s.__value===t){s.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function we(e){const t=e.querySelector(":checked");return t&&t.__value}function ve(e,t,n){e.classList.toggle(t,!!n)}function be(e,t){const n=[];let i=0;for(const s of t.childNodes)if(s.nodeType===8){const a=s.textContent.trim();a===`HEAD_${e}_END`?(i-=1,n.push(s)):a===`HEAD_${e}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}function Ne(e,t){return new e(t)}const m=new Set;let _;function Ee(){_={r:0,c:[],p:_}}function Ae(){_.r||h(_.c),_=_.p}function Z(e,t){e&&e.i&&(m.delete(e),e.i(t))}function Se(e,t,n,i){if(e&&e.o){if(m.has(e))return;m.add(e),_.c.push(()=>{m.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function Ce(e){e&&e.c()}function je(e,t){e&&e.l(t)}function ee(e,t,n){const{fragment:i,after_update:s}=e.$$;i&&i.m(t,n),N(()=>{const a=e.$$.on_mount.map(I).filter(A);e.$$.on_destroy?e.$$.on_destroy.push(...a):h(a),e.$$.on_mount=[]}),s.forEach(N)}function te(e,t){const n=e.$$;n.fragment!==null&&(B(n.after_update),h(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ne(e,t){e.$$.dirty[0]===-1&&(L.push(e),P(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Te(e,t,n,i,s,a,c=null,f=[-1]){const r=H;E(e);const l=e.$$={fragment:null,ctx:[],props:a,update:y,not_equal:s,bound:b(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(r?r.$$.context:[])),callbacks:b(),dirty:f,skip_bound:!1,root:t.target||r.$$.root};c&&c(l.root);let u=!1;if(l.ctx=n?n(e,t.props||{},(o,d,...w)=>{const v=w.length?w[0]:d;return l.ctx&&s(l.ctx[o],l.ctx[o]=v)&&(!l.skip_bound&&l.bound[o]&&l.bound[o](v),u&&ne(e,o)),d}):[],l.update(),u=!0,h(l.before_update),l.fragment=i?i(l.ctx):!1,t.target){if(t.hydrate){q();const o=Q(t.target);l.fragment&&l.fragment.l(o),o.forEach(F)}else l.fragment&&l.fragment.c();t.intro&&Z(e.$$.fragment),ee(e,t.target,t.anchor),M(),D()}E(r)}class De{constructor(){$(this,"$$");$(this,"$$set")}$destroy(){te(this,1),this.$destroy=y}$on(t,n){if(!A(n))return y;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(t){this.$$set&&!O(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ie="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ie);export{ue as A,ce as B,U as C,_e as D,be as E,de as F,ye as G,ve as H,xe as I,oe as J,we as K,De as S,pe as a,x as b,me as c,le as d,G as e,Se as f,F as g,g as h,Te as i,Q as j,Y as k,z as l,$e as m,fe as n,Ae as o,ge as p,Ee as q,Ne as r,ae as s,Z as t,Ce as u,je as v,ee as w,te as x,J as y,he as z};