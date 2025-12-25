function createCounter() {
  let count = 0;
  return {
    increment: () => {
      count++;
      console.log(`increment by ${count}`);
    },
    decrement: function () {
      count--;
      console.log(`decrement by ${count}`);
    },
    reset: function () {
      count = 0;
      console.log(`counter reset by  ${count}`);
    },
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
counter.decrement();
counter.reset();
