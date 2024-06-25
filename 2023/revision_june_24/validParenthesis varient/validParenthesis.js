function isValid(s) {
  // Initialize stack to store the closing brackets expected...
  let stack = [];
  // Traverse each charater in input string...
  for (let idx = 0; idx < s.length; idx++) {
    // If open parentheses are present, push it to stack...
    if (s[idx] == "{") {
      stack.push("}");
    } else if (s[idx] == "[") {
      stack.push("]");
    } else if (s[idx] == "(") {
      stack.push(")");
    }
    // If a close bracket is found, check that it matches the last stored open bracket
    else if (stack.pop() !== s[idx]) {
      return false;
    }
  }
  return !stack.length;
}

const s = "{(})[]{}";
console.log(isValid(s));

// using map

function isValidMap(s) {
  let stack = [];
  // Map to store the pairs of matching parentheses
  const matchingParentheses = {
    "}": "{",
    "]": "[",
    ")": "(",
  };

  for (let char of s) {
    // If it's an opening bracket, push it onto the stack
    if (char === "{" || char === "[" || char === "(") {
      stack.push(char);
    } else {
      // If it's a closing bracket, check if it matches the last opening bracket
      if (stack.pop() !== matchingParentheses[char]) {
        return false;
      }
    }
  }
  // If the stack is empty, all the opening brackets were properly matched
  return stack.length === 0;
}
