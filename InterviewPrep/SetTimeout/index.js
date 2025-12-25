let timerId = 0;
const macrotaskQueue = [];   // timers (setTimeout, setInterval)
const microtaskQueue = [];   // Promises, queueMicrotask
const nextTickQueue = [];    // process.nextTick

// ---------- Timers ----------
function mySetTimeout(callback, delay) {
    const id = ++timerId;
    macrotaskQueue.push({
        id,
        callback,
        delay,
        interval: false,
        start: Date.now()
    });
    return id;
}

function mySetInterval(callback, delay) {
    const id = ++timerId;
    macrotaskQueue.push({
        id,
        callback,
        delay,
        interval: true,
        start: Date.now()
    });
    return id;
}

function myClearTimeout(id) {
    const idx = macrotaskQueue.findIndex(t => t.id === id);
    if (idx !== -1) macrotaskQueue.splice(idx, 1);
}

function myClearAllTimeouts() {
    macrotaskQueue.length = 0;
}

// ---------- Microtasks ----------
function myQueueMicrotask(callback) {
    microtaskQueue.push(callback);
}

function myPromiseResolve(value) {
    return {
        then(cb) {
            myQueueMicrotask(() => cb(value));
        }
    };
}

// ---------- NextTick ----------
function myProcessNextTick(callback) {
    nextTickQueue.push(callback);
}

// ---------- Cross-platform scheduler ----------
function scheduleNextTick(fn) {
    if (typeof requestAnimationFrame !== "undefined") {
        requestAnimationFrame(fn);
    } else if (typeof setImmediate !== "undefined") {
        setImmediate(fn);
    } else {
        setTimeout(fn, 0);
    }
}

// ---------- Event Loop ----------
function tick() {
    // 1. process.nextTick queue first
    while (nextTickQueue.length) {
        const job = nextTickQueue.shift();
        job();
    }

    // 2. then microtasks (Promises / queueMicrotask)
    while (microtaskQueue.length) {
        const job = microtaskQueue.shift();
        job();
    }

    // 3. then timers (macrotasks)
    const now = Date.now();
    for (let i = 0; i < macrotaskQueue.length; i++) {
        const t = macrotaskQueue[i];
        if (now - t.start >= t.delay) {
            t.callback();

            if (t.interval) {
                t.start = now;
            } else {
                macrotaskQueue.splice(i, 1);
                i--;
            }
        }
    }

    // Keep loop alive
    scheduleNextTick(tick);
}
tick();


// Node.js style demo
mySetTimeout(() => console.log("timeout 0"), 0);
if (typeof setImmediate !== "undefined") {
    setImmediate(() => console.log("immediate")); // Node only
}

myPromiseResolve().then(() => console.log("promise then"));
myQueueMicrotask(() => console.log("queueMicrotask"));
myProcessNextTick(() => console.log("nextTick"));

// Interval test
const id = mySetInterval(() => console.log("interval every 1s"), 1000);
mySetTimeout(() => {
    console.log("clearing interval");
    myClearTimeout(id);
}, 3500);
