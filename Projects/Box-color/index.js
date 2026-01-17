

// DO NOT overwrite the inner HTML if boxes are already in HTML
// document.getElementById("app").innerHTML = `<h1>Hello JavaScript!</h1>`;

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

  // Optionally disable again after reset
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

const fillTest = ['Test', 'red', 'black', 'green'];
const fill1 = fillTest.fill('orange', 1, 3);
const shuffledFill = shuffleArray(fillTest);

console.log({ fill1, shuffledFill });

/*

import React, { useState } from "react";
import "./styles.css";

const initialColors = ["red", "green", "blue", "orange", "purple"];

export default function App() {
  const [boxColors, setBoxColors] = useState(initialColors);
  const [originalColors, setOriginalColors] = useState(initialColors);
  const [resetEnabled, setResetEnabled] = useState(false);

  const handleBoxClick = (clickedIndex) => {
    const clickedColor = boxColors[clickedIndex];

    const updatedColors = boxColors.map((_, i) =>
      i === clickedIndex ? "white" : clickedColor
    );

    setBoxColors(updatedColors);
    setResetEnabled(true);
  };

  const handleReset = () => {
    setBoxColors(originalColors);
    setResetEnabled(false);
  };

  const handleShuffle = () => {
    const shuffled = [...originalColors].sort(() => Math.random() - 0.5);
    setBoxColors(shuffled);
    setOriginalColors(shuffled);
    setResetEnabled(false);
  };

  return (
    <div className="app">
      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleReset} disabled={!resetEnabled}>
          Reset
        </button>
        <button onClick={handleShuffle} style={{ marginLeft: "10px" }}>
          Shuffle
        </button>
      </div>

      <div className="container">
        {boxColors.map((color, index) => (
          <div
            key={index}
            className="box"
            style={{ backgroundColor: color }}
            onClick={() => handleBoxClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}




*/
