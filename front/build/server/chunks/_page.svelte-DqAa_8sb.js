import { c as create_ssr_component, v as validate_component, e as escape, a as add_attribute } from './hooks.server-DLkNd8Ku.js';
import './appwrite-CTkzZmTY.js';
import 'appwrite';

const AuthComponant = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  return `<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-4"><div class="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"><div class="flex justify-center p-4 bg-gray-200"><button class="${escape(
    "bg-white text-gray-900",
    true
  ) + " px-4 py-2 rounded-tl-lg rounded-tr-lg font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-gray-900"}">Sign In</button> <button class="${escape(
    "bg-gray-200 text-gray-600",
    true
  ) + " px-4 py-2 rounded-tl-lg rounded-tr-lg font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-gray-900"}">Sign Up</button></div> <div class="p-8">${`<form class="space-y-6"><div><label for="email" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-12a4vpc">Email</label> <input id="email" type="email" placeholder="Enter your email" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required${add_attribute("value", email, 0)}></div> <div><label for="password" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-k332hw">Password</label> <input id="password" type="password" placeholder="Enter your password" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required${add_attribute("value", password, 0)}></div> <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105" data-svelte-h="svelte-xg8m1c">Sign In</button> <div class="text-sm" data-svelte-h="svelte-18x640e"><a href="#" class="font-medium text-black hover:text-gray-600 transition duration-300 ease-in-out">Forgot your password?</a></div></form>`} <div class="mt-6"><div class="relative" data-svelte-h="svelte-1f767ef"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div> <div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500">Or continue with</span></div></div> <div class="mt-6"><button class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out" data-svelte-h="svelte-ubd8xa"><img src="icons/Google_logo.svg.webp" alt="Google Logo" class="h-5 w-5 mr-2">
                        Sign in with Google</button></div></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(AuthComponant, "AuthComponant").$$render($$result, {}, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DqAa_8sb.js.map
