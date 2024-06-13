const promising = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res("hay");
    }, 0);
    rej("oops");
  });

promising()
  .then(
    (err) => {
      console.log("caught", err);
    },
    (res1) => {
      console.log("res", res1);
    }
  )
  .finally(() => {
    console.log("settled");
  });


/*
12
1
10
13
3
5
8
2
7
9
4


two  queues/tasks

1. microtasks:[
(value=12)=>console.log(value+1)
  ()=>console.log(3),
  ()=>setTimeout(()=>console.log(4)),
  ()=>console.log(5),
  (()=>setTimeout(()=>console.log(6)),
  ()=>console.log(8),
]

2. macrotasks:[
  ()=>console.log(2),
  ()=>console.log(7),
  ()=>console.log(9),
  ()=>console.log(4),
  ()=>console.log(6),
]

*/

new Promise((resolve) => {
  console.log(12);
  resolve(12);
}).then((value) => console.log(value + 1));

console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
Promise.resolve().then(() => setTimeout(() => console.log(4)));
Promise.resolve().then(() => console.log(5));
Promise.resolve().then(() => setTimeout(() => console.log(6)));
setTimeout(() => console.log(7));
Promise.resolve().then(() => console.log(8));
setTimeout(() => console.log(9));
console.log(10);

