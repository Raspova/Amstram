const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Original size/change/driver.webp","Original size/change/side0.webp","Original size/change/side1.webp","Original size/change/side2.webp","Original size/driver.webp","Original size/porte-voitures1.webp","Original size/side.webp","Original size/side0.webp","Original size/side1.webp","Original size/side2.webp","Original size/truck.png","bw_separetor.svg","driver.webp","europe-map.png","europe-map.webp","favicon.ico","favicon.png","icons/Google_logo.svg.webp","icons/apple-icon-180.png","icons/apple-splash-1125-2436.jpg","icons/apple-splash-1136-640.jpg","icons/apple-splash-1170-2532.jpg","icons/apple-splash-1179-2556.jpg","icons/apple-splash-1242-2208.jpg","icons/apple-splash-1242-2688.jpg","icons/apple-splash-1284-2778.jpg","icons/apple-splash-1290-2796.jpg","icons/apple-splash-1334-750.jpg","icons/apple-splash-1488-2266.jpg","icons/apple-splash-1536-2048.jpg","icons/apple-splash-1620-2160.jpg","icons/apple-splash-1640-2360.jpg","icons/apple-splash-1668-2224.jpg","icons/apple-splash-1668-2388.jpg","icons/apple-splash-1792-828.jpg","icons/apple-splash-2048-1536.jpg","icons/apple-splash-2048-2732.jpg","icons/apple-splash-2160-1620.jpg","icons/apple-splash-2208-1242.jpg","icons/apple-splash-2224-1668.jpg","icons/apple-splash-2266-1488.jpg","icons/apple-splash-2360-1640.jpg","icons/apple-splash-2388-1668.jpg","icons/apple-splash-2436-1125.jpg","icons/apple-splash-2532-1170.jpg","icons/apple-splash-2556-1179.jpg","icons/apple-splash-2688-1242.jpg","icons/apple-splash-2732-2048.jpg","icons/apple-splash-2778-1284.jpg","icons/apple-splash-2796-1290.jpg","icons/apple-splash-640-1136.jpg","icons/apple-splash-750-1334.jpg","icons/apple-splash-828-1792.jpg","icons/manifest-icon-192.maskable.png","icons/manifest-icon-512.maskable.png","manifest.json","porte-voitures.webp","porte-voitures1.webp","side.webp","side0.webp","side1.webp","side2.webp","truck.png","truck.webp","service-worker.js"]),
	mimeTypes: {".webp":"image/webp",".png":"image/png",".svg":"image/svg+xml",".jpg":"image/jpeg",".json":"application/json"},
	_: {
		client: {"start":"_app/immutable/entry/start.BsTEM2VF.js","app":"_app/immutable/entry/app.Dx5C5ooW.js","imports":["_app/immutable/entry/start.BsTEM2VF.js","_app/immutable/chunks/entry.BW_XWQaZ.js","_app/immutable/chunks/scheduler.BXoHxdv6.js","_app/immutable/entry/app.Dx5C5ooW.js","_app/immutable/chunks/scheduler.BXoHxdv6.js","_app/immutable/chunks/index.BiSTRyGO.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-CGGgMPs4.js')),
			__memo(() => import('./chunks/1-BFd3xazm.js')),
			__memo(() => import('./chunks/2-BKgsJWKY.js')),
			__memo(() => import('./chunks/3-CXqZQvj3.js')),
			__memo(() => import('./chunks/4-OPra1WsA.js')),
			__memo(() => import('./chunks/5-BVUWoAqw.js')),
			__memo(() => import('./chunks/6-CsSFCIeo.js')),
			__memo(() => import('./chunks/7-C8LTLieI.js')),
			__memo(() => import('./chunks/8-Dxa5NpgA.js')),
			__memo(() => import('./chunks/9-p4Dllo24.js')),
			__memo(() => import('./chunks/10-BB5wrMRL.js'))
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
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/routes",
				pattern: /^\/api\/routes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-D6pjBSUb.js'))
			},
			{
				id: "/api/routes/[id]",
				pattern: /^\/api\/routes\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-B4KXOFEs.js'))
			},
			{
				id: "/confidentiality",
				pattern: /^\/confidentiality\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/general_condition",
				pattern: /^\/general_condition\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/reserve",
				pattern: /^\/reserve\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/route",
				pattern: /^\/route\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/route/[id]",
				pattern: /^\/route\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/test",
				pattern: /^\/test\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/verify_email",
				pattern: /^\/verify_email\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
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
