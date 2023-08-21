
// BoomCounter

for (let i = 10; i >= 0; i--) {
    setTimeout(function () {
        console.log(i);
    }, (10 - i) * 800)
}

// IFFY ES5 way

(function () {
    for (var i = 10; i >= 0; i--) {
      (function (count) {
        setTimeout(function () {
          console.log(count);
        },(10-i)* 1000);
      })(i);
    }
  })();