// An array to store the timer identifiers returned by setTimeout()
const timers = [];

// Set a timeout to print "Hello, world!" after 1000ms (1 second)
timers.push(
  setTimeout(() => {
    console.log("Hello, world!");
  }, 1000)
);

// Set another timeout to print "Goodbye, world!" after 2000ms (2 seconds)
timers.push(
  setTimeout(() => {
    console.log("Goodbye, world!");
  }, 2000)
);

// Define a function to clear all active timeouts
function clearAllTimeouts() {
  // Iterate through the array of timers
  for (const timer of timers) {
    // Clear the timer with the current identifier
    clearTimeout(timer);
  }
}

// Clear all active timeouts
clearAllTimeouts();

//or
setTimeout(() => {
  clearAllTimeouts();
}, 500);

///////////////////////////////////////

