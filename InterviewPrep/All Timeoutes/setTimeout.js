// Set a timeout to print "Hello, world!" after 1000ms (1 second)
const timer = setTimeout(() => {
    console.log("Hello, world!");
  }, 1000);
  
  // Clear the timeout after 500ms
  setTimeout(() => {
    clearTimeout(timer);
  }, 500);