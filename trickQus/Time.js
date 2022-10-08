let time1 = new Date();
let hour = time1.getHours();
let min = time1.getMinutes();
let sec = time1.getSeconds();

hour = hour < 10 ? "0" + hour : hour;
min = min < 10 ? "0" + min : min;
sec = sec < 10 ? "0" + sec : sec;

let currentTime = hour + ":" + min + ":" + sec;
console.log(currentTime);
