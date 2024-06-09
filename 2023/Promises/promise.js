const promiseOne = new Promise(function (resolve, reject) {
  //Do an async task
  // DB calls, cryptography, network
  setTimeout(function () {
    console.log("Async task is compelete");
    resolve();
  }, 1000);
});

promiseOne.then(function () {
  console.log("Promise consumed");
});

new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log("Async task 2");
    resolve();
  }, 1000);
}).then(function () {
  console.log("Async 2 resolved");
});

const promiseThree = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve({ username: "Chai", email: "chai@example.com" });
  }, 1000);
});

promiseThree.then(function (user) {
  console.log(user);
});

const promiseFour = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let error = true;
    if (!error) {
      resolve({ username: "hitesh", password: "123" });
    } else {
      reject("ERROR: Something went wrong");
    }
  }, 1000);
});

promiseFour
  .then((user) => {
    console.log(user);
    return user.username;
  })
  .then((username) => {
    console.log(username);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(() => console.log("The promise is either resolved or rejected"));

const promiseFive = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let error = true;
    if (!error) {
      resolve({ username: "javascript", password: "123" });
    } else {
      reject("ERROR: JS went wrong");
    }
  }, 1000);
});

async function consumePromiseFive() {
  try {
    const response = await promiseFive;
    console.log({response});
  } catch (error) {
    console.log({error});
  }
}

consumePromiseFive();

async function getAllUsers(){
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        const data = await response.json()
        console.log({data});
    } catch (error) {
        console.log("E: ", error);
    }
}

getAllUsers()

// fetch("https://api.github.com/users/kumaratul60")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => console.log("err", error));

// promise.all


// Extention promise reading


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