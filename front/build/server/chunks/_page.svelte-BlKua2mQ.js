import { c as create_ssr_component, v as validate_component, e as escape, a as add_attribute } from './hooks.server-DLkNd8Ku.js';
import './appwrite-CTkzZmTY.js';
import 'appwrite';

let lang = "fr";
const PhoneVerification = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sms_sent = true } = $$props;
  let code = "";
  let telephone = "";
  const contenu = {
    fr: {
      title: "Vérification du téléphone",
      phoneNumber: "Numéro de téléphone",
      enterPhoneNumber: "Entrez votre numéro de téléphone",
      sendCode: "Envoyer le code",
      verifyCode: "Vérifier le code"
    },
    en: {
      title: "Phone verification",
      phoneNumber: "Phone number",
      enterPhoneNumber: "Enter your phone number",
      sendCode: "Send code",
      verifyCode: "Verify code"
    }
  };
  if ($$props.sms_sent === void 0 && $$bindings.sms_sent && sms_sent !== void 0) $$bindings.sms_sent(sms_sent);
  return `<div class="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"><div class="flex justify-center p-4 bg-gray-300"><div class="container max-w-md p-4"><h1 class="text-center text-2xl font-bold mb-4 text-amstram-black">${escape(contenu[lang].title)}</h1> ${sms_sent ? `<div class="p-8"><input type="text" class="text-black mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Entrez le code"${add_attribute("value", code, 0)}> <br> <div class="text-center"><button class="bg-amstram-purple text-white font-bold py-2 px-4 rounded">${escape(contenu[lang].verifyCode)}</button></div></div>` : `<div class="phone-verification-container"><label for="telephone" class="block text-sm font-medium text-amstram-black">${escape(contenu[lang].phoneNumber)}</label> <input id="telephone" type="text"${add_attribute("placeholder", contenu[lang].enterPhoneNumber, 0)} class="text-black mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" required pattern="^\\+.*" title="Le numéro de téléphone doit commencer par un +."${add_attribute("value", telephone, 0)}> <br> <div class="text-center"><button class="bg-amstram-purple text-white font-bold py-2 px-4 rounded">${escape(contenu[lang].sendCode)}</button></div></div>`}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` ${validate_component(PhoneVerification, "PhoneVerification").$$render($$result, {}, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BlKua2mQ.js.map
