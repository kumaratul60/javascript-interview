# Canvas & Web Audio API (Advanced)

These APIs are used for high-performance graphics (Canvas) and complex audio manipulation (Web Audio). They are common in games, data visualization, and multimedia apps.

---

## 🎨 1. Canvas API (Graphics)

The Canvas API allows you to draw 2D graphics directly in the browser via JavaScript. It is **immediate mode**, meaning it doesn't remember what you drew; it just paints pixels.

### Example: Basic Drawing

```javascript
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100); // Draw a 100x100 square at (10, 10)

ctx.beginPath();
ctx.arc(150, 150, 50, 0, Math.PI * 2); // Draw a circle
ctx.fill();
```

### 💡 High-Performance Logic: `requestAnimationFrame`

To create smooth animations, use `requestAnimationFrame` instead of `setInterval`.

```javascript
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen
  // Update position and draw again
  requestAnimationFrame(animate);
}
animate();
```

---

## 🎵 2. Web Audio API (Sound)

The Web Audio API is a modular system for handling audio. You create **nodes** and connect them like an audio rack.

### Example: Basic Oscillator (Beep)

```javascript
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create nodes
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

// Connect them
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination); // Connect to speakers

// Play sound
oscillator.type = 'sine'; // 'square', 'sawtooth', 'triangle'
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // 440Hz (A note)
oscillator.start();
oscillator.stop(audioCtx.currentTime + 1); // Play for 1 second
```

---

## 🏗️ 3. Scaling & Tasks

### A. Canvas for Big Data

If you have 1 million points, don't use 1 million DOM elements. Use **one** Canvas. Drawing 1 million points on a canvas is significantly faster than managing them in the DOM.

### B. Web Audio for Visualizers

You can connect an `AnalyserNode` to a canvas to create a real-time music visualizer.

```javascript
const analyser = audioCtx.createAnalyser();
// source.connect(analyser) -> analyser.connect(destination)
// Use analyser.getByteFrequencyData() inside a requestAnimationFrame!
```

---

## 🚫 4. Common Pitfalls

1.  **Canvas Blurriness**: By default, canvases look blurry on Retina displays. You must scale the canvas width/height by `window.devicePixelRatio`.
2.  **Audio Autoplay Policy**: Browsers block audio from starting automatically. You **must** resume the `AudioContext` inside a user gesture (like a click).
    - `button.on('click', () => audioCtx.resume());`
3.  **Memory Management**: If you create thousands of objects on a canvas without clearing them, you will leak memory.

---

## 🎯 5. Use Cases

- **Data Viz**: Charts, maps, and heatmaps.
- **Games**: 2D and 3D (via WebGL/WebGPU).
- **Audio Editors**: DAW-like features in the browser.
- **Image Filters**: Real-time filters and effects.

---

## 💡 Interview Tip: "Why use Canvas over SVG?"

**Answer**:

- **SVG**: Vector-based, DOM-heavy. Best for few elements that need events/styling (icons, simple charts).
- **Canvas**: Pixel-based, one DOM element. Best for thousands of elements, complex animations, and high-frequency updates (games, heatmaps).
