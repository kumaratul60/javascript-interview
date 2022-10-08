function myFn() {
    let foo = 1;
    foo = 30;
    // let foo = 101;    // 🙅‍♀️ can't use "let" keyword again
    foo = 101;
  
    console.log(foo);  
  }
  
  myFn();
  
  console.log(foo);  