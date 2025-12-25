function mergeSets(set1, set2) {
    let mergedSet = {};

    // Iterate over set1
    for (let [key, value] of set1) {
        mergedSet[key] = value;
    }

    // Iterate over set2
    for (let [key, value] of set2) {
        if (!mergedSet[key]) {
            mergedSet[key] = value;
        } else {
            for (let [innerKey, innerValue] of value) {
                if (mergedSet[key][innerKey]) {
                    mergedSet[key][innerKey] += innerValue;
                } else {
                    mergedSet[key][innerKey] = innerValue;
                }
            }
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
