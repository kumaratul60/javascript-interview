# High-Performance Graphics & Digital Signal Processing: Canvas & Web Audio

This guide details advanced implementations using the **Canvas 2D API** and the **Web Audio API**, focusing on high-DPI scaling, browser execution limits, and visual-audio synchronizations.

---

## 1. High-Performance Canvas Graphics

The HTML5 Canvas API utilizes an **immediate rendering mode**. It acts as a blank raster context, drawing pixels directly. The browser forgets rendering geometry as soon as pixels are pushed.

### 1.1 The High-DPI (Retina) Blurriness Gotcha

By default, `<canvas>` dimensions map CSS pixels. On modern Retina or high-DPI displays (where `window.devicePixelRatio > 1`), drawing with CSS dimensions causes text and shapes to render blurry because the browser stretches the canvas buffer to match physical pixels.

To fix this, scale the canvas's internal drawing buffer dimensions using `devicePixelRatio`, while keeping its CSS display bounds fixed.

```javascript
function initializeHighDpiCanvas(canvas, widthCss, heightCss) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  // Set buffer resolution (physical pixels)
  canvas.width = widthCss * dpr;
  canvas.height = heightCss * dpr;

  // Set CSS display layout bounds
  canvas.style.width = `${widthCss}px`;
  canvas.style.height = `${heightCss}px`;

  // Scale context coordinates to automatically map CSS drawing code
  ctx.scale(dpr, dpr);

  return ctx;
}

// Usage
const canvas = document.createElement('canvas');
const ctx = initializeHighDpiCanvas(canvas, 400, 300);

ctx.fillStyle = '#4f46e5';
ctx.fillRect(50, 50, 200, 100); // Renders crisp on all screen resolutions
```

### 1.2 The Double Buffering Technique

When running high-frequency updates, clearing the canvas and redrawing complex scenes inside the same frame can cause visual flickering.

- **Solution:** Render the complex scene to an offscreen, invisible canvas first, then draw that offscreen canvas onto the visible canvas in a single step (`drawImage`).

```javascript
const mainCanvas = document.getElementById('main-scene');
const mainCtx = mainCanvas.getContext('2d');

// Create temporary offscreen buffer canvas
const offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = mainCanvas.width;
offscreenCanvas.height = mainCanvas.height;
const offscreenCtx = offscreenCanvas.getContext('2d');

function drawScene(ctx) {
  // Render complex paths, shapes, grids
  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(100, 100, 300, 200);
}

function renderFrame() {
  offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

  // Draw scene onto the offscreen canvas
  drawScene(offscreenCtx);

  // Single push of offscreen raster data to screen
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  mainCtx.drawImage(offscreenCanvas, 0, 0);

  requestAnimationFrame(renderFrame);
}
```

---

## 2. Web Audio API (Modular Signal Routing)

The Web Audio API allows you to control, shape, and generate audio signals in the browser. It uses a **modular routing graph** composed of connected `AudioNode` structures.

```
                  ┌──────────────────────┐
                  │  AudioSourceNode     │
                  │  (Oscillator/Media)  │
                  └──────────┬───────────┘
                             │
                  ┌──────────▼───────────┐
                  │  BiquadFilterNode    │
                  │  (Lowpass/Highpass)  │
                  └──────────┬───────────┘
                             │
                  ┌──────────▼───────────┐
                  │  GainNode            │
                  │  (Volume Controller) │
                  └──────────┬───────────┘
                             │
                  ┌──────────▼───────────┐
                  │  AnalyserNode        │
                  │  (FFT Frequency Data)│
                  └──────────┬───────────┘
                             │
                  ┌──────────▼───────────┐
                  │  AudioDestination    │
                  │  (Speakers/Output)   │
                  └──────────────────────┘
```

### 2.1 Complete Audio Processing Chain Example

Here is a complete routing setup, incorporating filtering, volume modulation, real-time frequency analysis, and destination output:

```javascript
class AudioEngine {
  constructor() {
    // Initialize context
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();

    // Create nodes
    this.oscillator = this.ctx.createOscillator();
    this.filter = this.ctx.createBiquadFilter();
    this.gainNode = this.ctx.createGain();
    this.analyser = this.ctx.createAnalyser();

    // Connect node chain
    this.oscillator.connect(this.filter);
    this.filter.connect(this.gainNode);
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    // Initial configurations
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(800, this.ctx.currentTime); // Cutoff 800Hz
    this.gainNode.gain.setValueAtTime(0.1, this.ctx.currentTime); // Volume level
    this.oscillator.type = 'sawtooth';
    this.oscillator.frequency.setValueAtTime(220, this.ctx.currentTime); // Note A3 (220Hz)
  }

  play() {
    this.oscillator.start();
  }

  stop() {
    this.oscillator.stop(this.ctx.currentTime + 0.1); // Add fade-out to prevent popping
  }
}
```

---

## 3. Deep Dive: Browser Engine Restrictions & Failures

### 3.1 Autoplay Restrictions

To prevent intrusive audio ads, modern browsers require a user interaction (e.g., click, keypress) before a page can output audio.

- **Fail State:** If the audio context is initialized before a gesture, its `state` transitions to `suspended`.
- **Solution:** Listen for user interactions to resume the context.

```javascript
const audioCtx = new AudioContext();

function resumeAudio() {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().then(() => {
      console.log('Audio Context Resumed successfully!');
    });
  }
}

// Attach to top-level UI listeners
document.addEventListener('click', resumeAudio, { once: true });
```

### 3.2 WebGL Context Loss (Graphics Failures)

When using hardware-accelerated rendering (WebGL/WebGPU canvases), the operating system may reclaim GPU memory (e.g., system sleep, driver update). This triggers a **context loss**, rendering the canvas blank.

- **Handling:** Web applications must listen for this event and reload assets/shaders to restore the scene.

```javascript
const canvas = document.querySelector('canvas');
canvas.addEventListener(
  'webglcontextlost',
  (event) => {
    event.preventDefault(); // Tells browser you will handle restoration manually
    console.warn('WebGL Context Lost. Halting render loop.');
    cancelAnimationFrame(animationFrameId);
  },
  false,
);

canvas.addEventListener(
  'webglcontextrestored',
  () => {
    console.log('WebGL Context Restored. Re-initializing shaders & textures.');
    initializeWebGlScene(); // Re-bind and restart animations
    renderFrame();
  },
  false,
);
```

---

## 4. Interview Hot Corners

### Q1: Why choose Canvas over SVG, and what are their performance bounds?

- **SVG (Retained Mode):** Vector-based. Every shape is an individual DOM element.
  - **Pros:** Crisp resizing, styles via CSS, accessible to screen readers, handles events on shapes directly.
  - **Cons:** Performance drops significantly when rendering $> 2,000$ elements due to DOM node overhead.
- **Canvas (Immediate Mode):** Pixel-based. A single DOM element.
  - **Pros:** High performance. Can easily render tens of thousands of objects (particles, complex lines) at 60fps.
  - **Cons:** No DOM elements or event listeners for individual shapes (you must compute click coordinates manually), content is inaccessible to screen readers without standard text fallback implementations.

### Q2: How do you build a real-time audio spectrum visualizer using Canvas?

1. Connect your audio source to an `AnalyserNode`.
2. Retrieve frequency data inside a `requestAnimationFrame` loop.
3. Draw bars onto the canvas based on the frequency values:

```javascript
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256; // Fast Fourier Transform size
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);

  analyser.getByteFrequencyData(dataArray); // Fetch current frame amplitude data

  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Semi-transparent overlay creates trails

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i];
    ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }
}
```
