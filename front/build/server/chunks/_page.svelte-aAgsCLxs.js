import { c as create_ssr_component, v as validate_component, l as createEventDispatcher, e as escape, d as add_attribute } from './ssr-32LgDp64.js';
import './appwrite-CTkzZmTY.js';
import 'appwrite';

const AuthComponant = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  let { user = null } = $$props;
  let { lang = "fr" } = $$props;
  const contenu = {
    fr: {
      welcome: "Bienvenue",
      login: "Se connecter",
      signUp: "S'inscrire",
      logout: "Se déconnecter",
      forgotPassword: "Mot de passe oublié ?",
      name: "Nom",
      password: "Mot de passe",
      passwordConfirmation: "Confirmation du mot de passe",
      googleSignIn: "Se connecter avec Google",
      orContinueWith: "Ou continuez avec"
    },
    en: {
      welcome: "Welcome",
      login: "Login",
      signUp: "Sign Up",
      logout: "Logout",
      forgotPassword: "Forgot password ?",
      name: "Name",
      password: "Password",
      passwordConfirmation: "Password confirmation",
      googleSignIn: "Login with Google",
      orContinueWith: "Or continue with"
    }
  };
  createEventDispatcher();
  if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0) $$bindings.lang(lang);
  return `${`<div class="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"><div class="flex justify-center p-4 bg-gray-200"><button class="${escape(
    "bg-white text-gray-900",
    true
  ) + " px-4 py-2 rounded-tl-lg rounded-tr-lg font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-gray-900"}">${escape(contenu[lang].login)}</button> <button class="${escape(
    "bg-gray-200 text-gray-600",
    true
  ) + " px-4 py-2 rounded-tl-lg rounded-tr-lg font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-gray-900"}">${escape(contenu[lang].signUp)}</button></div> <div class="p-8">${`<form class="space-y-6"><div><label for="email" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-12a4vpc">Email</label> <input id="email" type="email" placeholder="Enter your email" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required${add_attribute("value", email, 0)}></div> <div><label for="password" class="block text-sm font-medium text-gray-700">${escape(contenu[lang].password)}</label> <input id="password" type="password" placeholder="Enter your password" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required${add_attribute("value", password, 0)}></div> <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">${escape(contenu[lang].login)}</button> <div class="text-sm"><a href="#" class="font-medium text-black hover:text-gray-600 transition duration-300 ease-in-out">${escape(contenu[lang].forgotPassword)}</a></div></form>`} <div class="mt-6"><div class="relative"><div class="absolute inset-0 flex items-center" data-svelte-h="svelte-12skotv"><div class="w-full border-t border-gray-300"></div></div> <div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500">${escape(contenu[lang].orContinueWith)}</span></div></div> <div class="mt-6"><button class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out"><img src="icons/Google_logo.svg.webp" alt="Google Logo" class="h-5 w-5 mr-2"> ${escape(contenu[lang].googleSignIn)}</button></div></div></div></div>`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(AuthComponant, "AuthComponant").$$render($$result, {}, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-aAgsCLxs.js.map
