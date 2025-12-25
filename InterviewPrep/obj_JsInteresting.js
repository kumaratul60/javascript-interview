/*


 1. rel = "noopener" //this attribute prevent from accesing that page resource and security purpose
 2.  javascript:void(0)
 3.   if you return undefined then it means function behave like void
 4. <a href = "https:google.com" target = "_blank" rel = "noopener"></a>
  instead of this if we write :

  <a href = "javascript:console.log("any js code"); alert("js)" target = "_blank" rel = "noopener"></a> 
  
  OR
  <a href = "javascript:void(0)" target = "_blank"></a> 


 a. if you write ancher tag like this so it means you did not go any of page (redirect is not happining) , user can stay on same page on click the url. 
b. It means I'm trying to exicute javascript code not redirect to url


  */

console.log("b" + "a" + +"a" + "a");
//  "b"+"a" = ba
// ba+(+"a") = baNaN
//  becoz, + sign means parseInt() which means convert string into number that is not possible in above case.
// baNaN+"a" = baNaNa

// min_value<0<max_value => c++,java
console.log(Number.MIN_VALUE > 0); // true

//  beacuse in Js Number.MIN_VALUE return smallest positive number

console.log(Math.min() > Math.max()); // true
//  Math.min() => -Infinity
// Math.max() => Infinity
