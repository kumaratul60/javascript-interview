// lexical scope -> in this scope the nested fuction or child fuction has access to parent scope variable

function add() {
  let a = 4;

  function addChild() {
    console.log(a + 5);
  }
  addChild();
}
add();
