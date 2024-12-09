const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["bw_separetor.svg","driver.webp","europe-map.png","europe-map.webp","favicon.ico","favicon.png","icons/Google_logo.svg.webp","icons/apple-icon-180.png","icons/apple-splash-1125-2436.jpg","icons/apple-splash-1136-640.jpg","icons/apple-splash-1170-2532.jpg","icons/apple-splash-1179-2556.jpg","icons/apple-splash-1242-2208.jpg","icons/apple-splash-1242-2688.jpg","icons/apple-splash-1284-2778.jpg","icons/apple-splash-1290-2796.jpg","icons/apple-splash-1334-750.jpg","icons/apple-splash-1488-2266.jpg","icons/apple-splash-1536-2048.jpg","icons/apple-splash-1620-2160.jpg","icons/apple-splash-1640-2360.jpg","icons/apple-splash-1668-2224.jpg","icons/apple-splash-1668-2388.jpg","icons/apple-splash-1792-828.jpg","icons/apple-splash-2048-1536.jpg","icons/apple-splash-2048-2732.jpg","icons/apple-splash-2160-1620.jpg","icons/apple-splash-2208-1242.jpg","icons/apple-splash-2224-1668.jpg","icons/apple-splash-2266-1488.jpg","icons/apple-splash-2360-1640.jpg","icons/apple-splash-2388-1668.jpg","icons/apple-splash-2436-1125.jpg","icons/apple-splash-2532-1170.jpg","icons/apple-splash-2556-1179.jpg","icons/apple-splash-2688-1242.jpg","icons/apple-splash-2732-2048.jpg","icons/apple-splash-2778-1284.jpg","icons/apple-splash-2796-1290.jpg","icons/apple-splash-640-1136.jpg","icons/apple-splash-750-1334.jpg","icons/apple-splash-828-1792.jpg","icons/manifest-icon-192.maskable.png","icons/manifest-icon-512.maskable.png","manifest.json","porte-voitures.webp","porte-voitures1.webp","side.webp","side0.webp","side1.webp","side2.webp","truck.png","truck.webp","service-worker.js"]),
	mimeTypes: {".svg":"image/svg+xml",".webp":"image/webp",".png":"image/png",".jpg":"image/jpeg",".json":"application/json"},
	_: {
		client: {"start":"_app/immutable/entry/start.C6Thd4ln.js","app":"_app/immutable/entry/app.pyMQqM5r.js","imports":["_app/immutable/entry/start.C6Thd4ln.js","_app/immutable/chunks/entry.bGDXcCKH.js","_app/immutable/chunks/scheduler.31MQ0txa.js","_app/immutable/chunks/index.DP2zfnRs.js","_app/immutable/entry/app.pyMQqM5r.js","_app/immutable/chunks/scheduler.31MQ0txa.js","_app/immutable/chunks/index.BF6R1Fme.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-B7jS3uDj.js')),
			__memo(() => import('./chunks/1-CLeIE4eq.js')),
			__memo(() => import('./chunks/2-CtjPcYEp.js')),
			__memo(() => import('./chunks/3-PxGGTf3M.js')),
			__memo(() => import('./chunks/4-BSDT_K-V.js')),
			__memo(() => import('./chunks/5-DJ8mGVR8.js')),
			__memo(() => import('./chunks/6-BemOQmUd.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/routes",
				pattern: /^\/api\/routes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-r-qqAO17.js'))
			},
			{
				id: "/confidentiality",
				pattern: /^\/confidentiality\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/general_condition",
				pattern: /^\/general_condition\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/reserve",
				pattern: /^\/reserve\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/verify_email",
				pattern: /^\/verify_email\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
