import{s as k,e as d,c as h,b as v,f as u,m,i as f,k as y,o as E,t as $,a as w,d as q,g as x,h as A,n as p}from"../chunks/scheduler.B2C2-Lbn.js";import{S as I,i as P,b as g,e as V,t as b,g as C,c as D,a as S,m as z,d as H}from"../chunks/index.5kfQOys3.js";import{p as L}from"../chunks/stores.CL7u-LQi.js";import{v as M,a as U,s as j,A as B,c as F}from"../chunks/contenu.DEuD0mMw.js";import{g as G}from"../chunks/entry.Ci3JGWsG.js";function J(c){let t,s=F.verifyEmail+"",e,o,n;return{c(){t=d("h1"),e=$(s),o=w(),n=d("div"),this.h()},l(a){t=h(a,"H1",{id:!0,class:!0});var l=v(t);e=q(l,s),l.forEach(u),o=x(a),n=h(a,"DIV",{class:!0}),v(n).forEach(u),this.h()},h(){m(t,"id","titleEmail"),m(t,"class","svelte-n6hqs5"),m(n,"class","loader svelte-n6hqs5")},m(a,l){f(a,t,l),A(t,e),f(a,o,l),f(a,n,l)},p,i:p,o:p,d(a){a&&(u(t),u(o),u(n))}}}function K(c){let t,s;return t=new B({}),t.$on("login",c[1]),{c(){D(t.$$.fragment)},l(e){S(t.$$.fragment,e)},m(e,o){z(t,e,o),s=!0},p,i(e){s||(b(t.$$.fragment,e),s=!0)},o(e){g(t.$$.fragment,e),s=!1},d(e){H(t,e)}}}function N(c){let t,s,e,o;const n=[K,J],a=[];function l(r,i){return r[0]?1:0}return s=l(c),e=a[s]=n[s](c),{c(){t=d("div"),e.c(),this.h()},l(r){t=h(r,"DIV",{class:!0});var i=v(t);e.l(i),i.forEach(u),this.h()},h(){m(t,"class","container svelte-n6hqs5")},m(r,i){f(r,t,i),a[s].m(t,null),o=!0},p(r,[i]){let _=s;s=l(r),s===_?a[s].p(r,i):(C(),g(a[_],1,1,()=>{a[_]=null}),V(),e=a[s],e?e.p(r,i):(e=a[s]=n[s](r),e.c()),b(e,1),e.m(t,null))},i(r){o||(b(e),o=!0)},o(r){g(e),o=!1},d(r){r&&u(t),a[s].d()}}}function O(c,t,s){let e;y(c,L,r=>s(2,e=r));let o=e.url.searchParams.get("userId")||"",n=e.url.searchParams.get("secret")||"",a=!0;console.log(o,n);function l(){s(0,a=!0),window.location.reload()}return E(async()=>{if(await M(o,n))await G("/");else{alert("Erreur lors de la vérification de l'email, veuillez réessayer");try{await U()?await j():s(0,a=!1)}catch(i){alert("Erreur lors du renvoi de l'email,vous etes possiblement pas connecter"+i),console.error(i)}}}),[a,l]}class Y extends I{constructor(t){super(),P(this,t,O,N,k,{})}}export{Y as component};