const promising = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res("hay");
    }, 0);
    rej("oops");
  });

promising()
  .then(
    (err) => {
      console.log("caught", err);
    },
    (res1) => {
      console.log("res", res1);
    }
  )
  .finally(() => {
    console.log("settled");
  });
