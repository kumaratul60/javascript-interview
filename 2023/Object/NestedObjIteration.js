// nested object loop through

const obj2 = {
  name: "Atul",
  age: 25,
  address: {
    addresslineOne: 9,
    zip: -1,
    state: {
      district: "Brh",
      pargana: "Nampara",
      vill: {
        moza: "Moz",
      },
    },
  },
  someArray: [
    3,
    -1,
    {
      month: 5,
      year: 2023,
    },
    [-1],
    ["test"],
  ],
};

const myJSONExample = {
  squadName: "Super hero squad",
  homeTown: "Metro City",
  formed: 2016,
  secretBase: "Super tower",
  active: true,
  members: [
    {
      name: "Molecule Man",
      age: 29,
      secretIdentity: "Dan Jukes",
      powers: ["Radiation resistance", "Turning tiny", "Radiation blast"],
    },
    {
      name: "Madame Uppercut",
      age: 39,
      pgg: {
        qq: "dd",
      },
      secretIdentity: "Jane Wilson",
      powers: [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes",
      ],
      nestedPower: [
        {
          name: "Madame Uppercut",
          age: 39,
          pgg: {
            qq: "dd",
            pp: {
              pgg: {
                qq: "dd",
                kk: {
                  pgg: {
                    qq: "dd",
                  },
                },
              },
            },
          },
          secretIdentity: "Jane Wilson",
          powers: [
            "Million tonne punch",
            "Damage resistance",
            "Superhuman reflexes",
          ],
        },
      ],
    },
  ],
};

// using Object.entries
function printNestedObjectEntries(obj, indent = "") {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      console.log(`${indent}${key}:`);
      printNestedObjectEntries(value, `${indent}  `);
    } else {
      console.log(`${indent}${key}: ${value}`);
    }
  }
}

printNestedObjectEntries(myJSONExample);

// using hasOwnProperty
function printNestedObjectHasOwnProperty(obj, indent = "") {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === "object" && value !== null) {
        console.log(`${indent}${key}:`);
        printNestedObjectHasOwnProperty(value, `${indent}  `);
      } else {
        console.log(`${indent}${key}: ${value}`);
      }
    }
  }
}

// printNestedObjectHasOwnProperty(obj2);

// without using inbuilt methods
function printNestedObject(obj, indent = "") {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      console.log(`${indent}${key}:`);
      printNestedObject(obj[key], `${indent}  `);
    } else {
      console.log(`${indent}${key}: ${obj[key]}`);
    }
  }
}

// printNestedObject(obj2);

// using copy of nested object

function copyNestedObject(obj) {
  const copiedObj = {};

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      copiedObj[key] = copyNestedObject(obj[key]);
    } else {
      copiedObj[key] = obj[key];
    }
  }

  return copiedObj;
}

const copiedObj2 = copyNestedObject(obj2);
// console.log(copiedObj2);
