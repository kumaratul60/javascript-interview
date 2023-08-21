console.log("a");
setTimeout(() => console.log("set"), 0);
Promise.resolve(() => console.log("pro")).then((res) => res());
console.log("b");

// Microtask queue & Priority queue has higher priority than the task queue

// a
// b
// pro
// set
 