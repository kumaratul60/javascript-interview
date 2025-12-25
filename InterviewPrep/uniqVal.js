const my_array = [1,2,2,3,3,4,5,5]
const unique_array = [...new Set(my_array)]
console.log(unique_array) //[1,2,3,4,5]