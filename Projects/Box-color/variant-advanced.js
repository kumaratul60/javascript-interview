// Variant: Advanced Level - Box Color Changer with Undo
// Expectations: Build on mid level by adding undo functionality to revert the last color change action.
// This tests advanced state management (using a stack for history), data structures (arrays for state snapshots), error handling, and complex interactions.
// Solution: Maintain a history array of box color states. On each change (click, shuffle), push current state. On undo, pop and restore. Disable undo if no history. Handle edge cases like multiple undos.

const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('resetBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const undoBtn = document.getElementById('undoBtn'); // Assume added to HTML

let hasUserClicked = false;
let history = [];

// Initialize history with original state
function saveState() {
  const state = Array.from(boxes).map(box => box.style.backgroundColor);
  history.push(state);
  undoBtn.disabled = false;
}

// Click handler
boxes.forEach((clickedBox) => {
  clickedBox.addEventListener('click', () => {
    saveState();
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
  saveState();
  boxes.forEach((box) => {
    const originalColor = box.getAttribute('data-color');
    box.style.backgroundColor = originalColor;
  });
});

// Shuffle colors
shuffleBtn.addEventListener('click', () => {
  saveState();
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

// Undo last action
undoBtn.addEventListener('click', () => {
  if (history.length > 0) {
    const previousState = history.pop();
    boxes.forEach((box, index) => {
      box.style.backgroundColor = previousState[index];
    });
    if (history.length === 0) {
      undoBtn.disabled = true;
    }
  }
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

// Initial state save
saveState();
undoBtn.disabled = true;