// const timer = (value, delay = 1000) => {
//   // Write a function timer that returns '2' after 5 seconds.
//   return new Promise((res) => {
//     setTimeout(() => res(`${value}`), delay);
//   });
// };

// const main = async () => {
//   console.log('1'); // Micro task ques
//   // Calls timer, accepts the value returned by timer, stores it in a variable 'data' and does a console.log(data)
//   const timerData = await timer(2);
//   console.log(timerData); // Macro task queue
//   console.log('3'); //  Micro task ques
// };

// main();

const timer = () => {
  // Write a function timer that returns '2' after 5 seconds.
};

const main = () => {
  console.log('1');
  // Calls timer, accepts the value returned by timer, stores it in a variable 'data' and does a console.log(data)
  console.log('3');
};

main();

// https://storage.googleapis.com/msgsndr/Dv2UariJ0rAWw2ngVYDT/media/654cac84a7c5f45e5e4863a9.png

// Flash Of Unstyled content
// Async-differ
// cors
// how browser internal calculate html, css, js content before shows on ui
