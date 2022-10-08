document.querySelector("#grandParent").addEventListener(
  "click",
  () => {
    console.log("GrandParent clicked!");
  },
  false
);
document.querySelector("#parent").addEventListener(
  "click",
  (e) => {
    console.log("Parent clicked!");
    e.stopPropagation();
  },
  false
);
document.querySelector("#child").addEventListener(
  "click",
  (e) => {
    console.log("Child clicked!");
    e.stopPropagation();
  }
  //   false
);

//  if we add or remove flase then still it perform same behaviour in all but  if we put true insteed of false then its behave like event capturing
