function myFunction() {
  // Code to be executed repeatedly goes here
  console.log("hay");
}

setInterval(myFunction, 1000);

/// clear setInterval

function myFunction1() {
  // Code to be executed repeatedly goes here
  console.log("bye");
}

var intervalID = setInterval(myFunction1, 1000);

// Later on, to stop the interval:
clearInterval(intervalID);
