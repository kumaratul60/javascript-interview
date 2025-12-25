//  Throttle polyfill


const btn = document.querySelector("#increment_btn");
const btnPress = document.querySelector(".increment_pressed")
const count = document.querySelector(".increment_count");

var pressedCount = 0;
var triggeredCount = 0;

const time = new Date().getTime()

const myThrottle = (cb, d) => {
    let last = 0;
    return (...args) => {
        let newTime = new Date().getTime();
        if (newTime - last < d) return;
        last = newTime;
        return cb(...args);
    }
}

var throttledCount = myThrottle(() => {
    triggeredCount += 1;
    count.innerHTML = triggeredCount;
}, 800)

btn.addEventListener('click', () => {
    btnPress.innerHTML = ++pressedCount;
    throttledCount()
})