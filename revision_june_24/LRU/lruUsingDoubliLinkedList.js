/**
 * @fileoverview
 * Pure JavaScript implementation of an LRU (Least Recently Used) Cache.
 *
 * ❓ What is LRU Cache?
 * ----------------------
 * A capacity-limited cache that automatically evicts the least recently used item
 * when a new item is inserted and the cache is full.
 *
 * ✅ Target Time Complexities:
 * ----------------------------
 * - get(key): O(1)
 * - put(key, value): O(1)
 *
 * ✅ Data Structures Used:
 * ------------------------
 * - HashMap (Map) for constant time lookups.
 * - Doubly Linked List to maintain item usage order (most recent near the head).
 *
 * 📦 Use Cases:
 * ------------
 * - In-memory cache
 * - Chrome extension data handling (auto eviction)
 * - Tab/session state storage
 */

// Doubly Linked List node to store key-value pairs
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  /**
   * Initializes the LRU Cache with a given capacity
   * @param {number} capacity - Maximum number of items the cache can hold
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Map for O(1) access to nodes

    // Dummy head and tail nodes for easy list manipulation
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Removes a node from the doubly linked list
   * @param {Node} node - The node to remove
   */
  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  /**
   * Inserts a node right after the head (marks as most recently used)
   * @param {Node} node - The node to insert
   */
  _insert(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  /**
   * Returns the value of the given key if it exists, otherwise -1.
   * Also marks the key as most recently used.
   * @param {any} key - The key to retrieve
   * @returns {any} - The value of the key, or -1 if not found
   */
  get(key) {
    if (!this.cache.has(key)) return -1;

    const node = this.cache.get(key);
    this._remove(node); // remove from its current position
    this._insert(node); // move to front
    return node.value;
  }

  /**
   * Inserts or updates the key-value pair in the cache.
   * If the cache exceeds its capacity, it evicts the least recently used item.
   * @param {any} key - The key to insert
   * @param {any} value - The value to associate with the key
   */
  put(key, value) {
    if (this.cache.has(key)) {
      this._remove(this.cache.get(key)); // remove old node if exists
    }

    const newNode = new Node(key, value);
    this._insert(newNode);
    this.cache.set(key, newNode);

    // Evict least recently used item if capacity exceeded
    if (this.cache.size > this.capacity) {
      const lru = this.tail.prev;
      this._remove(lru);
      this.cache.delete(lru.key);
    }
  }
}

// ------------------------------------
// 🧪 Example Usage
// ------------------------------------

const lru = new LRUCache(2);

lru.put(1, "A");
lru.put(2, "B");
console.log(lru.get(1)); // 'A' — 1 is now most recently used
lru.put(3, "C"); // evicts key 2 ('B')
console.log(lru.get(2)); // -1 (not found)
console.log(lru.get(3)); // 'C'
lru.put(4, "D"); // evicts key 1 ('A')
console.log(lru.get(1)); // -1
console.log(lru.get(4)); // 'D'
