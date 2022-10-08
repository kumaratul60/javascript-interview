function checkEven(n) {
  //   return n % 2 === 0;
  //   return parseInt(n / 2) * 2 === n;
  return n & 1 ? false : true;

  //   5/2 = 2.5
  //  parseInt(5/2) = 2
  //    & ->   ampersand
  //    && -? logical and
}
console.log(checkEven(52));
console.log(checkEven(21));
