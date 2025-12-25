// LRU Cache with TTL Support

class Node {
  constructor(key, value, expiry) {
    this.key = key;
    this.value = value;
    this.expiry = expiry;
    this.prev = null;
    this.next = null;
  }
}

class LRUCacheWithTTL {
  constructor(capacity, defaultTTL = 10000) {
    this.capacity = capacity;
    this.defaultTTL = defaultTTL;
    this.cache = new Map();

    this.head = new Node(null, null, null);
    this.tail = new Node(null, null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _now() {
    return Date.now();
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _insertAtFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _isExpired(node) {
    return this._now() > node.expiry;
  }

  _cleanExpired() {
    for (const [key, node] of this.cache) {
      if (this._isExpired(node)) {
        this._remove(node);
        this.cache.delete(key);
      }
    }
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const node = this.cache.get(key);
    if (this._isExpired(node)) {
      this._remove(node);
      this.cache.delete(key);
      return -1;
    }

    this._remove(node);
    this._insertAtFront(node);
    return node.value;
  }

  put(key, value, ttl = this.defaultTTL) {
    const expiry = this._now() + ttl;

    if (this.cache.has(key)) {
      this._remove(this.cache.get(key));
    }

    const node = new Node(key, value, expiry);
    this._insertAtFront(node);
    this.cache.set(key, node);

    this._cleanExpired();

    if (this.cache.size > this.capacity) {
      const lru = this.tail.prev;
      this._remove(lru);
      this.cache.delete(lru.key);
    }
  }

  keys() {
    const keys = [];
    let curr = this.head.next;
    while (curr !== this.tail) {
      if (!this._isExpired(curr)) keys.push(curr.key);
      curr = curr.next;
    }
    return keys;
  }
}


const ttlCache = new LRUCacheWithTTL(3, 5000); // default TTL = 5 seconds

ttlCache.put("x", "X");
ttlCache.put("y", "Y", 2000); // custom TTL 2s
ttlCache.put("z", "Z");

console.log(ttlCache.get("x")); // 'X'

setTimeout(() => {
  console.log(ttlCache.get("y")); // -1 (expired after 2s)
  console.log(ttlCache.get("x")); // still valid
  ttlCache.put("a", "A"); // triggers LRU eviction if over capacity
  console.log(ttlCache.keys()); // current keys in cache
}, 2500);
