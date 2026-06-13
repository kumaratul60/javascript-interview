/**
 * @fileoverview
 * Custom Event Emitter (Pub/Sub Pattern)
 * A classic senior JavaScript interview question.
 * 
 * Target: Implement a class that allows subscribing to events, 
 * emitting events, and unsubscribing.
 */

class EventEmitter {
  constructor() {
    // Stores event names as keys and arrays of callbacks as values
    this.events = {};
  }

  /**
   * Subscribe to an event
   * @param {string} eventName 
   * @param {Function} callback 
   * @returns {Function} Unsubscribe function (convenience)
   */
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    // Return an unsubscribe function for easier cleanup
    return () => this.off(eventName, callback);
  }

  /**
   * Emit an event (trigger all callbacks)
   * @param {string} eventName 
   * @param  {...any} args 
   */
  emit(eventName, ...args) {
    if (!this.events[eventName]) return;

    this.events[eventName].forEach(callback => {
      callback.apply(this, args);
    });
  }

  /**
   * Unsubscribe from an event
   * @param {string} eventName 
   * @param {Function} callback 
   */
  off(eventName, callback) {
    if (!this.events[eventName]) return;

    this.events[eventName] = this.events[eventName].filter(
      cb => cb !== callback
    );
  }

  /**
   * Subscribe to an event once (removes itself after first trigger)
   * @param {string} eventName 
   * @param {Function} callback 
   */
  once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }

  /**
   * Remove all listeners for an event or all events
   * @param {string} [eventName] 
   */
  removeAll(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }
}

/**
 * 📈 Interview Insights:
 * -----------------------
 * 1. Why use apply/spread? To pass variable arguments to the listener.
 * 2. Why return unsubscribe? In frameworks like React, this makes 
 *    useEffect cleanup trivial.
 * 3. Memory Leaks: Explain that failing to 'off' listeners when a component 
 *    unmounts causes memory leaks (the emitter still holds a reference to the closure).
 * 4. Complexity:
 *    - on/off: O(1) or O(L) where L is listeners count.
 *    - emit: O(L).
 */

// ------------------------------------
// 🧪 Test Cases
// ------------------------------------

const emitter = new EventEmitter();

const greet = (name) => console.log(`Hello, ${name}!`);
const farewell = () => console.log("Goodbye!");

console.log("--- Standard on/emit ---");
emitter.on('greet', greet);
emitter.emit('greet', 'Alice'); // "Hello, Alice!"

console.log("\n--- Once ---");
emitter.once('farewell', farewell);
emitter.emit('farewell'); // "Goodbye!"
emitter.emit('farewell'); // (Nothing happens)

console.log("\n--- Off/Unsubscribe ---");
const unsub = emitter.on('greet', (name) => console.log(`Yo, ${name}`));
emitter.emit('greet', 'Bob'); 
// "Hello, Bob!"
// "Yo, Bob"

unsub(); // Using returned function
emitter.off('greet', greet); // Using explicit off
emitter.emit('greet', 'Charlie'); // (Nothing happens)
