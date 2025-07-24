console.log("test dom");

// Dom:
// Dom Types:
// 1. Document
// Document is a root node in the DOM tree, It exist on top of HTML. The document represent entire tree.
console.log(document, document.head, document.title, document.body); // complete web page under document
console.log(document.URL); // current page url

// 2. Node: Any item in dom tree is called as node. i.e: Element Node, Text Node, Attribute Node.
// 3. Element: A specific type of node that represents HTML tags/elements like <p>,<div>, etc
//  4. NodeList: An array of Nodes
// 5. Attr: It represents the attributes of a node.
// <img src = "/path" alt="some image"/> // so this img has 2 attribute
// 6. NameNodeMap: A collection of Attr.

// Accessing DOM:
// id vs class: Id will be unique for across the web pages but class can be repeated.

// by Id
let titleElem = document.getElementById("heading");
console.log({ titleElem }, titleElem);

// by class
let titleClassElem = document.getElementsByClassName("info");
console.log(titleClassElem); // HTMLCollection(2): [p.info, p.info]
// it is an array-like, that look like array but not an array because it's prototype is a HTMLCollection and when expand that prototype collection it shows as prototype as Object not Array.

// How to iterate over the titleClassElem
// 1. console.log(titleClassElem[0], titleClassElem[1]);
// 2.
[...titleClassElem].forEach((elem) => {
  console.log(elem);
});

// By Tag name
const pTagElem = document.getElementsByTagName("p");
console.log(pTagElem); // HTMLCollection(2):

// Selectors: Query Selector and Query Selector All
// Query Selector - querySelector(): it is responsible for giving you the first matching element node with the selector that we passing as argument in to it.

// Selectors: In CSS the selectors are the pattern to reach and select the elements with the state of css rules.
// There are different selectors, combinator, separators are available in css using which you can select a particular element.

const para = document.querySelector("p");
const paraInfo = document.querySelector("p.info");
console.log(paraInfo, "::para"); // first p tag shows

// querySelectorAll()
const paras = document.querySelectorAll("p.info");
console.log(paras, "::paras"); // NodeList(2)

// if you want to use id with querySelector use with pound sign(#), it'll similarly work as getElementById
const h1All = document.querySelectorAll("heading"); //NodeList []
const h1All1 = document.querySelectorAll("#heading"); //NodeList [h1#heading]
const h1Al2 = document.querySelector("heading"); // null
const h1Al3 = document.querySelector("#heading"); //<h1 id="heading">"Learning Dom"</h1>
console.log(h1All, h1All1, h1Al2, h1Al3, "::hall");

// document.getElementsByName(elementName);
// document.getElementsByTagNameNS(namespaceURI, localName);
// document.getRootNode();
// document.getSelection()