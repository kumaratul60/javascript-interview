

for (let i = 10; i >= 0; i--) {
    setTimeout(function () {
        console.log(i);
    }, (10 - i) * 800)
}