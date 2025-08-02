/* hoising */

// var x = 2;
// function getName(){
//     console.log("hoisyt name")
// }
// getName()
// console.log(x)
// console.log(getName)

/* how fuction works */

// even  if execution context created by fuction or globle execution context or any execution context thay have own memory space or they have own virtual kind of envirnment seperatly that is endependent of each other.

// var x = 1;
// a();
// b();
// console.log(x);

// function a() {
//   var x = 10;
//   console.log(x);
// }
// function b() {
//    var x = 1001;
//   console.log(x);
// }

/* sortest js program == no code */
// sortest javascript program is empty file => so that empty file has nothing to execute but still javascript engine doing alot of thing behind the seens.
//  if we run empty js program then it will create a global execution context and also sets the memory space
//  it also create something called as "window" in case of browser
//  It also give a "this" object => so At the globle level "this" point to the window object in case of node
//  what is window => Window is a globle object which is careated along with the globle excution context.
//  this === window => true
// when any execution context created the "this" object is will created along with that execution context

//  what is globle space/scope => Any code you write in javascript which is not inisde in the function

//  Any thing you see on top-label is global space .

//  So whenever you create any variable or funtion in global space/scope  so these variables or function get attach to the global object and that globle object is nothing but window object in browser

// var a = 2;
// function(){

// }
// console.log(window.a)
// //or
// console.log(this.a)
//or
// console.log(a)

//  if you don't put any thing in front of this it try to find in global space/scope







