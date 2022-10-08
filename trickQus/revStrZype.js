var string =
  " Code, create, and learn together! Use our free, collaborative, in-browser IDE to code in 50+ languages — without spending a second on setup";

// var string = "Atu,s.de!$";
// var string = "Java $ Discover";
// var string = "Mumbai";

// isAlphabet return true if character is alphanumeric else return false.
function isAlphabet(x) {
  return (x >= "A" && x <= "Z") || (x >= "a" && x <= "z") || (x >= 0 && x <= 9);
}

// If character is an alphabetic character input then, replace it with the current character of temp[].
function swap(str, a, b) {
  var temp = [];
  for (var i = 0; i < str.length; i++) {
    if (i == a) {
      temp = temp + str[b];
    } else if (i == b) {
      temp = temp + str[a];
    } else {
      temp = temp + str[i];
    }
  }
  return temp;
}

function reverse(str) {
  // Initialize left and right pointers
  var right = str.length - 1,
    left = 0;

  // Traverse string from both ends until 'left' and 'right'
  while (left < right) {
    // Ignore special characters
    if (!isAlphabet(str[left])) left++;
    else if (!isAlphabet(str[right])) right--;
    // Both str[left] and str[right] are not spacial
    else {
      str = swap(str, left, right);
      left++;
      right--;
    }
  }
  //   console.log(str)
  return str;
}

// reverse(string);
const output = reverse(string);
console.log(output);
