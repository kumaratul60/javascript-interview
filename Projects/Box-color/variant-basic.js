// Variant: Basic Level - Box Color Changer
// Expectations: Implement a basic color box changer where clicking a box changes all other boxes to that color and the clicked box to white.
// This tests fundamental understanding of DOM manipulation, event handling, and basic JavaScript.
// Solution: Use querySelectorAll to get all boxes, add click event listeners to each, and update background colors accordingly.

const boxes = document.querySelectorAll('.box');

// Click handler
boxes.forEach((clickedBox) => {
  clickedBox.addEventListener('click', () => {
    const clickedColor = clickedBox.style.backgroundColor;

    boxes.forEach((box) => {
      if (box === clickedBox) {
        box.style.backgroundColor = 'white';
      } else {
        box.style.backgroundColor = clickedColor;
      }
    });
  });
});