let email = "xyz@gmail.com";
let getDomain = email.substring(email.indexOf("@") + 1);
console.log("getDomain=", getDomain);

const randomStr = Math.random().toString(36).slice(2);
console.log("randomStr=", randomStr);

// Detect dark mode
// const isDarkMode =
//   window.matchMedia && window.matchMedia("prefers-color-scheme:dark").match;
