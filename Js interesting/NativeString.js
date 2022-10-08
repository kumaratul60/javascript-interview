// create a native/custom  string method

/**
 String.prototype.myRepeat || function(times){} => it means we verifying what ever functions we writing which all ready present in the sting object are not 

 */

String.prototype.myRepeat =
  String.prototype.myRepeat ||
  function (times) {
    let str = "";
    for (let i = 0; i < times; i++) {
      str += this; // this String("hello")
      //   str += times[i];
      // str += times
    }
    return str;
  };

console.log("hello".myRepeat(3)); // hellohellohello
