// find the difference between current and next prime number?

// checking the number is prime or not
const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;

  let sqrtNum = Math.floor(Math.sqrt(num));
  let prime = num !== 1;
  for (let i = 2; i < sqrtNum + 1; i++) {
    if (num % i === 0) {
      prime = false;
      break;
    }
  }
  return prime;
};

// checking next prime number
const nextPrime = (num) => {
  if (num <= 1) return 2;
  while (!isPrime(++num)) {}
  return num;
};

// finding the difference between current number and next prime number
const num = 3;
console.log("current number is: ", num);
console.log("current number is prime: ", isPrime(num));
const res = nextPrime(num);
console.log("next prime number of current number is: ", res);
console.log("next prime number of current number is prime: ", isPrime(res));

const diff = res - num;
console.log(
  "difference between current prime number and next prime number is: ",
  diff
);
console.log(
  `difference between current prime number and next prime number is prime: ${isPrime(
    diff
  )}`
);
