const clickMe = () => {
  console.log("button clicked");
};

const throttle = (fn, delay) => {
  return function () {
    document.getElementById("myId").disabled = true;
    setTimeout(() => {
      fn();
    }, delay);
  };
};

const myThrottle = throttle(() => {
  document.getElementById("myId").disabled = false;
  clickMe();
}, 2000);
