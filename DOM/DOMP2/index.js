console.log("Project: Toggle");

function toggleInfo() {
  console.log("Toggling");
  const para = document.getElementById("myParagraph");

  /*
    para.classList.toggle:
    para: html element
    classList: method to vanilla JS to add or remove/replace classes
    toggle: if a particular passes class is already present then remove it else add that class.

    */
  para.classList.toggle("hidden");
}
