// BoomCounter

for (let i = 10; i >= 0; i--) {
  setTimeout(function () {
    console.log(i);
  }, (10 - i) * 800);
}

//find the bug:

// 1.
// for (var i = 0; i < 5; i++) {
//     setTimeout(function () {
//         console.log(i);
//     }, i * 1000);
// }

// 2.
// function b(){
//     for (let j = 0, j <= 10, j++){
//         setTimeout(() => {
//             console.log(j);
//         }, j * 10);
//     }
// }
// b();

function b() {
  for (let j = 10; j > 0; j--) {
    setTimeout(() => {
      console.log(j);
    }, (10 - j) * 1000);
  }

  setTimeout(() => {
    console.log("BOOM");
  }, 10 * 1000);
}

b();

//efficient way

function b() {
  let j = 10;
  let interval = setInterval(() => {
    if (j > 0) {
      console.log(j);
      j--;
    } else {
      console.log("BOOM");
      clearInterval(interval); // Stop the interval when countdown finishes
    }
  }, 1000);
}

b();



//
function b(start=10) {
  for (let j = start; j >= 0; j--) {
    setTimeout(() => {
      console.clear(); // Clear console for a dynamic effect
      console.log(`Countdown: ${j}`);
      
      // Adding a visual progress bar
      console.log("[" + "=".repeat(start - j) + " ".repeat(j) + "]");

      if (j === 0) {
        console.log(" BOOM");
      }
    }, (start - j) * 1000);
  }
}
b(12)


//

function b(start = 10, delay = 1000) {
  const totalLength = 20; // Progress bar length

  for (let j = start; j >= 0; j--) {
    setTimeout(() => {
      console.clear(); // Clear console for a dynamic effect
      console.log(`⏳ Countdown: ${j} seconds remaining`);

      // Dynamic progress bar that scales
      let progress = Math.floor(((start - j) / start) * totalLength);
      console.log("[" + "=".repeat(progress) + " ".repeat(totalLength - progress) + "]");

      if (j === 0) {
        console.log("🔥💥 BOOM 💥🔥");
        // Optional: Play the explosion sound
        // new Audio('explosion.mp3').play(); (For browser usage)
      }
    }, (start - j) * delay);
  }
}

// Start countdown with custom settings
b(5, 800); // Countdown from 12 with 800ms interval


