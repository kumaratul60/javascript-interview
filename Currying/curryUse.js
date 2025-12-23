function printTotal(sign) {
  return function (amount) {
    return `${sign} ${amount}`;
  };
}

const usTotal = printTotal('$');
console.log(usTotal(2));
console.log(usTotal(21));
console.log(usTotal(22));

const ukTotal = printTotal('£');
console.log(ukTotal(2));
console.log(ukTotal(21));
console.log(ukTotal(22));

const inTotal = printTotal('₹');
console.log(inTotal(2));
console.log(inTotal(21));
console.log(inTotal(22));
