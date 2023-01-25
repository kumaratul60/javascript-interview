/*
Problem:

We have two sets of key/value pairs where the key is of string type and the value is another set of key/value pairs where the key is of string type and the value is of number type.

The problem is to do a merge of the two sets.

Notation:

Set: {<member>, <another-member>}
Key/Value Pair: (<key>, <value>)
String: "<value>"
Number: <1234567890>

Example 1:

Set 1: {("a", {("x", 1), ("y", 2)}),
        ("b", {("y", 1), ("z", 1)})}

Set 2: {("a", {("y", 1), ("z", 2)})}

Merge: {("a", {("x", 1), ("y", 3), ("z", 2)}),
        ("b", {("y", 1), ("z", 1)})}

Example 2:

Set 1: {("a", {("x", 1), ("y", 2)}),
        ("b", {("y", 1), ("z", 1)})}

Set 2: {("a", {("y", 1), ("z", 2)}),
        ("c", {("y", 1), ("z", 1)})}

Merge: {("a", {("x", 1), ("y", 3), ("z", 2)}),
        ("b", {("y", 1), ("z", 1)}),
        ("c", {("y", 1), ("z", 1)})}

Example 3:

Set 1: {("a", {("x", 1), ("y", 2)}),
        ("b", {("y", 1), ("z", 1)})}

Set 2: {("a", {("y", 1), ("z", 2)}),
        ("b", {("x", 1), ("z", 1)})}

Merge: {("a", {("x", 1), ("y", 3), ("z", 2)}),
        ("b", {("x", 1), ("y", 1), ("z", 2)})}

---


*/

// brute force approach
function mergeSets(set1, set2) {
    let mergedSet = new Map();

    for (let [key, value] of set1) {
        if (mergedSet.has(key)) {
            let innerMap = mergedSet.get(key);
            for (let [innerKey, innerValue] of value) {
                if (innerMap.has(innerKey)) {
                    innerMap.set(innerKey, innerMap.get(innerKey) + innerValue);
                } else {
                    innerMap.set(innerKey, innerValue);
                }
            }
        } else {
            mergedSet.set(key, value);
        }
    }

    for (let [key, value] of set2) {
        if (mergedSet.has(key)) {
            let innerMap = mergedSet.get(key);
            for (let [innerKey, innerValue] of value) {
                if (innerMap.has(innerKey)) {
                    innerMap.set(innerKey, innerMap.get(innerKey) + innerValue);
                } else {
                    innerMap.set(innerKey, innerValue);
                }
            }
        } else {
            mergedSet.set(key, value);
        }
    }

    return mergedSet;
}

let set1 = new Map();
set1.set("a", new Map([["x", 1], ["y", 2]]));
set1.set("b", new Map([["y", 1], ["z", 1]]));

let set2 = new Map();
set2.set("a", new Map([["y", 1], ["z", 2]]));

console.log(mergeSets(set1, set2));
// Output: Map { "a" => Map { "x" => 1, "y" => 3, "z" => 2 }, "b" => Map { "y" => 1, "z" => 1 } }

set2.set("c", new Map([["y", 1], ["z", 1]]));
console.log(mergeSets(set1, set2));
// Output: Map { "a" => Map { "x" => 1, "y" => 3, "z" => 2 }, "b" => Map { "y" => 1, "z" => 1 }, "c" => Map { "y" => 1, "z" => 1 } }

set2.set("b", new Map([["x", 1], ["z", 1]]));
console.log(mergeSets(set1, set2));
// Output: Map { "a" => Map { "x


/**
Time Complexity: O(m + n) where m is the number of key/value pairs in set1 and n is the number of key/value pairs in set2

space complexity: O(m + n) as we are storing the merged set in a Map object, which has a size that is proportional to the number of key/value pairs in the sets.

*/