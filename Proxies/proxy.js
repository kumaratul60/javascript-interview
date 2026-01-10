/*
Proxy is a javascript object that create custom behavior for basic operations.
You can intercept reads and writes, existing check, function calls, all sort of basic foundational operations.
It's like setting security camera around your object, so you can see and react to everything that's happening to your object.
 */

//usecases
// 1. Intercepts

// const me = { name: 'soumona', age: 12 };
// const myProxy = new Proxy(me, {
//   get(target, prop) {
//     console.log(`Accessing prop: ${prop}`);
//     console.log(`Accessing target: ${JSON.stringify(target)}`);
//     return;
//   },
// });
// console.log(myProxy.age);

const me = { name: 'testName', age: 13 };
const myProxy = new Proxy(me, {
  get(target, prop) {
    console.log(`Accessing Prop: ${prop}`, new Error().stack.split('\n'));

    return target;
  },
});
// console.log(myProxy.age);

function fn1() {
  fn2();
}

function fn2() {
  myProxy.age;
}

fn1();

// we can do with same variable, without creating the new variable

// let sameMe = {};
// // gotch:  it will hole pre ref not new one
// sameMe = new Proxy();

// 2. Protect Props: protecting individual properties

let protectMe = { name: 'protect', password: '**' };
protectMe = new Proxy(protectMe, {
  get(target, prop) {
    if (prop === 'password') {
      throw new Error('Access denied');
    }
    console.log(`Accessing Prop ${prop}`);
    return target[prop];
  },
});

console.log(protectMe.password);

// 3. Senitizing writes
// client side assess ontrol is not be a security, it must be enforce on backend through
let protectSenitize = { name: 'protect', location: 'IN' };
protectMe = new Proxy(protectMe, {
  set(target, prop, value) {
    if (prop === 'location') {
      throw new Error(`You can't override ${prop}`);
    }
    console.log(`Accessing Prop ${prop}`);
    target[prop] = value;
    return true;
  },
});

protectSenitize.location = 'NY';
protectSenitize.name = 'seny';

let protectSenitize1 = { name: 'protect1' };
protectMe = new Proxy(protectMe, {
  set(target, prop, value) {
    if (prop === 'age' && value < 0) {
      throw new Error(`Age should be positive`);
    }
    console.log(`Accessing Prop ${prop}`);
    target[prop] = value;
    return true;
  },
});

protectSenitize1.age = -12;

// 4. auto fall-back

let auto1 = { name: 'trt' };
auto1 = new Proxy(auto1, {
  get(target, prop) {
    return prop in target ? target[prop] : 'Not found';
  },
});
auto1.name;
console.log(auto1.age);

// 5. conditionally read-only, this kind of oject.freeze for not complete object only some properly of objects not all
let user = { name: 'trt' };
user = new Proxy(user, {
  set(target, prop) {
    if (prop === 'password') {
      throw new Error(`You can't modify ${prop}`);
    }
  },
});
user.password = '123';

// 6. visual or dynamic props

let product = {
  price: 123,
  discount: 0.23,
};

product = new Proxy(product, {
  get(target, prop) {
    if (prop === 'finalPrice') {
      return target.price * (1 - target.discount);
    }
    return target[prop];
  },
});
product.finalPrice;
// this is product.finalPrice batter than product.finalPrice()
/* we can add check if property start with is or has treat as boolean , but doing this the debugger will be difficult, so make sure documnet code properly,. keep in mind for nested object it is a performance botttelneck

update with proper example:
get(_,prop){
if(prop.startWith("is")) return computeBoolean()
}

*/

// Reflect API
const proxyUser = new Proxy(user, {
  get(target, prop) {
    console.log(`Intercepted get: ${prop}`);
    // return target[prop]
    return Reflect.get(target, prop);
  },

  set(target, prop, value) {
    console.log(`Intercepted set: ${prop}=${value}`);
    // return target[prop]
    return Reflect.set(target, prop, value);
  },
  // refect has batter error protection compare to target[prop]
});

// 7. validating function call

function greet(prop) {
  return `Hello, ${prop}`;
}
const safeGreet = new Proxy(greet, {
  apply(target, thisArg, args) {
    if (typeof args[0] !== 'string') {
      throw new Error('Expected a string');
    }
    // return Reflect.has(target, propertyKey)
    // return Reflect.apply(target, thisArgument, argumentsList)
    // return Reflect.get(target, propertyKey)
    // return Reflect.set(target, propertyKey, value)
    // return Reflect.ownKeys(target)
    // return Reflect.construct(target, argumentsList)
    return Reflect.apply(target, thisArg, args);
  },
});

safeGreet(); // eror
safeGreet('12'); //
safeGreet([]); // eror
safeGreet(12); // eror

// Warning
//Performance impact when we have 100 of nested objet
//validate your logic (write your tests)
//tooling & debugging
