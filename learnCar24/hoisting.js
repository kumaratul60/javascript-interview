function x() {
  console.log(a);
  var a = 10;
}
x();

// var keyword can be hoisted while let & const hoisted in temperal dead zone.
// temperal deadzone: It is a term to describe where variables are in the scope but they are  not yet declared.
function y() {
  console.log(a, b, c);
  var a = 10;
  let b = 20;
  const c = 30;
}
y();
                                                                   