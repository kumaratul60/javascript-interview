/**
 * 01 - LocalStorage vs. SessionStorage
 *
 * Both are part of the Web Storage API and store data as key-value pairs (strings).
 */

// --- 1. LocalStorage ---
// Lifetime: Persists even after the browser is closed.
// Capacity: ~5MB to 10MB (varies by browser).
localStorage.setItem('user_name', 'Atul');
console.log('Local Get:', localStorage.getItem('user_name'));

// Storing Objects: Must be stringified!
const user = { id: 1, name: 'Atul' };
localStorage.setItem('user_data', JSON.stringify(user));
const savedUser = JSON.parse(localStorage.getItem('user_data'));
console.log('Parsed User:', savedUser.name);

// localStorage.removeItem('user_name');
// localStorage.clear(); // Removes ALL items

// --- 2. SessionStorage ---
// Lifetime: Only lasts for the duration of the page session (tab).
// Closing the tab clears the data. Opening in a new tab creates a NEW session.
sessionStorage.setItem('session_id', 'ABC-123');
console.log('Session Get:', sessionStorage.getItem('session_id'));

// --- 3. Storage Event ---
// Fires in OTHER tabs/windows of the same origin when localStorage is changed.
window.addEventListener('storage', (event) => {
  console.log('Storage changed in another tab!');
  console.log(`Key: ${event.key}, Old: ${event.oldValue}, New: ${event.newValue}`);
});

/**
 * INTERVIEW TIP:
 * - Data is ALWAYS stored as a string.
 * - Synchronous API: Blocking operation (can be slow if data is large).
 * - Same-Origin Policy: Only accessible by the same protocol, domain, and port.
 */
