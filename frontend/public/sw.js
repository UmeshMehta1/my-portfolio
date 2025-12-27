const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/blog',
  '/images/febicon.jpg',
  '/manifest.json',
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.error('Cache install failed:', err);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip non-HTTP/HTTPS requests (chrome-extension, data:, blob:, etc.)
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip API calls
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).then((response) => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Don't cache chrome-extension or other non-http schemes
          const responseUrl = new URL(response.url);
          if (!responseUrl.protocol.startsWith('http')) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              // Double-check the request URL before caching
              const requestUrl = new URL(event.request.url);
              if (requestUrl.protocol.startsWith('http')) {
                cache.put(event.request, responseToCache);
              }
            })
            .catch((err) => {
              // Silently fail cache operations for unsupported schemes
              console.warn('Cache put failed (unsupported scheme):', err);
            });

          return response;
        });
      })
      .catch(() => {
        // Return offline page if available
        return caches.match('/');
      })
  );
});

