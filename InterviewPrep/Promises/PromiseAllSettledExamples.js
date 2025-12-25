//A method that ignores failures and gives you a result of the succeeded promises? That is exactly where the Promise.allSettled method comes in.

Promise.allSettled([Promise.resolve("Wisdom"), Promise.reject("Geek")]).then(
  console.log
);
