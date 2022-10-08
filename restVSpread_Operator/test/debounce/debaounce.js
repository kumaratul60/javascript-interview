let counter = 0;
const getData = () => {
  // alert(counter + 1);
  console.log("alert", counter++);
};

const debounce = (fun, delay)=> {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fun();
    }, delay);
  };
};

const data = debounce(getData, 1000);
