let private_env = {};
let public_env = {};
let safe_public_env = {};
function set_private_env(environment) {
  private_env = environment;
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
const hooks_server = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));

export { set_public_env as a, set_safe_public_env as b, public_env as c, safe_public_env as d, hooks_server as h, private_env as p, set_private_env as s };
//# sourceMappingURL=hooks.server-BgaRuYhF.js.map
