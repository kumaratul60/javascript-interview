class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  /**

 never return setters

 
syntax of getter & setter

get: function () {
  return this._something;
}
set: function (value) {
  this._something = value;
}


*/

  get email() {
    // add _email to get new reference and avoid maximum call stack error
    return this._email.toUpperCase();
  }
  set email(value) {
    this._email = value;
  }

  get password() {
    return `${this._password}alice`;
  }

  set password(value) {
    this._password = value;
  }
}

const alice = new User("h@alice.ai", "abc");
console.log(alice.email);
