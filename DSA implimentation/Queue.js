// Queue constructor
function Queue() {
    this.items = [];
  
    // Methods to enqueue and dequeue elements
    this.enqueue = function(item) {
      this.items.push(item);
    };
    this.dequeue = function() {
      if (this.items.length) {
        return this.items.shift();
      }
      return null;
    };
  }
  
  // Creating a queue and enqueueing some elements
  const queue = new Queue();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  
  // Dequeueing an element
  const dequeued = queue.dequeue();
  console.log(dequeued);  // Output: 1
  console.log(queue.items);  // Output: [2, 3]