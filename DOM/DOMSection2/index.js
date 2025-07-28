// 1. Crate Element
const pElem = document.createElement("p");
console.log(pElem, "1");
// if innerText appear left side of assignment operator means setting value to an element
// if innerText appear right side of assignment operator means getting/fetching value to an element

// setting text to paragraph in DOM
pElem.innerText = "Adding p tag in dom";
console.log(pElem, "2");
// attaching this paragraph to DOM
document.body.appendChild(pElem);
console.log(pElem);

// 2. Insert Element
