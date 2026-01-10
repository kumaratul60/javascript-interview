/*
Problem Statement

Implement a function twoSum(x: number, y: number) that computes the exact sum of two floating-point numbers using error-free transformation.

The function must return an object { hi, lo } where:
hi is the rounded floating-point sum of x + y
lo is the rounding error such that hi + lo equals the exact mathematical sum of x and y

Constraints

Do not initialize lo to 0
Do not use BigInt or any external libraries
Must work correctly for floating-point numbers
hi + lo must exactly equal x + y in real arithmetic

*/

function twoSum(x, y) {
  const hi = x + y;
  const lo = y - (hi - x);
  return { hi, lo };
}
// This technique is commonly used in numerical computing to reduce floating-point precision loss.

/*
result = 0
for x in [3,3,5]:
    if x >= 3:
        result = result - x
    else:
        result = result + x

result = 0
for x in [3,3,5]:
    if x > 3:
        result = result - x
    else:
        result = result + x
*/
