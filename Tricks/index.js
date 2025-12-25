/*
Throttling => Throttling is a performance optimization technique. It limits the execution od an even handler function even when this event triggers continuously due to user actions.
Where user actions is scrolling, resizing to window, etc. 


Ques- Create a button  UI and add throttle as follows =>
  --> Show "Button pressed <X> Times" every time button is pressed
  --> Increase "Triggered <Y> Times" count after 800ms of throttle

*/

const btn = document.querySelector("#increment_btn");
const btnPress = document.querySelector(".increment_pressed")
const count = document.querySelector(".increment_count");

var pressedCount = 0;
var triggeredCount = 0;

const time = new Date().getTime()

const throttledCount = _.throttle(() => {
    const newTime = new Date().getTime()
    console.log(newTime - time);

    count.innerHTML = ++triggeredCount;
}, 800)

btn.addEventListener('click', () => {
    btnPress.innerHTML = ++pressedCount;
    throttledCount()
})