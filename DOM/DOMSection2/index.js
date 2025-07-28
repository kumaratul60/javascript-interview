// 1. Create Element
const pElem = document.createElement("p");
console.log(pElem, "1");
// if innerText appear left side of assignment operator means setting value to an element
// if innerText appear right side of assignment operator means getting/fetching value to an element

// setting text to paragraph in DOM
pElem.innerText = "Adding p tag in dom";
console.log(pElem, "2");
// attaching this paragraph to DOM
// mark it: appendChild will always append something at the end
document.body.appendChild(pElem);
console.log(pElem);

// 2. Insert Element
const snapElem = document.createElement("span");
snapElem.innerText = "span text inserted"; // want to add this span before p tag

// insertBefore(element that want to insert, reference element that want to add)
const getReferenceChild = document.querySelector("p");
document.body.insertBefore(snapElem, getReferenceChild); // document.parent.insertBefore(node, child)
// document.body.insertBefore(snapElem, null);  if pass ref child as null then it'll add element at the end.
// document.body.insertBefore(snapElem, getReferenceChild.nextElementSibling);  if pass ref child as null then it'll add element at the end.

document.body.insertBefore(snapElem, getReferenceChild.nextElementSibling);
// getReferenceChild--> child --> p tag
// body --> parent --> p tag

console.log(getReferenceChild.nextElementSibling);// <h2>next sibling</h2>, if nothing is present shows as null

// Modifying Content

