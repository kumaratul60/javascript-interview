function longestValidParentheses(s) {
  let maxLength = 0;
  let stack = [-1]; // Initialize stack with -1 to handle base case

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
      } else {
        maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
      }
    }
  }
  return maxLength;
}

const s = "(()())";
console.log(longestValidParentheses(s)); // 6
