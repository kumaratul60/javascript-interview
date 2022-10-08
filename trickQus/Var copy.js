// var a ={b: 10};
// a.b = 12;
// console.log(a);

const x = () => {
  for (var i = 1; i <= 5; i++) {
    setTimeout(function () {
      console.log(i);
    });
  }
};
x();
const y = () => {
  for (let i = 1; i <= 5; i++) {
    setTimeout(function () {
      console.log(i);
    });
  }
};
y();

const z = () => {
  for (var k = 1; k <= 5; k++) {
    function close(k) {
      setTimeout(function () {
        console.log(k);
      });
      close(k);
    }
  }
};
// z();
