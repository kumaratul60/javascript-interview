// WAP that prints all the numbers from  1 to 100. For multiple of 3 , inatead of number, print "Fizz", for multiple of 5  print "Buzz". For numbers which are  multiple of both 3 and 5, print "FizzBuzz".

function sol() {
  for (let i = 1; i <= 100; i++) {
    const res =
      //   i % 3 === 0 && i % 5 === 0
      i % 15 === 0
        ? "FizzBuzz"
        : i % 3 === 0
        ? "Fizz"
        : i % 5 === 0
        ? "Buzz"
        : i;
    console.log(res);
    // return res;
  }
}
sol();
const output = sol();
// console.log(output);
