/**
 * @fileoverview
 * LRU (Least Recently Used) Cache implementation.
 * (LeetCode Hard: 146. LRU Cache)
 * 
 * Target: O(1) for both get(key) and put(key, value).
 */

/**
 * Doubly Linked List Node
 */
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

/**
 * LRU Cache Class
 * 
 * Data Structure Choice:
 * 1. Hash Map (Map): Provides O(1) access to any node given its key.
 * 2. Doubly Linked List (DLL): Provides O(1) removal and insertion of nodes 
 *    at any position (once the node is found).
 * 
 * Why not just an Object/Map? 
 * Objects/Maps don't maintain a "least recently used" order efficiently.
 * While JS Map maintains insertion order, moving an item to the "end" (most recent)
 * requires deleting and re-inserting, which is O(1) but DLL is the classic interview answer.
 */
class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // Key -> Node

    // Dummy head and tail to simplify DLL operations (avoids null checks)
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Remove node from its current position in DLL
   * @param {Node} node
   */
  _remove(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  }

  /**
   * Insert node at the front (right after dummy head)
   * Front represents "Most Recently Used"
   * @param {Node} node
   */
  _insert(node) {
    const next = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    node.next = next;
    next.prev = node;
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      this._remove(node);
      this._insert(node);
      return node.value;
    }
    return -1;
  }

  /**
   * @param {number} key
   * @param {number} value
   */
  put(key, value) {
    if (this.map.has(key)) {
      // Update existing node
      const node = this.map.get(key);
      node.value = value;
      this._remove(node);
      this._insert(node);
    } else {
      // Create new node
      const newNode = new Node(key, value);
      this.map.set(key, newNode);
      this._insert(newNode);

      // Check capacity
      if (this.map.size > this.capacity) {
        // Remove Least Recently Used (node before dummy tail)
        const lruNode = this.tail.prev;
        this._remove(lruNode);
        this.map.delete(lruNode.key);
      }
    }
  }
}

/**
 * 📈 Complexity Analysis:
 * -----------------------
 * Time Complexity:
 * - get(key): O(1) - Map lookup + DLL move.
 * - put(key, value): O(1) - Map lookup/insert + DLL move/remove.
 * 
 * Space Complexity:
 * - O(Capacity) - Storing at most 'capacity' nodes in Map and DLL.
 * 
 * 💡 Optimization Note:
 * In modern JavaScript, `Map` actually maintains insertion order.
 * You can implement LRU using just a `Map` by deleting and re-setting keys.
 * However, the DLL + Map approach is the expected "Computer Science" answer 
 * in interviews as it is language-agnostic.
 */

// ------------------------------------
// 🧪 Test Cases
// ------------------------------------

const lru = new LRUCache(2);
lru.put(1, 1); // cache: {1:1}
lru.put(2, 2); // cache: {1:1, 2:2}
console.log(lru.get(1)); // returns 1, cache: {2:2, 1:1}
lru.put(3, 3); // evicts key 2, cache: {1:1, 3:3}
console.log(lru.get(2)); // returns -1 (not found)
lru.put(4, 4); // evicts key 1, cache: {3:3, 4:4}
console.log(lru.get(1)); // returns -1 (not found)
console.log(lru.get(3)); // returns 3
console.log(lru.get(4)); // returns 4
