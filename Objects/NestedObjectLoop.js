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

const iterate = (obj) => {
  Object.keys(obj).forEach((key) => {
    console.log("key: " + key + ", value: " + obj[key]);

    if (typeof obj[key] === "object") {
      iterate(obj[key]);
    }
  });
};

iterate(myJSONExample);
