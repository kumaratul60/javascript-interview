const throttle = (fun, delay) => {
  let last = 0;
  return (...arg) => {
    const now = new Date().getTime();
    if (now - last < delay) {
      return;
    }
    last = now;
    return fun(...arg);
  };
};

document.getElementById("myId").addEventListener(
  "click",
  throttle(() => {
    console.log("clicked me");
  }, 3000)
);
