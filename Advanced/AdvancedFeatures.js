// Advanced JavaScript Topics

// Proxies
const handler = {
  get: function(target, property) {
    console.log(`Accessing property: ${property}`);
    return target[property];
  },
  set: function(target, property, value) {
    console.log(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const target = {};
const proxy = new Proxy(target, handler);
proxy.name = 'John'; // Logs: Setting property: name to John
console.log(proxy.name); // Logs: Accessing property: name

// WeakMap
const weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, 'value');
console.log(weakMap.get(obj)); // 'value'
obj = null; // obj is garbage collected, WeakMap entry is removed

// WeakSet
const weakSet = new WeakSet();
let obj2 = {};
weakSet.add(obj2);
console.log(weakSet.has(obj2)); // true
obj2 = null; // obj2 is garbage collected

// Intl API
const number = 123456.789;
console.log(new Intl.NumberFormat('en-US').format(number)); // 123,456.789
console.log(new Intl.NumberFormat('de-DE').format(number)); // 123.456,789

const date = new Date();
console.log(new Intl.DateTimeFormat('en-US').format(date));
console.log(new Intl.DateTimeFormat('ja-JP').format(date));

// Reflect API
const obj3 = { name: 'Alice' };
console.log(Reflect.has(obj3, 'name')); // true
Reflect.set(obj3, 'age', 30);
console.log(Reflect.get(obj3, 'age')); // 30

// BigInt
const bigInt = 123456789012345678901234567890n;
console.log(bigInt + 1n);

// Optional Chaining and Nullish Coalescing
const obj4 = { user: { name: 'Bob' } };
console.log(obj4?.user?.name ?? 'Anonymous');