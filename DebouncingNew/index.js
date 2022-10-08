/*
Debouncing => Debouncing is a performance optimization technique. It limits the rate of execution of a function (API call) and wait for a certain amount of time before running it again.

Ques- Create a button  UI and add debounce as follows =>
  --> Show "Button pressed <X> Times" every time button is pressed
  --> Increase "Triggered <Y> Times" count after 800ms of debounce

*/

const btn = document.querySelector("#increment_btn");
const btnPress = document.querySelector(".increment_pressed")
const count = document.querySelector(".increment_count");

var pressedCount = 0;
var triggeredCount = 0;

const debouncedCount = _.debounce(() => {
  count.innerHTML = ++triggeredCount;
}, 800)

btn.addEventListener('click', () => {
  btnPress.innerHTML = ++pressedCount;
  debouncedCount()
})
