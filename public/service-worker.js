// public/service-worker.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope)
      })
      .catch((error) => {
        console.error("Error registering Service Worker:", error)
      })
  })
}

// public/service-worker.js
const CACHE_NAME = "my-app-cache"
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  // ... افزودن سایر منابع برنامه
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  )
})
