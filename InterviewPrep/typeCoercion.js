"11" + 1; // "111"
"11" - 1; // 10;

// Explicit Conversion:

// Boolean

Boolean(""); // false
Boolean(0); // false
Boolean(-0); // false
Boolean(NaN); // false
Boolean(null); // false
Boolean(undefined); // false
Boolean(false); // false

// String

10 + "10"; // "1010"
20 + "200"; // "20200"
0.212 + "1"; // "0.2121"
null + ""; // "null"
undefined + ""; // "undefined"
NaN + ""; // "NaN"

// Number

Number("42"); // 42
Number(""); // 0
Number(true); // 1
Number(false); // 0
Number(null); // 0
Number(undefined); // NaN

//  “/” operator type coercion
12 / 6; // 2
12 / "6"; // 2
"12" / "6"; // 2
NaN / NaN; // NaN

// “+” operator type coercion

true + false; // 1
true + true; // 2
false + false; // 0
"1" + 1; // "11"
+{}; // '[object Object][object Object]'

+[][1] + // [] + []              // '' // 0
  [][(1, 2)] + // '1'
  []; // '1,2'
!([1] + []); // false
"foo" + +"bar"; // 'fooNaN'
// [] + null + 1        // 'null1'

+[] + {} + [1]; // '0[object Object]1'
!+[] + [] + ![]; // 'truefalse'
"number" + 15 + 3; // 'number153'
15 + 3 + "number"; // '18number'
null + ""; // 'null'
null + undefined; // NaN

// “-” operator type coercion
// Using the — operator, the JS engine to subtracts the values and tried to cast the values into integers implicitly.
"10" - 10; // 0
10 - "10"; // 0
null - undefined; // NaN
"2" - 1; // 1

// “==” operator type coercion
// In JS, == operator is very common to compare values. It compares the values based on their values ignoring their types.
"true" == true; // false
false == "false"; // false
null == ""; // false
(!!"false" == !!"true"["x"]) == // true
  "x"; // true
NaN == NaN; // false
undefined == undefined; // true
null == null; // true
null == undefined; // true
((10 == "10"[10]) == // true
  (10)[10]) == // true
  "10"; // true

// “===” operator type coercion
// In JS, === operator is recommended to compare values. It compares the values based on their values and their types.
((10 === "10"[10]) === // false
  (10)[10]) === // false
  "10"; // false
null == undefined; // false

// “>” operator type coercion
6 > "5"; // false
"6" > "45"; // true
"6" > "75"; // false
