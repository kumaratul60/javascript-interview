function addLanguages(language) {
  const li = document.createElement("li");
  li.innerHTML = language;
  const selectedClass = document.querySelector(".language-list");
  selectedClass.appendChild(li);
}
// let suppose we large scale  of list want to add so we have to traverse whole dom , this is expensive operation and memory in efficient problem
addLanguages("python");

// efficient way to add languages
function addEfficientLang(language) {
  const li = document.createElement("li");
  // const  adText = document.createTextNode(language)
  // li.appendChild(adText)
  li.appendChild(document.createTextNode(language));
  document.querySelector(".language-list").appendChild(li);
}
addEfficientLang("java");
addEfficientLang("go");
addEfficientLang("kotlin");
addEfficientLang("rust");

// Edit

const secLang = document.querySelector("li:nth-child(2)");
console.log(secLang);
// secLang.innerHTML = "ruby"; // not optimize way

// optimize way to update content
const newLi = document.createElement("li");
newLi.textContent = "Ruby";
secLang.replaceWith(newLi);

//  replace js with ts
// const firstLang = document.querySelector('li:nth-child(1)') // works
const firstLang = document.querySelector("li:first-child"); // also work
const newLi2 = document.createElement("li");
newLi2.innerHTML = "typeScript";
firstLang.replaceWith(newLi2);

//  replace rust with c++

const lastLang = document.querySelector("li:last-child"); // also work
lastLang.outerHTML = "<li>C++</li>";
// lastLang.outerText = "C++";

// remove

const lastLi = document.querySelector("li:last-child");
lastLi.remove();
