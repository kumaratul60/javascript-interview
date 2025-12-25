// function foo() {
//   for (var i = 0; i < 10; i++) {
//     setTimeout(function () {
//       console.log(i);
//     }, 1000);
//   }
// }
//  foo();

// for (var i = 0; i < 5; i++) {
//   // setTimeout(() => console.log(i), 1000*i);
//   setTimeout(() => console.log(i), 1000+i);
// }

// print boom counter

for (let i = 10; i >= 0; i--) {
  setTimeout(function () {
    console.log(i);
  }, (10 - i) * 800)
}


////

function ex() {
  for (var i = 1; i <= 5; i++) {
    setTimeout((function (k) {
      return (() => { console.log(k) })
    })(i), 1000 * i);
  }

}
// ex()


function ex1() {
  for (var i = 1; i <= 5; i++) {
    setTimeout(((k) => {
      return (() => { console.log(k) })
    })(i), 1000 * i);
  }

}
// ex1()


function ex2() {
  for (var i = 1; i <= 5; i++) {
    function inner(j) {
      setTimeout(() => {
        console.log(j)
      }, 1000 * i);
    } inner(i)
  }

}
// ex2()


function ex3() {
  for (var i = 0; i <= 5; i++) {
    const inner = (j) => {
      setTimeout(() => {
        console.log(j)
      }, 1000 * i);

    }
    inner(i)

  }

}
// ex3()

function ex4() {
  for (var i = 1; i <= 5; i++) {
    (function (j) {
      setTimeout(() => {
        console.log(j)
      }, 1000 * i);
    })(i)
  }

}
ex4()
