var counter = 0;
const getData = () => {
  //  calls an API and get Data

  console.log("fetching data-call", counter++);
};

//  When we type something the event fired and from this it will consume a lot of browser memory when data calling from API so this will reduce the performance of web-app, so to fix that problem and improve the performance the web-app we used debouncing.

//  make a debounce function and it will do some magic over getData() and don't make call agin-2 on each and every key stroke rather it should only call when user is paused while typing.
//  to create debounce function debounce keyword is not necessary.

const doSomeMagic = (fun, delay) => {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fun(context, args);
    }, delay);
  };
};

const magic = doSomeMagic(getData, 300);
// const magic = doSomeConst(getData, 300);

//  doSomeMagic() is more optimized than doSomeConst()

const doSomeConst = (fun, delay) => {
  let timer = 0;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fun(...args);
    }, delay);
  };
};

// const magic = doSomeConst(getData, 300);

function debounce(func, delay) {
  let timer;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
}

// const magic = debounce(getData, 300);

// here call getData() when difference of time between two keypress event > 300 milliseconds
