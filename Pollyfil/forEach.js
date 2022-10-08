Array.prototype.MyForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

var logicAlbums = [
  "Bobby",
  "The Incredible True Story",
  "supermarket",
  "underPressure",
];

logicAlbums.MyForEach((word) => {
  console.log(word);
});
