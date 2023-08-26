class User {
  constructor(username) {
    this.username = username;
  }

  logMe() {
    console.log(`Username: ${this.username}`);
  }

  // by using static keyword we strict the createId method to access from all the classes or its instances
  static createId() {
    return `123`;
  }
}

const Bob = new User("Bob");
// console.log(Bob.createId())

class Teacher extends User {
  constructor(username, email) {
    super(username);
    this.email = email;
  }
}

const iphone = new Teacher("iphone", "i@phone.com");
iphone.logMe();
console.log(iphone.createId());
