/**
 ** AbortController -> cancels an ongoing async operation

 * Debounce  -> controls WHEN a function runs
 * Throttle  -> controls HOW OFTEN a function runs


 Used for:

  * API requests
  * Streams
  * File uploads/downloads
  * Long-running async tasks


  User types
    ↓
Debounce
    ↓
Wait 500ms of inactivity
    ↓
Abort previous request
    ↓
Start new request

> Because the abort happens before the new request starts.

----------------------------------

  Scroll Event
        ↓
  Throttle
        ↓
  API starts
        ↓
  AbortController
        ↓
  Cancel request if needed
 */

const controller = new AbortController();

fetch('/users', {
  signal: controller.signal,
});

controller.abort();

// Debounce + AbortController: Search box example:

let controllerD;

const search = debounce(async (query) => {
  controllerD?.abort();

  controllerD = new AbortController();

  const response = await fetch(`/api/search?q=${query}`, {
    signal: controllerD.signal,
  });

  const data = await response.json();

  console.log(data);
}, 500); // Only latest request survives.

// Throttle + AbortController: Scroll example:

let controllerT;

const loadMore = throttle(async () => {
  controllerT?.abort();

  controllerT = new AbortController();

  await fetch('/api/posts', {
    signal: controllerT.signal,
  });
}, 1000);

// Throttle controls how often requests start.
// AbortController can cancel an in-flight request.

// React useEffect Cleanup
// Cleanup prevents memory leaks and
// avoids updating state after unmount.
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/user', {
    signal: controller.signal,
  });

  return () => {
    controller.abort();
  };
}, []);

// Manual Cancel Button
const controllerM = new AbortController();

fetch('/api/data', {
  signal: controllerM.signal,
});

cancelBtn.onclick = () => {
  controllerM.abort();
};
