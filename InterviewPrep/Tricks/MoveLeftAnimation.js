function moveLeft(elem, distance) {
  var left = 0;

  function frame() {
    left++;
    elem.style.left = left + "px";

    if (left == distance) clearInterval(timeId);
  }

  var timeId = setInterval(frame, 10); // draw every 10ms
}
