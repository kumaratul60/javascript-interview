// Native String Method: Repeat
String.prototype.myRepeat =
  String.prototype.myRepeat ||
  function (times) {
    let str = "";
    for (let i = 0; i < times; i++) {
      str += this;
    }
    return str;
  };
console.log("hello".myRepeat(3)); // hellohellohello