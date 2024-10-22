/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />
 
import {build , files, version} from '$service-worker';

const ASSETS = [...build, ...files,
	//,"node_modules/@sveltejs/kit/src/runtime/client/entry.js",
    // "/",
    // "/homepage",
    // "/addProperty",
    // "/singup",
    // "/login"
];
const CACHE = 'cache-' + version;
const DB_NAME = "easyimmo"
const DB_VERSION = 1
const API_URL = "https://easyimmo.com/api/";
console.log('build', build , files, version);


// self.addEventListener('install', async (event) => {
//     event.waitUntil(
//         caches.open(CACHE)
//             .then((cache) => {
//                 cache.addAll(ASSETS)
//             })
//     )
//     await self.skipWaiting()
// });
self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    self.skipWaiting();
    async function addfile() {
        const cache = await caches.open(CACHE);
        await Promise.all(ASSETS.map(async (url) => {
            try {
                await cache.add(url);
            } catch (e) {
                console.log("add file failed", e, url);
            }
        }));
    }
    event.waitUntil(addfile());
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            // Clear old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Optionally, clear and repopulate the current cache
            caches.open(CACHE).then(async (cache) => {
                console.log('Clearing and repopulating cache');
                await cache.keys().then((keys) => keys.forEach((key) => cache.delete(key)));
                return cache.addAll(ASSETS);
            })
        ])
    );
});
 
// self.addEventListener("push", (event) => {
//     const data = event.data ? event.data.json() : {};
//     event.waitUntil(self.registration.showNotification(data.title, data));
// });
 
// self.addEventListener("notificationclick", (event) => {
//     event.notification.close();
//     event.waitUntil(openUrl(event.notification.data.url));
// });
 
// self.addEventListener("fetch", async (event) => {
//     if(navigator.onLine) /**Online*/ {
//         switch (event.request.method) {
//             case "GET":
//                 event.respondWith((async () => {
//                     const cachedResponse = await caches.match(event.request);

//                     if (cachedResponse) {
//                         if (cachedResponse.redirected) {
//                             return await cleanResponse(cachedResponse)
//                         } else {
//                             return cachedResponse;
//                         }
//                     }

//                     const response = await fetch(event.request, {
//                         cache: "no-cache"
//                     })
//                     if (response.status === 401) {
//                         let clients = await self.clients.matchAll({
//                             includeUncontrolled: true,
//                             type: 'window',
//                         })
//                         if (clients && clients.length) {
//                             clients[0].postMessage({
//                                 type: 'LOGOUT'
//                             })
//                         }
//                     }

//                     return response
//                 })());
//                 break;
//             case "POST":
//             case "PUT":
//             case "DELETE":
//                 event.respondWith((async () => {
//                     const cachedResponse = await caches.match(event.request);
//                     if (cachedResponse) {
//                         return cachedResponse;
//                     }

//                     let response = await fetch(event.request)

//                     if (response.status === 401) {
//                         let clients = await self.clients.matchAll({
//                             includeUncontrolled: true,
//                             type: 'window',
//                         })
//                         if (clients && clients.length) {
//                             clients[0].postMessage({
//                                 type: 'LOGOUT'
//                             })
//                         }
//                     }

//                     return response
//                 })());
//                 break;
//         }
//     } else /**Offline*/ {
//         switch (event.request.method) {
//             case "GET":
//                 event.respondWith((async () => {
//                     const cachedResponse = await caches.match(event.request);
//                     if (cachedResponse) {
//                         if (cachedResponse.redirected) {
//                             return await cleanResponse(cachedResponse)
//                         } else {
//                             return cachedResponse;
//                         }
//                     } else {
//                         await Promise.reject()
//                     }
//                 })());
//                 break;
//             case "POST":
//             case "PUT":
//             case "DELETE":
//                 await Promise.reject()
//                 break;
//         }
//     }
// });

// self.addEventListener("sync", (event) => {
//     console.log('syncro', event.tag)
//     let datas = event.tag.split('|')
//     switch (datas[0]) {
//         case "put":
//             switch (datas[1]) {
//                 case "events":
//                     console.log("✅ End synchro put event ", datas[2])
//                     break
//                 case "files":
//                     console.log("✅ End synchro put files ", datas[2])
//                     break
//                 case "tasks":
//                     console.log("✅ End synchro put task ", datas[2])
//                     break
//             }
//             break
//         case "post":
//             switch (datas[1]) {
//                 case "properties":
//                     postProperties(datas[2])
//                         .then((res)=> {
//                             if (res) console.log("✅ End synchro post properties ", datas[2])
//                     })
//                     break
//                 case "userAddAdresse":
//                     postUserAddAdresse(datas[2])
//                         .then((res)=> {
//                             if (res) console.log("✅ End synchro post user add adresse", datas[2])
//                         })
//                     break
//             }
//     }
// });



// // function cleanResponse(response) {
// //     const clonedResponse = response.clone();

// //     const bodyPromise = 'body' in clonedResponse ?
// //         Promise.resolve(clonedResponse.body) :
// //         clonedResponse.blob();

// //     return bodyPromise.then((body) => {
// //         return new Response(body, {
// //             headers: clonedResponse.headers,
// //             status: clonedResponse.status,
// //             statusText: clonedResponse.statusText,
// //         });
// //     });
// // }
// async function openUrl(url) {
//     const windowClients = await self.clients.matchAll({
//         type: "window",
//         includeUncontrolled: true,
//     });
//     for (let i = 0; i < windowClients.length; i++) {
//         const client = windowClients[i];
//         if (client.url === url && "focus" in client) {
//             return client.focus();
//         }
//     }
//     if (self.clients.openWindow) {
//         return self.clients.openWindow(url);
//     }
//     return null;
// }

// function IDBGetDataFormTableByKey(table, key) {
//     new Promise((resolve, _) => {
//         let openRequest = indexedDB.open(DB_NAME, DB_VERSION);
//         openRequest.onsuccess = function (event) {
//             const db = event.target.result;
//             const txn = db.transaction(table, "readonly");
//             const objectStore = txn.objectStore(table);
//             objectStore.get(key).onsuccess = function (event) {
//                 resolve(event.target.result);
//             }
//             txn.oncomplete = function () {
//                 db.close();
//             };
//         }
//     });
// }

// async function IDBGetAllDataFromTable(table) {
//     return new Promise(function (resolve, _) {
//         let openRequest = indexedDB.open(DB_NAME, DB_VERSION);
//         openRequest.onsuccess = function(event) {
//             const db = event.target?.result;
//             const txn = db.transaction(table, "readonly");
//             const objectStore = txn.objectStore(table);
//             objectStore.getAll().onsuccess = function (event) {
//                 resolve(event.target.result);
//             }
//             txn.oncomplete = function () {
//                 db.close();
//             };
//         }})
// }

// async function IDBUbdateDataInTableByKey(data, table, key) {
//     return new Promise(function (resolve, _) {
//         let openRequest = indexedDB.open(DB_NAME, DB_VERSION);
//         openRequest.onsuccess = function (event) {
//             const db = event.target.result;
//             const txn = db.transaction(table, "readwrite");
//             const store = txn.objectStore(table);
//             store.put(data, key);
//             txn.oncomplete = function () {
//                 db.close();
//             };
//             resolve(true)
//         };
//     })
// }

// async function postProperties(data) {
//     const user = await IDBGetDataFormTableByKey("infos", "user")
//     const properties = await IDBGetDataFormTableByKey("properties", data)
//     if (!user || !properties) return false
//     const response = await fetch(API_URL + "properties", {
//         method: "POST",
//         mode: "cors",
//         cache: "no-cache",
//         credentials: "same-origin",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: user.token
//         },
//         body: JSON.stringify(properties),
//     });
//     if (response.ok) return true
//     else {
//         console.error(response)
//         return false
//     }
// }


// async function postUserAddAdresse(data) {
//     const user = await IDBGetDataFormTableByKey("infos", "user")
//     const adresse = await IDBGetDataFormTableByKey("adresse", data)
//     if (!user || !properties) return false
//     const response = await fetch(API_URL + "properties", {
//         method: "POST",
//         mode: "cors",
//         cache: "no-cache",
//         credentials: "same-origin",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: user.token
//         },
//         body: JSON.stringify(adresse),
//     });
//     if (response.ok) return true
//     else {
//         console.error(response)
//         return false
//     }
// }