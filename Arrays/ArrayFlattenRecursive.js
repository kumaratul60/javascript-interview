// Fast Recursive Flatten
const flattenFast = function (arr, result = []) {
    for (let i = 0, length = arr.length; i < length; i++) {
        const value = arr[i];
        if (Array.isArray(value)) {
            flattenFast(value, result);
        } else {
            result.push(value);
        }
    }
    return result;
};
const arr = [1, [2, 3], [4, [5], [6, [7, 8, 9], 10], 11], [12], 13];
const fastRes = flattenFast(arr);
console.log(fastRes);