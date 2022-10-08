var string = "app on ward char";

function res() {
  const arr = string.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  const f = arr.join(" ");
  console.log(f);
}
res();
