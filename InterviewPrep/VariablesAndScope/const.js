/*
Keyword	Function vs Block-scope	Redefinable?

var	    function-scope  	✅
let	    block-scope     	✅
const	block-scope     	🚫




*/

const myBoolean = true;

if (myBoolean) {
  const turtles = ["leonardo", "donatello", "michaelangelo", "raphael"];
  // turtles = turtles.concat('Shredder');  // 🙅‍♀️ this would throw an error

  console.log(turtles);
}

console.log(turtles);
