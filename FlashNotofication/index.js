// Optimize Code

const title1 = document.title;
const newTitle1 = "Flash Title1";

function flashTitle() {
  const interval = setInterval(() => {
    document.title = document.title === title1 ? newTitle1 : title1;
  }, 1000);
  return interval;
}

function stopFlashTitle(intervalId) {
  clearInterval(intervalId);
  document.title = title1;
}

const intervalId1 = flashTitle();
setTimeout(() => {
  stopFlashTitle(intervalId1);
}, 10000);

intervalId1();

/***
// Rough code

let title = document.title;
let newTitle = "Flash Title";
let intervalId;

function flashTitle() {
    intervalId = setTimeout(function () {
        document.title = document.title === title ? newTitle : title;
    }, 1000);
}

function stopFlashTitle() {
    clearInterval(intervalId);
    document.title = title;
}

flashTitle();
setInterval(stopFlashTitle, 10000);



*/
