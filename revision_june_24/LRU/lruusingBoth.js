// Doubly Linked List Node
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    if (capacity <= 0) throw new Error("Capacity must be > 0");

    this.capacity = capacity;
    this.cache = new Map(); // key -> node

    // Dummy head and tail to simplify insert/removal
    this.head = new Node(null, null); // Most recently used
    this.tail = new Node(null, null); // Least recently used
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Removes a node from the doubly linked list
   */
  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  /**
   * Inserts a node right after head (MRU position)
   */
  _insertAtFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  /**
   * Get value for key and mark it as recently used
   */
  get(key) {
    if (!this.cache.has(key)) return -1;

    const node = this.cache.get(key);
    this._remove(node); // O(1)
    this._insertAtFront(node); // O(1)
    return node.value;
  }

  /**
   * Add or update key-value pair in cache
   */
  put(key, value) {
    if (this.cache.has(key)) {
      const existing = this.cache.get(key);
      this._remove(existing); // Remove old position
    }

    const newNode = new Node(key, value);
    this._insertAtFront(newNode);
    this.cache.set(key, newNode);

    if (this.cache.size > this.capacity) {
      // Evict least recently used node
      const lruNode = this.tail.prev;
      this._remove(lruNode);
      this.cache.delete(lruNode.key);
    }
  }

  /**
   * Debug helper: show keys from most to least recently used
   */
  keys() {
    let keys = [];
    let curr = this.head.next;
    while (curr !== this.tail) {
      keys.push(curr.key);
      curr = curr.next;
    }
    return keys;
  }
}


const lru = new LRUCache(3);

lru.put('a', 100);
lru.put('b', 200);
lru.put('c', 300);

console.log(lru.get('a')); // 100 → a is now MRU
lru.put('d', 400);         // Evicts 'b' (least recently used)

console.log(lru.get('b')); // -1 (evicted)
console.log(lru.get('c')); // 300
console.log(lru.get('d')); // 400

lru.put('e', 500);         // Evicts 'a'

console.log(lru.get('a')); // -1 (evicted)
console.log(lru.get('e')); // 500

console.log('Current cache keys (MRU → LRU):', lru.keys());
// Expected: ['e', 'd', 'c']