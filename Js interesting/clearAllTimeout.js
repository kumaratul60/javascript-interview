const clearAll = () => {
  let arr = [];
  arr.push(
    setTimeout(() => {
      console.log("A");
    }, 100)
  );
  arr.push(
    setTimeout(() => {
      console.log("b");
    }, 300)
  );
  arr.push(
    setTimeout(() => {
      console.log("c");
    }, 200)
  );
  for (let i = 0; i < arr.length; i++) clearTimeout(arr[i]);
};
clearAll();
