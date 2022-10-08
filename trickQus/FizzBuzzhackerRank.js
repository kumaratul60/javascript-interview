const n = 100;
function fizzBuzz(n) {
    // Write your code here
    for(let i=1;i<=n.length;i++){
        const res = i%3===0 && i%5===0?"FizzBuzz":i%3===0?"Fizz":i%5===0?"Buzz":i;
    console.log( res);
    }

}


    // const n = parseInt(readLine().trim(), 10);

    fizzBuzz(n);


