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

console.log(getReferenceChild.nextElementSibling); // <h2>next sibling</h2>, if nothing is present shows as null

// Creating Elements
{
  /*
    const pElem = document.createElement("p");
    pElem.innerText = "This is a text added dynamically.";
    document.body.appendChild(pElem);
    //console.log(pElem);
    */
}

// Insert Elements
{
  /*
        const span = document.createElement("span");
        span.innerText = "I am a Span";
        const pElem = document.querySelector("p")
        //console.log(pElem.nextElementSibling);
        document.body.insertBefore(span, pElem.nextElementSibling);
    */
}

// Modifying Content

{
  // if using innerHTML then it can be cause of XSS attack, for this use DOMPurify library that sanitize the HTML:
  //  like: DOMPurify.sanitize('<u>Hello How</u> are You doing?')
  /*
    const pElem = document.querySelector("p");
    pElem.innerHTML = "<u>Hello How</u> are You doing?"

    const divElem = document.querySelector("div");

    console.log("Inner Text", divElem.innerText); // it will not shows text if style implement as display:none
    console.log("Text Content", divElem.textContent); // it will shows text
    */
}

// Removing/replacing Elements

{
  /*
    let list = document.getElementById("myList");
    const itemToRemove = list.children[0];
    //list.removeChild(itemToRemove);
    //console.log(list.children)
    const pElem = document.querySelector("p");
    list.replaceChildren(pElem)

    document.getElementById("removeMe").remove()
    */
}

// Read, Write, and Remove Attributes
{
  /*
    const imageElem = document.querySelector("img")

    console.log(imageElem.getAttribute('scr'))// imageName.png
    console.log(imageElem.getAttribute('alt'))// image Name

    imageElem.setAttribute("src", "banner.png");
    imageElem.setAttribute("alt", "banner");

    imageElem.removeAttribute("height");

    imageElem.hasAttribute("src") // true
    imageElem.hasAttribute("height") // false
    */
}

// Traversing/Navigating DOM

{
  // parentElement and parentNode
  // * parentElement and parentNode both we can use on an element to get its parent element
  //const span = document.getElementById("text");
  /////
  // Node: Everything that get attached into the dom from the document or body, including the text node or comment node etc.
  // Element: That represent the HTML Element
  // Node: node means everything including slashes,comments,elements
  // Elements: Elements means those only that map to HTMLElements
  //////
  // get parent of current span
  console.log("Parent Element", span.parentElement);
  console.log("Parent Node", span.parentNode);

  //get parent of parent of current span
  // *using span.parentElement.parentElement or  span.parentNode.parentNode we can move upper side of current node recursively.
  // console.log("Parent Element", span.parentElement.parentElement);
  // console.log("Parent Node", span.parentNode.parentNode);
  ////
  // children and childNodes
  // children: it return a HTMLCollection (Array-Like: need to convert in array then perform array operation)
  // ChileNode: it return a NodeList (already is array)
  // childNode return all the node wrt element node, comment node, text node or whatever node.
  // children return only the HTML element
  /////
  // const mainElem = document.getElementById("main-id");
  // console.log("Children", mainElem.children);
  // console.log("Child Node", mainElem.childNodes);
  ////
  // console.log("First Child", mainElem.firstChild); //return a Node
  // console.log("First Child Element", mainElem.firstElementChild);// return actual element

  ////
  // Node: node means everything including slashes,comments,elements
  // Elements: Elements means those only that map to HTMLElements
  ////
  // nextSibling
  // nextElementSibling
  // previousSibling
  // previousElementSibling
}

// Manipulating Styles
{
  /*const pElem = document.getElementById("p-id");
    console.log(pElem.style)
    pElem.style.backgroundColor = "pink";
    */
}

// Manipulating Classes
{
  /*
    const mainDivElem = document.getElementById("main-id");

    // console.log(mainDivElem.className)
    // mainDivElem.className = "secondary-class";
    // console.log(mainDivElem.className);

    console.log(mainDivElem.classList);

    mainDivElem.classList.add("test");

    mainDivElem.classList.remove("layout");

    mainDivElem.classList.replace("main-class", "secondary-class");

    console.log("Does it have test?", mainDivElem.classList.contains("test"));

    console.log("Does it have main-class?", mainDivElem.classList.contains("main-class"));

    mainDivElem.classList.toggle("test");
    mainDivElem.classList.toggle("test");
    */
}

// Controlling Visibilities
{
  /*
    const mainDivElem = document.getElementById("main-id");
    //mainDivElem.style.display = "block";

    //mainDivElem.style.visibility = "hidden"

    opacity{
    0: hidden
    0.5: light visibility
    1: full
    }
    mainDivElem.style.opacity = "1"
    */
}

