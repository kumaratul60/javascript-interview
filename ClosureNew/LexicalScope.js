const myGlobal = 0;
function func() {
  const myVar = 1;
  console.log(myGlobal); // logs "0"
  function innerOfFunc() {
    const myInnerVar = 2;
    console.log(myVar, myGlobal); // logs "1 0"
    function innerOfInnerOfFunc() {
      console.log(myInnerVar, myVar, myGlobal); // logs "2 1 0"
    }
    innerOfInnerOfFunc();
  }
  innerOfFunc();
}
func();

/*
The lexical scope of innerOfInnerOfFunc() consits of scopes of innerOfFunc(), func() and global scope (the outermost scope). Within innerOfInnerOfFunc() you can access the lexical scope variables myInnerVar, myVar and myGlobal.

The lexical scope of innerFunc() consists of func() and global scope. Within innerOfFunc() you can access the lexical scope variables myVar and myGlobal.

Finally, the lexical scope of func() consists of only the global scope. Within func() you can access the lexical scope variable myGlobal.

*/
