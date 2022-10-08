document.querySelector("#grandParent").addEventListener(
  "click",
  (e) => {
    console.log("GrandParent clicked!");
    e.stopPropagation();
  },
  true
);
document.querySelector("#parent").addEventListener(
  "click",
  (e) => {
    console.log("Parent clicked!");
    // e.stopPropagation();
  },
  true
);
document.querySelector("#child").addEventListener(
  "click",
  () => {
    console.log("Child clicked!");
  },
  true
);
