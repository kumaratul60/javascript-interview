/**
 * 02 - Browser Cookies
 *
 * Used for authentication, session tracking, and preferences.
 * Sent with every HTTP request automatically!
 */

// --- 1. Setting a Cookie ---
document.cookie = 'username=Atul; expires=Thu, 18 Dec 2026 12:00:00 UTC; path=/';

// Using Max-Age (easier, in seconds):
document.cookie = 'user_role=admin; max-age=3600; path=/'; // 1 hour

// --- 2. Reading Cookies ---
// document.cookie returns ALL cookies as a single string!
console.log('All Cookies:', document.cookie);
// Result: "username=Atul; user_role=admin"

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
console.log('Get username:', getCookie('username'));

// --- 3. Security Attributes ---
// Secure: Only sent over HTTPS.
// HttpOnly: Cookie is NOT accessible via JS (only accessible by server).
// SameSite: Prevents CSRF (values: Strict, Lax, None).

// Example (Setting Secure + SameSite):
document.cookie = 'session_token=xyz123; Secure; SameSite=Strict';

/**
 * INTERVIEW TIP:
 * - Size: Max 4KB per cookie.
 * - Auto-send: Only cookies are sent automatically with HTTP requests.
 * - Expiration: Persistent vs Session (no expires = cleared on close).
 */
