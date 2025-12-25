Array.prototype.MyForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

const logicAlbums = [
  "Bobby",
  "The Incredible True Story",
  "supermarket",
  "underPressure",
];

// Advance forEach implementation

Array.prototype.AdvForEach = function (callback, currContext) {
  if (typeof callback !== "function") {
    throw new Error("AdvForEach is not a function");
  }
  const length = this.length;

  //using for loop

  // for (let i = 0; i < length; i++) {
  //   if (this.hasOwnProperty(i)) {
  //     callback.call(currContext, this[i], i, this);
  //   }
  // }

  // using while loop
  let i = 0;
  while (i < length) {
    // this.hasOwnProperty(i) -> to avoid extra property if any one added in prototype
    if (this.hasOwnProperty(i)) {
      callback.call(currContext, this[i], i, this);
    }
    i++;
  }
};

logicAlbums.AdvForEach((word) => {
  console.log({ word });
});
