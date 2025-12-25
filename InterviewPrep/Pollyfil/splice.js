const fakeSplice = function (start, deleteCount, ...items) {
  let newArray = [];

  // if we only provide start fakeSplice(start)
  if (!deleteCount) {
    for (let i = 0; i < this.length; i++) {
      if (i < start) {
        newArray.push(this[i]);
      }
    }
    this.length = 0;
    this.push.apply(this, newArray);
    return;
  }

  // if we only provide start and deleteCount fakeSplice(start, deleteCount)
  if (!items) {
    for (let i = 0; i < this.length; i++) {
      if (i < start || i >= start + deleteCount) {
        newArray.push(this[i]);
      }
    }

    this.length = 0;
    this.push.apply(this, newArray);
    return;
  }

  // if we provide all arguments to the function
  for (let i = 0; i < this.length; i++) {
    if (i === start + deleteCount) {
      newArray = [...newArray, ...items];
    }
    if (i < start || i >= start + deleteCount) {
      newArray.push(this[i]);
    }
  }

  this.length = 0;
  this.push.apply(this, newArray);
  return;
};

Array.prototype.fakeSplice = fakeSplice;

const planets = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];
planets.fakeSplice(2, 2, "Pluto");
console.log(planets); // output ["Mercury", "Venus", "Pluto", "Jupiter",
