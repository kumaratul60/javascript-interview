function Time() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  function update(currTime) {
    if (currTime < 10) return "0" + currTime;
    return currTime;
  }
  hour = update(hour);
  minute = update(minute);
  second = update(second);

  let period = hour > 12 ? "PM" : "AM";

  if (hour === 0) {
    hour = 12;
  } else {
    if (hour > 12) {
      hour -= 12;
    }
  }

  document.getElementById("clock").innerText =
    hour + ":" + minute + ":" + second + "  " + period;

  setTimeout(Time, 1000);
}
Time();
