// Function to find greater elements

var aray1 = [1, 3, 5];
var aray2 = [2, 4];
var len = aray1.length;

function findMaxElements(arr1, arr2, n) {
  // Index counter for arr1
  var cnt1 = 0;

  // Index counter for arr2
  var cnt2 = 0;

  // To store the maximum elements
  var maxelements = 0;

  while (cnt1 < n && cnt2 < n) {
    // If element is greater,
    // update maxelements and counters
    // for both the arrays
    if (arr1[cnt1] > arr2[cnt2]) {
      maxelements++;
      cnt1++;
      cnt2++;
    } else {
      cnt1++;
    }
  }

  // Print the maximum elements
  //   return maxelements;
  console.log(maxelements);
}

findMaxElements(aray1, aray2, len);
