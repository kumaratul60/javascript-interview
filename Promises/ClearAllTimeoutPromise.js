// todo: implement with promise

let timeoutPromises = [];
function setPromises(callback, timeout) {
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      callback();
      resolve();
    }, timeout);
  });
  timeoutPromises.push(timeoutPromise);
}

function clearAllTimeout() {
  Promise.all(timeoutPromises).then(() => {
    timeoutPromises = [];
  });
}

setPromises(() => {
  console.log('timeout1');
}, 1000);
setPromises(() => {
  console.log('timeout2');
}, 2000);
setPromises(() => {
  console.log('timeout3');
}, 3000);

clearAllTimeout();

//

const timers = new Set();

function setTimeoutSafe(cb, ms) {
  const id = setTimeout(() => {
    timers.delete(id); // cleanup after run
    cb();
  }, ms);

  timers.add(id);
  return id;
}

function clearAllTimeouts() {
  for (const id of timers) {
    clearTimeout(id);
  }
  timers.clear();
}

setTimeoutSafe(() => console.log('timeout1'), 1000);
setTimeoutSafe(() => console.log('timeout2'), 2000);
setTimeoutSafe(() => console.log('timeout3'), 3000);

clearAllTimeouts(); //  cancels all
