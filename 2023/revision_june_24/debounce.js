function print(message) {
  console.log(message);
}

let timeout;
function callApiWithDebounce(message, wait) {

  // Clear the previous timeout if it exists
  if (timeout) clearTimeout(timeout);

  // Set a new timeout to call the API after the wait time
  timeout = setTimeout(() => {
    print(message);
  }, wait);
}

// Example usage
callApiWithDebounce("i", 2000);
callApiWithDebounce("ip", 2000);
callApiWithDebounce("iph", 2000);
callApiWithDebounce("ipho", 2000);
callApiWithDebounce("iphon", 2000);
callApiWithDebounce("iphone", 2000);
