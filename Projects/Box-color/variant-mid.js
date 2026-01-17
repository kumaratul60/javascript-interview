// Variant: Mid Level - Box Color Changer with Reset and Shuffle
// Expectations: Build on basic by adding a reset button to restore original colors and a shuffle button to randomize the colors.
// This tests state management (using data attributes), array manipulation (shuffling), button interactions, and conditional logic for enabling reset.
// Solution: Store original colors in data-color attributes, implement shuffleArray function using Fisher-Yates, add event listeners for reset and shuffle buttons, disable reset initially until user interacts.

const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('resetBtn');
const shuffleBtn = document.getElementById('shuffleBtn');

let hasUserClicked = false;

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

    // Enable reset button only after first valid user action
    if (!hasUserClicked) {
      hasUserClicked = true;
      resetBtn.disabled = false;
    }
  });
});

// Reset to original colors
resetBtn.addEventListener('click', () => {
  boxes.forEach((box) => {
    const originalColor = box.getAttribute('data-color');
    box.style.backgroundColor = originalColor;
  });
});

// Shuffle colors
shuffleBtn.addEventListener('click', () => {
  const colors = Array.from(boxes).map((box) => box.getAttribute('data-color'));
  const shuffled = shuffleArray(colors);

  boxes.forEach((box, index) => {
    box.setAttribute('data-color', shuffled[index]);
    box.style.backgroundColor = shuffled[index];
  });

  // Reset user interaction state
  hasUserClicked = false;
  resetBtn.disabled = true;
});

// Utility to shuffle array
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
