/**
 * A simple and efficient LRU (Least Recently Used) Cache using JavaScript's Map.
 *
 * Uses Map to maintain insertion order:
 * - Most recently used = last item
 * - Least recently used = first item
 *
 * Time Complexity:
 * - get: O(1)
 * - put: O(1) amortized (due to delete+insert)
 */

class LRUCache {
  /**
   * @param {number} capacity - Maximum number of items in the cache
   */
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Capacity must be a positive integer.");
    }

    this.capacity = capacity;
    this.cache = new Map(); // Maintains insertion order
  }

  /**
   * Retrieves the value associated with the key, if present.
   * Marks the key as recently used.
   * @param {any} key
   * @returns {any} value or -1 if not found
   */
  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this._makeMostRecent(key, value);
    return value;
  }

  /**
   * Inserts or updates a key-value pair in the cache.
   * Evicts the least recently used item if capacity is exceeded.
   * @param {any} key
   * @param {any} value
   */
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);
    this._evictIfNeeded();
  }

  /**
   * Moves an existing key to the most recent position.
   * @private
   * @param {any} key
   * @param {any} value
   */
  _makeMostRecent(key, value) {
    this.cache.delete(key);
    this.cache.set(key, value);
  }

  /**
   * Evicts the least recently used item if over capacity.
   * @private
   */
  _evictIfNeeded() {
    if (this.cache.size > this.capacity) {
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }
  }

  /**
   * Returns current keys in order from least to most recently used (for debugging).
   * @returns {any[]}
   */
  keys() {
    return Array.from(this.cache.keys());
  }

  /**
   * Returns the current size of the cache.
   * @returns {number}
   */
  size() {
    return this.cache.size;
  }
}


const lru = new LRUCache(2);

lru.put('a', 1);
lru.put('b', 2);
console.log(lru.get('a')); // 1
lru.put('c', 3);           // Evicts 'b'
console.log(lru.get('b')); // -1
console.log(lru.keys());   // ['a', 'c']
