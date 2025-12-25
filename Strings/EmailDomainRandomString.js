// Email Domain and Random String
let email = "xyz@gmail.com";
let getDomain = email.substring(email.indexOf("@") + 1);
console.log("getDomain=", getDomain);
const randomStr = Math.random().toString(36).slice(2);
console.log("randomStr=", randomStr);