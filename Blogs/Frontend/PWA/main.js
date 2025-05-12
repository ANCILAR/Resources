if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('SW registered');
  });

  window.addEventListener('load', () => {
    if (navigator.onLine) {
      loadOnlineData();
    } else {
      loadOfflineData();
    }
  });
}

function loadOnlineData() {
  fetch('/api/inventory').then(res => res.json()).then(data => {
    document.querySelector('#list').innerHTML = JSON.stringify(data);
  });
}

function loadOfflineData() {
  openDB().then(db => {
    const tx = db.transaction('inventory', 'readonly');
    const store = tx.objectStore('inventory');
    return store.getAll();
  }).then(data => {
    document.querySelector('#list').innerHTML = JSON.stringify(data);
  });
}

// indexedDB helper
async function openDB() {
  return await idb.openDB('pwa-store', 1, {
    upgrade(db) {
      db.createObjectStore('inventory', { keyPath: 'id' });
    }
  });
}