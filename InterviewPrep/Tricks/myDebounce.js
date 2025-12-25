// Debounce polyfill

const btn = document.querySelector("#increment_btn");
const btnPress = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

var pressedCount = 0;
var triggeredCount = 0;

const myDebounce = (callback, delay) => {
    let timer;
    // ...ages -> extra arguments for call like: myDebounce(count),  so count is here an extra argument
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};

const debouncedCount = myDebounce(() => {
    // triggeredCount += 1
    // count.innerHTML = triggeredCount
    count.innerHTML = ++triggeredCount;
}, 800);

btn.addEventListener("click", () => {
    btnPress.innerHTML = ++pressedCount;
    debouncedCount();
});
