let timeouts = [];

timeouts.push(setTimeout(() => { console.log("hello") }, 2000))
timeouts.push(setTimeout(() => { console.log("hello1") }, 3000))
timeouts.push(setTimeout(() => { console.log("hello2") }, 4000))
timeouts.push(setTimeout(() => { console.log("hello3") }, 5000))



function clearAllTimeout() {
    // timeouts.forEach(clearTimeout);
    // timeouts=[]

    // or

    // timeouts.forEach(id => clearTimeout(id));


    while (timeouts.length) {
        clearTimeout(timeouts.pop())
    }
}

clearAllTimeout()