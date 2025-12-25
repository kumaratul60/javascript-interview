/* A pure function is a function which:
* Given the same input, always returns the same output.
* Produces no side effects.

Function: A function is a process which takes some input, called arguments, and produces some output called a return value

Function composition: It is the process of combining two or more functions to produce a new function. Composing functions together is like snapping together a series of pipes for our data to flow through.


*/

// Function composition

const toSlug = (input) =>
  encodeURIComponent(
    input
      .split(" ")
      .map((str) => str.toLowerCase())
      .join("-")
  );

console.log(toSlug("JS Cheerleader")); // 'js-cheerleader'

// composable forms of common utilities like `split()`, `join()` and `map()`. Here are the implementations:
const curry =
  (fn) =>
  (...args) =>
    fn.bind(null, ...args);

const map = curry((fn, arr) => arr.map(fn));

const join = curry((str, arr) => arr.join(str));

const toLowerCase = (str) => str.toLowerCase();

const split = curry((splitOn, str) => str.split(splitOn));

const toSlugNew = (input) =>
  encodeURIComponent(join("-")(map(toLowerCase)(split(" ")(input))));

console.log(
  toSlugNew("JS Cheerleader using self composition creation function ")
); // 'js-cheerleader'

///////////////////
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);

const toSlugCompose = compose(
  encodeURIComponent,
  join("-"),
  map(toLowerCase),
  split(" ")
);

console.log(
  toSlugCompose("JS Cheerleader using self composing compose function")
); // 'js-cheerleader'

////////////////////////////////////////////////////////////////
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

const fn1 = (s) => s.toLowerCase();
const fn2 = (s) => s.split("").reverse().join("");
const fn3 = (s) => s + "!";

const newFunc = pipe(fn1, fn2, fn3);
const result = newFunc("Time"); // emit!
console.log({ result });
////////////////////////////////

const toSlugPipe = pipe(
  split(" "),
  map(toLowerCase),
  join("-"),
  encodeURIComponent
);

console.log(toSlugPipe("JS Cheerleader")); // 'js-cheerleader'

/// curry

const trace = curry((label, x) => {
  console.log(`== ${label}:  ${x}`);
  return x;
});

const toSlugCurry = pipe(
  trace("input"),
  split(" "),
  map(toLowerCase),
  trace("after map"),
  join("-"),
  encodeURIComponent
);

console.log(toSlugCurry("JS Cheerleader"));
// '== input:  JS Cheerleader'
// '== after map:  js,cheerleader'
// 'js-cheerleader'

////////////////////////////////////////////////////////////////
const tap = curry((fn, x) => {
  fn(x);
  return x;
});

const traceTap = (label) => {
  return tap((x) => console.log(`== ${label}:  ${x}`));
};
console.log(traceTap());

////////////////////////////////////////////////////////////////

// With shared state, the order in which function calls are made
// changes the result of the function calls.
const p = {
  val: 2,
};

const p1 = () => (p.val += 1);

const p2 = () => (p.val *= 2);

p1();
p2();

console.log(p.val); // 6

// This example is exactly equivalent to the above, except...
const q = {
  val: 2,
};

const q1 = () => (q.val += 1);

const q2 = () => (q.val *= 2);

// ...the order of the function calls is reversed...
q2();
q1();

// ... which changes the resulting value:
console.log(q.val); // 5

//////////////////////

const x = {
  val: 2,
};

const x1 = (x) => Object.assign({}, x, { val: x.val + 1 });

const x2 = (x) => Object.assign({}, x, { val: x.val * 2 });

console.log(x1(x2(x)).val); // 5

const y = {
  val: 2,
};

// Since there are no dependencies on outside variables,
// we don't need different functions to operate on different
// variables.

// this space intentionally left blank

// Because the functions don't mutate, you can call these
// functions as many times as you want, in any order,
// without changing the result of other function calls.
x2(y);
x1(y);

console.log(x1(x2(y)).val); // 5
////////////////////////////////////////////////////////////////

const a = Object.freeze({
  foo: { greeting: "Hello" },
  bar: "world",
  baz: "!",
});

a.foo.greeting = "Goodbye";

console.log(`${a.foo.greeting}, ${a.bar}${a.baz}`); //Goodbye, world!
