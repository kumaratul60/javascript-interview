//  Remove all null and undefined from am object
// using filter method
const obj = {
    a: 1,
    b: null,
    c: undefined,
    d: "My code",
    e: null
};
console.log(obj);
const cleanObj = Object.fromEntries(Object.entries(obj).filter(([_, val]) => val != null))
console.log(cleanObj);

//
// ✅ Remove all `null` and `undefined` values from a nested object
const obj1 = {
    one: null,
    two: 2,
    three: {
        four: 4,
        five: null,
        six: undefined,
    },
};

function removeNull(data) {
    return Object.fromEntries(
        Object.entries(data)
            .filter(([_, value]) => value != null)
            .map(([key, value]) => [
                key,
                value === Object(value) ? removeNull(value) : value,
            ]),
    );
}

const result = removeNull(obj1);

// 👇️ { two: 2, three: { four: 4 } }
console.log(result);

// using reduce method
const obj2 = {
    one: null,
    two: 2,
    three: null,
    four: null,
    five: 5,
    six: undefined,
};

const newObj = Object.keys(obj2).reduce((accumulator, key) => {
    if (obj2[key] != null) {
        accumulator[key] = obj2[key];
    }

    return accumulator;
}, {});

// 👇️ { two: 2, five: 5 }
console.log(newObj);

// using for loop

const obj3 = {
    one: null,
    two: 2,
    three: null,
    four: undefined,
};

for (const key in obj3) {
    if (obj3[key] == null) {
        delete obj3[key];
    }
}

console.log(obj3); // 👉️ {two: 2}