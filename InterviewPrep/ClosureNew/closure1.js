function outerFunc1() {
  let outerVar = "I am outsider!";
  function innerFunc() {
    console.log(outerVar); // => logs "I am outside!"
  }
  innerFunc();
}
outerFunc1();

//
function outerFunc() {
  let outerVar = "I am outside1!";
  function innerFunc() {
    console.log(outerVar); // => logs "I am outside!"
  }
  return innerFunc;
}
function exec() {
  const myInnerFunc = outerFunc();
  myInnerFunc();
}
exec();
