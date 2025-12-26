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

const debounce1 = (func, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args), delay;
    });
  };
};

const debounce2 = (func, delay) => {
  let timerId;
  return (...args) => {
    // if (timerId) {
    //   clearTimeout(timerId);
    // }
    clearTimeout(timerId);
    timerId = setTimeout(() => func(...args), delay);
  };
};

//debounce2 is correct. debounce1 is broken.

document.getElementById('myId').addEventListener(
  'click',
  debounce((e) => {
    console.log('clicked');
  }, 2000)
);

// document.getElementById("myId").addEventListener("click", () => {
//   console.log("clicked");
// });
