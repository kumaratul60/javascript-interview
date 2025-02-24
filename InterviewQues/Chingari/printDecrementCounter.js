// BoomCounter

for (let i = 10; i >= 0; i--) {
  setTimeout(function () {
    console.log(i);
  }, (10 - i) * 800);
}

//find the bug:

// 1.
// for (var i = 0; i < 5; i++) {
//     setTimeout(function () {
//         console.log(i);
//     }, i * 1000);
// }

// 2.
// function b(){
//     for (let j = 0, j <= 10, j++){
//         setTimeout(() => {
//             console.log(j);
//         }, j * 10);
//     }
// }
// b();

function b() {
  for (let j = 10; j > 0; j--) {
    setTimeout(() => {
      console.log(j);
    }, (10 - j) * 1000);
  }

  setTimeout(() => {
    console.log("BOOM");
  }, 10 * 1000);
}

b();

//efficient way

function b() {
  let j = 10;
  let interval = setInterval(() => {
    if (j > 0) {
      console.log(j);
      j--;
    } else {
      console.log("BOOM");
      clearInterval(interval); // Stop the interval when countdown finishes
    }
  }, 1000);
}

b();
