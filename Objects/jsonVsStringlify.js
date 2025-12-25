// JSON.parse()
// receiving the data from the server

const txtParse = '{"name":"test","age":"25","city":"Mumbai"}';
const jsObj = JSON.parse(txtParse); // converting string into  Javascript object
console.log("parse:", jsObj);

// JSON.stringify()
// sending the data to the server

const txtStringify = '{"name":"test","age":"25","city":"Mumbai"}';
const jsObjStringify = JSON.stringify(txtStringify, null, 10); // converting Javascript object into string
// null -> it is a callback function or you can add/remove something in second parameter
// 10 -> it is for spacing
console.log("stringify:", jsObjStringify);
