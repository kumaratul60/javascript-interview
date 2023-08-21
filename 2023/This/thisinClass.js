class User {
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    // this.age = age;
  }
  describeUser() {
    console.log(`Hi ${this.name} ur email is ${this.email}`);
  }
}

const user = new User("Atul", "atul@gmail.com");
user.describeUser();
