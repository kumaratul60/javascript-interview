/**
 * 03 - IndexedDB
 *
 * A powerful, low-level API for client-side storage of large amounts of structured data.
 * It's asynchronous and works like a NoSQL database.
 */

const dbName = 'UserDatabase';
const request = indexedDB.open(dbName, 1);

// --- 1. Handling Version Changes (Create Store) ---
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  if (!db.objectStoreNames.contains('users')) {
    db.createObjectStore('users', { keyPath: 'id' });
  }
};

request.onsuccess = (event) => {
  const db = event.target.result;
  console.log('Database opened successfully');

  // --- 2. Transactions (Add Data) ---
  const transaction = db.transaction('users', 'readwrite');
  const store = transaction.objectStore('users');

  const user = { id: 101, name: 'Atul', email: 'atul@example.com' };
  const addRequest = store.add(user);

  addRequest.onsuccess = () => console.log('User added to IndexedDB!');

  // --- 3. Retrieval (Get Data) ---
  const getTransaction = db.transaction('users', 'readonly');
  const getStore = getTransaction.objectStore('users');
  const getRequest = getStore.get(101);

  getRequest.onsuccess = () => console.log('Fetched User:', getRequest.result);
};

request.onerror = (event) => {
  console.error('IndexedDB Error:', event.target.errorCode);
};

/**
 * INTERVIEW TIP:
 * - Asynchronous: Non-blocking, uses requests and callbacks (or Promises).
 * - Capacity: Can store significant data (hundreds of MBs).
 * - Indexed: Can search via indexes (fast search).
 */
