// Web APIs Examples

// Fetch API
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// localStorage
localStorage.setItem('key', 'value');
console.log(localStorage.getItem('key'));
localStorage.removeItem('key');

// Geolocation
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => console.log('Latitude:', position.coords.latitude, 'Longitude:', position.coords.longitude),
    error => console.error('Geolocation error:', error)
  );
}

// Intersection Observer (for lazy loading)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is visible');
    }
  });
});
// observer.observe(document.querySelector('.element'));

// Web Workers (basic example, assuming worker.js exists)
// const worker = new Worker('worker.js');
// worker.postMessage('Hello Worker');
// worker.onmessage = event => console.log('Message from worker:', event.data);