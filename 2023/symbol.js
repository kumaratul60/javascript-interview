/**

Symbol is a built-in object whose constructor returns a Symbol

Symbols are primitive data types introduced in ES6.

*/

// Different ways to create symbols:

const SYM = Symbol(); // WAY 1

const SYM2 = Symbol("ID"); // WAY 2 => by passing a description

const SYM3 = Symbol.for("mySecret"); // Way 3 => By using a key (in this way "

// JS return symbol if exists, otherwise it creates a Symbol for key `mySecret

/**
We can’t call Symbol using new keyword, because Symbols are primitive data type. And if we try to call Symbol using new we will get an error:
*/
// const SYMErrCall = new Symbol(); // Not Allowed
// Error
// Uncaught TypeError: Symbol is not a constructor

// call symbol
const symCall = Symbol("mySymbolDescription");
const symCall2 = Symbol("Atul");

console.log(symCall2.description); // "mySymbolDescription",Atul

/***
The sole purpose of Symbol is to create unique values. To understand, you can consider it a function which generates unique id on each call.

No two symbols can be same ever.
*/

console.log(Symbol() == Symbol()); // false
console.log(Symbol() === Symbol()); // false

console.log(Symbol("JS") == Symbol("JS")); // false
console.log(Symbol("JS") === Symbol("JS")); // false

/**
 Symbols can be used to create properties on objects that are not enumerable. This means they won’t show up in for...in loops or when using Object.keys.
 */

const SYMObj = Symbol.for("SYMKey");
const obj = {
    [SYMObj]: "value",
    normalKey: "visible",
};

for (let key in obj) {
    console.log(key); // Only 'normalKey' is printed
}

/**
Symbols can be used to customize the JSON serialization process for objects. You can define a method with the symbol Symbol.toPrimitive to specify how an object should be converted to a primitive value during JSON serialization.

*/

const customObject = {
    [Symbol.toPrimitive](hint) {
        if (hint === "number") {
            return 42;
        }
        if (hint === "string") {
            return "customObject";
        }
        return null;
    },
};

console.log(Number(customObject)); // 42
console.log(String(customObject)); // "customObject"


/**
Not practically used

/ In one file or scope
const globalSym = Symbol.for("sharedSymbol");

// In another file or scope (can even be in a different realm)
const sameGlobalSym = Symbol.for("sharedSymbol");

console.log(globalSym === sameGlobalSym); // true

console.log(Symbol.keyFor(globalSym)); // "sharedSymbol"
console.log(Symbol.keyFor(sameGlobalSym)); // "sharedSymbol"

*/