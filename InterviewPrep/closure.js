// Closures -> A fuction bind together with its lexical scope forms a closure.

function add() {
  let a = 4;
  function addChild() {
    console.log(a + 5);
  }
  return addChild;
}

let catchAdd = add();

console.log(catchAdd);
catchAdd();

var globalVar = "xyz";

(function outerFunc(outerArg) {
  var outerVar = "a";

  (function innerFunc(innerArg) {
    var innerVar = "b";

    console.log(
      "outerArg = " +
        outerArg +
        "\n" +
        "innerArg = " +
        innerArg +
        "\n" +
        "outerVar = " +
        outerVar +
        "\n" +
        "innerVar = " +
        innerVar +
        "\n" +
        "globalVar = " +
        globalVar
    );
  })(456);
})(123);
