function highlight() {
  console.log("highlight text");
  const elem = document.getElementsByClassName("info"); // HTMLCollection
  const elem2 = document.querySelector("info"); //null
  const elem1 = document.querySelectorAll("p.info"); // NodeList

  elem1.forEach((el) => {
    // each of its p tag, will have an attribute called 'style', this is an implicit attribute comes with HTML
    el.style.backgroundColor = "yellow";
  });
}

function filterList() {
  const inputElem = document.getElementById("searchInput");
  const input = inputElem.value;
  const items = document.querySelectorAll("ul#itemList li"); // return NodeList of all the matching li that are inside ul with id itemList
  // if you've an element and from that element want to retrieve the text by property name is innerText
  items.forEach((item) => {
    // item.style.backgroundColor = item.innerText.toLowerCase().includes(input.toLowerCase())
    //   ? "green"
      //   : "";
      item.style.display = item.innerText.toLowerCase().includes(input.toLowerCase())?"block":"none"
  });
}
