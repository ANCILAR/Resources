const CACHE_NAME = 'pwa-shell-v1';
const SHELL_FILES = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).catch(() => caches.match('/offline.html')))
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-inventory') {
    event.waitUntil(syncInventory());
  }
});

async function syncInventory() {
  const db = await openDB();
  const tx = db.transaction('inventory', 'readonly');
  const store = tx.objectStore('inventory');
  const all = await store.getAll();

  for (const item of all) {
    try {
      await fetch('/api/sync', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e) {
      console.error('Sync failed for', item);
    }
  }
}

self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    actions: data.actions || []
  });
});

self.addEventListener('notificationclick', (event) => {
  if (event.action === 'view') {
    clients.openWindow('/orders');
  } else if (event.action === 'mark') {
    fetch('/api/mark-fulfilled', { method: 'POST' });
  }
});