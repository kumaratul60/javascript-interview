
/***
const element = document.getElementById("#myElementId");
const elements = document.getElementsByClassName(".myClassName");
const elements = document.getElementsByTagName("p");
const element = document.querySelector(".mySelector");
const elements = document.querySelectorAll(".mySelector");
const newElement = document.createElement("div");
*/
const getElement = document.querySelector(".parent"); // parent to child traverse

const children = getElement.children; // HTMLCollection

const childNodes = getElement.childNodes; // NodeCollection

const getFirstChildText = children[0].innerHTML; // Monday

const firstElement = getElement.firstElementChild;
const lastElement = getElement.lastElementChild;

console.log("parent to child traverse", {
  getElement,
  children,
  childNodes,
  getFirstChildText,
  firstElement,
  lastElement,
});

// Child to parent traverse

const dayOne = document.querySelector(".day");
const parentOfDayOne = dayOne.parentElement;
const nextSibling = dayOne.nextElementSibling;

console.log("Child to parent traverse", {
  dayOne,
  parentOfDayOne,
  nextSibling,
});

for (let i = 0; i < children.length; i++) {
  const loopText = children[i].innerHTML;
  children[i].style.backgroundColor = "gray";
  children[i].style.color = "orange";
  children[i].style.padding = "10px";
  children[i].style.margin = "10px";
  children[i].style.borderRadius = "10px";
  children[4].innerHTML = "change text";
  children[4].style.backgroundColor = "green";
  // console.log({ loopText });
}
