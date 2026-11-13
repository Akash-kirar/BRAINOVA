/**
 * Brainova Progressive Web App Service Worker
 * Handles offline caching, asset pre-fetching, and offline fallbacks.
 */

const CACHE_VERSION = 'brainova-v1';
const PRECACHE_NAME = `brainova-precache-${CACHE_VERSION}`;
const RUNTIME_CACHE = `brainova-runtime-${CACHE_VERSION}`;

// Core assets to pre-cache on service worker installation
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/site.webmanifest',
  '/offline.html',
  '/favicon.png',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon-180x180.png',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/brainova-logo-transparent.png'
];

// Service Worker Installation: Pre-cache critical app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_URLS).catch((err) => {
          console.warn('[ServiceWorker] Some precache assets failed to fetch:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Service Worker Activation: Purge outdated caches and claim clients
self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!currentCaches.includes(cacheName)) {
              console.log('[ServiceWorker] Removing outdated cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Handler with intelligent caching strategies
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // 1. Skip non-HTTP/HTTPS requests (e.g. chrome-extension, data URIs)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  // 2. Skip Vite development HMR and websocket internal requests
  if (
    url.pathname.includes('/@vite/') ||
    url.pathname.includes('/@react-refresh') ||
    url.pathname.includes('/@fs/') ||
    url.pathname.endsWith('.hot-update.json') ||
    url.pathname.endsWith('.hot-update.js')
  ) {
    return;
  }

  // 3. Skip backend API and external third-party payment/auth requests
  if (
    url.pathname.startsWith('/api/') ||
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('razorpay.com')
  ) {
    // Network-only / Network-first without caching sensitive responses
    return;
  }

  // 4. Navigation Requests (Page Loads): Network-First with Offline Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Try to serve cached version of this page
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fall back to cached root index.html
          const rootCached = await caches.match('/');
          if (rootCached) {
            return rootCached;
          }
          // Finally fall back to dedicated offline.html page
          const offlinePage = await caches.match('/offline.html');
          if (offlinePage) {
            return offlinePage;
          }
          return new Response('Brainova is currently offline. Please check your connection.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        })
    );
    return;
  }

  // 5. Static Assets (Scripts, Stylesheets, Images, Fonts): Stale-While-Revalidate
  const isStaticAsset =
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|ico)$/i);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              const responseClone = networkResponse.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 6. Default Fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(request).catch(() => {
          // If offline and request is an image, optional placeholder
          if (request.destination === 'image') {
            return caches.match('/favicon.png');
          }
        })
      );
    })
  );
});

// Message Listener for client-triggered updates
self.addEventListener('message', (event) => {
  if (event.data && (event.data === 'SKIP_WAITING' || event.data.type === 'SKIP_WAITING')) {
    self.skipWaiting();
  }
});
