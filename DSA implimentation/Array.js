// Using the Array constructor
const numbers = new Array(1, 2, 3, 4, 5);

// Using the array literal syntax
const colors = ['red', 'green', 'blue'];
// Accessing elements
console.log(colors[0]);  // Output: 'red'
console.log(colors[1]);  // Output: 'green'

// Modifying elements
colors[2] = 'orange';
console.log(colors[2]);  // Output: 'orange'

// Adding elements
colors.push('purple');
console.log(colors);  // Output: ['red', 'green', 'orange', 'purple']