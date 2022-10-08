function local() {
  const arr = ["hello", "hi", "biy", "kam"];
  localStorage.setItem("hits", JSON.stringify(arr));
  const store = JSON.parse(localStorage.getItem("hits"));
  console.log(store);
}
local();

// * JSON.stringify: To set array as the value in local storage.
// * JSON.parse: To get an array from local storage.
/*

1. sessionStorage.setItem(Name1, 'Men');
2. sessionStorage.getItem(Name1, 'Men');
3. sessionStorage.setItem('impArray', JSON.stringify(fruitsArray));
4. console.log(JSON.parse(sessionStorage.getItem('impArray')));
5. sessionStorage.clear()
6. sessionStorage.removeItem('Name1');


*/
