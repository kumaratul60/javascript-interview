// const user ={
//     name:"Atul",
//     email:"atul@gmail.com",
//     like: "challenge",
//     sayHi :function(){
//         // console.log(this);
//         console.log(`Hi ${this.name} you like ${this.like}`);
//     }
// }
// user.sayHi()

function getUser() {
  console.log(
    `Hi ${this.name} you like ${this.like}, method is ${this.Method}`
  );
}

function getCallUser(calender, interest) {
  console.log(
    `Hi ${this.name} you like ${this.like}, method is ${this.Method}, calender is ${calender}, interest is ${interest}`
  );
}

const user = {
  name: "Atul",
  email: "atul@gmail.com",
  like: "challenge",
  Method: "Bind",
};
const user2 = {
  name: "Mark",
  email: "matk@gmail.com",
  like: "challenge mar",
  age: 28,
  Method: "Call",
};

const user3 = {
  name: "Johnny",
  email: "jhon@gmail.com",
  like: "jhon calky mar",
  age: 38,
  Method: "Call",
};

const user4 = {
  name: "Mark",
  email: "matk@gmail.com",
  like: "challenge mar",
  age: 28,
  Method: "Apply",
};
/***
 ** Bind() => when you want to create a new instance of the function and invoke it latter
 */

// getUser.bind(user)
// by using bind method it create a new instance of the function thats why if if call directly it will shows as undefine , so fiest save it in variable then call it.

// getUser() // undefine

const getUser1 = getUser.bind(user);
getUser1(); // works

/***
 ** Call() => when you want to invoke immediately without creating a new instance
 */
getUser.call(user2);
getCallUser.call(user3, 1990, "adv games");

/***

  ** Apply() => Similar to call method and pass additional arguments in list of array form with comma separated

*/

getCallUser.apply(user3, [1990, "adv games"]);
