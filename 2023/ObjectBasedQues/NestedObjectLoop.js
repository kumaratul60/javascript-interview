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
    },
  ],
};

const obj1 = {
  name: "coder",
  age: 30,
  address: {
    addresslineOne: "something",
    zip: 560001,
  },
  someArray: ["jan", 2, { month: "march" }, [4]],
};

let nestedObject = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
};

const iterate = (obj) => {
  Object.keys(obj).forEach((key) => {
    console.log("key: " + key + ", value: " + obj[key]);

    if (typeof obj[key] === "object") {
      iterate(obj[key]);
    }
  });
};

iterate(myJSONExample);

function iterateViaLoop(nestedObject) {
  for (let key in nestedObject) {
    if (typeof nestedObject[key] === "object") {
      // The value of the property is another object, so you can
      // iterate over its properties as well
      for (let nestedKey in nestedObject[key]) {
        console.log(nestedKey + ":=> " + nestedObject[key][nestedKey]);
      }
    } else {
      // The value of the property is not an object, so you can
      // just print the key and value
      console.log(key + ":=>: " + nestedObject[key]);
    }
  }
}
iterateViaLoop(obj1);

////////////////////////////////////////////////////////////////
// without recursion

function IterateWithoutRecursion(nestedObject) {
  Object.keys(nestedObject).forEach((key) => {
    if (typeof nestedObject[key] === "object") {
      // The value of the property is another object, so you can
      // iterate over its properties as well
      Object.keys(nestedObject[key]).forEach((nestedKey) => {
        console.log(nestedKey + ": " + nestedObject[key][nestedKey]);
      });
    } else {
      // The value of the property is not an object, so you can
      // just print the key and value
      console.log(key + ": " + nestedObject[key]);
    }
  });
}
IterateWithoutRecursion(nestedObject);
