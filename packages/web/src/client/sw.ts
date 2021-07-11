declare const self: ServiceWorkerGlobalScope;

// Insert generated assets
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: __WB_MANIFEST is a placeholder filled by workbox-webpack-plugin
const manifest: { revision: string | null; url: string }[] = self.__WB_MANIFEST;
const staticAssets = manifest.map((asset) => asset.url);

const STATIC_CACHE_NAME = "static-data";
const DYNAMIC_CACHE_NAME = "dynamic-data";

self.addEventListener("install", async () => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(staticAssets);
});

self.addEventListener("fetch", (event) => {
  if (!(event.request.url.indexOf("http") === 0)) return;
  if (event.request.url.includes("__webpack_hmr")) return;

  event.respondWith(
    caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});

// Fix for TS declaration
// see: https://stackoverflow.com/a/50913569
export {};
