// todo: implement with promise

let timeoutPromises = [];
function setPromises(callback, timeout) {
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            callback();
            resolve();
        }, timeout);

    })
    timeoutPromises.push(timeoutPromise);
}

function clearAllTimeout() {
    Promise.all(timeoutPromises).then(() => {
        timeoutPromises = []
    })
}


setPromises(() => {
    console.log("timeout1");
}, 1000)
setPromises(() => {
    console.log("timeout2");
}, 2000)
setPromises(() => {
    console.log("timeout3");
}, 3000)


clearAllTimeout()

