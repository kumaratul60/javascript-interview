const obj = [
    { key: "Sample1", data: "data1" },
    { key: "Sample2", data: "data2" },
    { key: "Sample1", data: "data1" },
    { key: "Sample3", data: "data3" },
    { key: "Sample4", data: "data4" },
    { key: "Sample1", data: "data1" },
    { key: "Sample5", data: "data5" },
    { key: "Sample6", data: "data6" },
    { key: "Sample1", data: "data1" },
    { key: "Sample7", data: "data7" },
    { key: "Sample3", data: "data3" },
    { key: "Sample8", data: "data8" },
    { key: "Sample9", data: "data9" },
    { key: "Sample2", data: "data2" },
    { key: "Sample10", data: "data10" }
];

// M1
const outputM1 = {};
obj.forEach(item => {
    if (outputM1[item.key]) {
        // key is available
        outputM1[item.key].push(item);
    } else {
        outputM1[item.key] = [item];
    }
});

//  obj.forEach(item => {
//     (outputM1[item.key] ??= []).push(item);
// });

// console.log(outputM1);


// M2
const outputM2 = obj.reduce((acc, item) => {
    if (!acc[item.key]) {
        acc[item.key] = [];
    }
    acc[item.key].push(item);
    return acc;
}, {});

// console.log(outputM2);

// M3  using reusable function
function groupBy(array, key) {
    return array.reduce((acc, item) => {
        const groupKey = item[key];
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
    }, {});
}

const groupedByKey = groupBy(obj, 'key');
console.log(groupedByKey);

const groupedByData = groupBy(obj, 'data');
console.log(groupedByData);


