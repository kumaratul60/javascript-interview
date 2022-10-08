var string = "adsjfdsfsfjsdjfhacabcsbajda";

var map = string.reduce(function(prev, cur) {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});
  
  // map is an associative array mapping the elements to their frequency:
  console.log(map);
