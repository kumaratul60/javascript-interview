function x() {
  for (let i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, 3000);
  }
  console.log("hello");
}
// x();

function y() {
  for (var j = 0; j < 5; j++) {
    function close(k) {
      setTimeout(function () {
        console.log(k);
      }, k * 1000);
    }
    close(j); // using close() as closure creting a new copy of k, everytime when setTime() called
  }
  console.log(j, "varh");
}
y();



/*
const arr = [1, 22, 11, 5];
function x() {
  arr.forEach((element) => {
    setTimeout(function () {
      console.log(element);
    },1000);
  });
}
x();

*/