//  check array is empty,null,undefined

const isEmpty = function (data) {
    if (typeof (data) === 'object') {
        if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') {
            return true;
        } else if (!data) {
            return true;
        }
        return false;
    } else if (typeof (data) === 'string') {
        if (!data.trim()) {
            return true;
        }
        return false;
    } else if (typeof (data) === 'undefined') {
        return true;
    } else {
        return false;
    }
}

console.log(isEmpty()); // true
console.log(isEmpty(null)); // true
console.log(isEmpty('')); // true
console.log(isEmpty('  ')); // true
console.log(isEmpty(undefined)); // true
console.log(isEmpty({})); // true
console.log(isEmpty([])); // true
console.log(isEmpty(0)); // false
console.log(isEmpty('Hey')); // false


// check object

function checkProperties(obj) {
    for (let key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return false;
    }
    return true;
}

const obj = {
    x: null,
    y: "",
    z: 1
}

console.log(checkProperties(obj)) //returns false

