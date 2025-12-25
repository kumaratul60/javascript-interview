function highlightText(searchTerm) {
  // Get all elements containing text
  const elements = document.querySelectorAll("*:not(script)");
  // Loop through each element
  elements.forEach((element) => {
    const text = element.innerText;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    // Check if the element's text contains the search term
    if (text.match(regex)) {
      // Split the text into parts (matched and unmatched)
      const parts = text.split(regex);
      // Create a new HTML structure with the matched term highlighted
      const highlightedText = parts
        .map((part) =>
          part.match(regex)
            ? `<span style="background-color: yellow;">${part}</span>`
            : part
        )
        .join("");
      // Replace the original text with the highlighted version
      element.innerHTML = highlightedText;
    }
  });
}
// Usage: Call the function with the search term you want to highlight
highlightText("JavaScript");
