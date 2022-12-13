console.log(true || "ind");
console.log(true && "ind");
console.log(true ?? "ind");

console.log((123)["toString"].length + 123);
console.log((123)["toString"]().length + 123);

console.log(null ?? true); // true
console.log(false ?? true); // false
console.log(undefined ?? true); // true

console.log(
  "%cThis is a red text with bigger font",
  "color:red; font-size:20px"
);
console.log("%cThis is a red text", "color:green");

console.group("User Details");
console.log("name: Atul Messy");
console.log("job: Software Developer");

// Nested Group
console.group("Address");
console.log("Street: Commonwealth");
console.log("City: Los Angeles");
console.log("State: California");

console.groupEnd();
