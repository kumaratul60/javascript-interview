/**
 * @fileoverview
 * Trapping Rain Water
 * (LeetCode Hard: 42. Trapping Rain Water)
 * 
 * Target: Given n non-negative integers representing an elevation map 
 * where the width of each bar is 1, compute how much water it can 
 * trap after raining.
 */

/**
 * Strategy: Two Pointers
 * 1. Maintain two pointers, left and right, at the ends of the array.
 * 2. Maintain leftMax and rightMax to track the highest bars on each side.
 * 3. Move the pointer with the smaller height, as the water level 
 *    is limited by the lower boundary.
 * 4. At each step, if height[left] < leftMax, water trapped = leftMax - height[left].
 * 
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  if (!height || height.length < 3) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let totalWater = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      // Process left side
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        totalWater += leftMax - height[left];
      }
      left++;
    } else {
      // Process right side
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        totalWater += rightMax - height[right];
      }
      right--;
    }
  }

  return totalWater;
}

/**
 * 📈 Complexity Analysis:
 * -----------------------
 * Time Complexity: O(N) - We visit each element once.
 * Space Complexity: O(1) - We only use a few constant variables.
 * 
 * 💡 Other Approaches:
 * - Brute Force: O(N^2)
 * - Dynamic Programming: O(N) Time, O(N) Space (storing leftMax/rightMax arrays).
 * - Monotonic Stack: O(N) Time, O(N) Space.
 */

// ------------------------------------
// 🧪 Test Cases
// ------------------------------------

console.log("[0,1,0,2,1,0,1,3,2,1,2,1] :", trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log("[4,2,0,3,2,5] :", trap([4,2,0,3,2,5])); // 9
