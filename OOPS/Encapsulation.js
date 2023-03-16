/**
Encapsulation is the practice of hiding the internal details of an object and providing a public interface for interacting with it. This helps to prevent outside code from directly modifying the internal state of an object, which can lead to bugs and other issues.

*/

function createCounter() {
    let count = 0;
  
    return {
      increment() {
        count++;
      },
  
      decrement() {
        count--;
      },
  
      getCount() {
        return count;
      }
    };
  }
  
  const counter = createCounter();
  console.log(counter.getCount()); // Output: 0
  counter.increment();
  console.log(counter.getCount()); // Output: 1
  counter.decrement();
  console.log(counter.getCount()); // Output: 0