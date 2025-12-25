function add(a, b, ...restExample) {
  console.log(restExample); //5, 6, 7, 8, 9
}
//  list of item converted into array
// rest parameter must be a last form of parameter
add(3, 4, 5, 6, 7, 8, 9);

let spreadExample = [9, 6, 9, 10, 11, 12, 13, 14];
console.log(Math.min(spreadExample)); //NaN

// converting an array into list of items
console.log(Math.min(...spreadExample)); //6

//  Rest parameter must be a last form of parameter , it is a called function
//  Spred parameter must be a first form of parameter, it is a calling function
