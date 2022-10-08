const debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

document.getElementById("myId").addEventListener(
  "click",
  debounce((e) => {
    console.log("clicked");
  }, 2000)
);

// document.getElementById("myId").addEventListener("click", () => {
//   console.log("clicked");
// });
