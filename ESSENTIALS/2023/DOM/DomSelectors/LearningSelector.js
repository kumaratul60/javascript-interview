// getElementById: Retrieves an element by its unique ID attribute.
const elementId = document.getElementById("#myElementId");

// getElementsByClassName: Retrieves a collection of elements that have the specified class name.
const elementClass = document.getElementsByClassName(".myClassName");

// getElementsByTagName: Retrieves a collection of elements with the specified HTML tag name.
const elementTag = document.getElementsByTagName("p");

// querySelector: Retrieves the first element that matches the specified CSS selector.
const elementQ = document.querySelector(".mySelector");

// querySelectorAll: Retrieves a NodeList of elements that match the specified CSS selector.
const elementQl = document.querySelectorAll(".mySelector");

// createElement: Creates a new HTML element.
const newElement = document.createElement("div");

// appendChild: Appends a new child element to a parent element.
parentElement.appendChild(newElement);

// setAttribute: Sets the value of an attribute for an element.
element.setAttribute("class", "myClass");

// addEventListener: Adds an event listener to an element to respond to specific events (e.g., click, hover).
element.addEventListener("click", eventHandler);

// classList: Manipulates an element's classes.
element.classList.add("newClass");
element.classList.remove("oldClass");
element.classList.toggle("active");

// innerHTML: Sets or gets the HTML content of an element.
element.innerHTML = "<p>New content</p>";

// innerText: Sets or gets the text content of an element.
element.innerText = "New text";

//  if you style  it display:none, innerContent still get all text content, while innerText not show hidden text
element.textContent = "This is <strong>bold</strong> text.";

// innerText vs textContent
<div id="myElement">
  This is <strong>bold</strong> text.
  <span style="display: none;">Hidden content</span>
</div>;

const element = document.getElementById("myElement");

// Using innerText
element.innerText = "Updated text using innerText";
/**
 The <strong> tag will be removed, and the content inside it will be treated as plain text. Additionally, the hidden <span> element's content will not be included because of the display: none style.
 */

// Using textContent
element.textContent = "Updated text using textContent";
/**
The <strong> tag and the hidden <span> element's content will both be included as plain text, regardless of the display: none style.
*/

// output with innerText = Updated text using innerText
//  output with textContent = Updated text using textContentHidden content

/***
 *innerText: considers the visibility of elements with display: none and doesn't include their content in the result.
 *textContent: includes all content, regardless of visibility or the display style

*/
