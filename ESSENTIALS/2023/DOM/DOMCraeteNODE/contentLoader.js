function createAndAppendDiv(
  className,
  id,
  title,
  backgroundColor,
  padding,
  borderRadius,
  textContent
) {
  // Use the DOMContentLoaded event to ensure the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    const div = document.createElement("div");
    div.className = className;
    div.id = id || Math.round(Math.random() * 10 + 1);
    div.setAttribute("title", title || "generated Title");
    div.style.backgroundColor = backgroundColor || "green";
    div.style.padding = padding || "12px";
    div.style.borderRadius = borderRadius || "20px";

    const addText = document.createTextNode(textContent || "Created div node");
    div.appendChild(addText);

    document.body.appendChild(div);

    console.log({ div, addText });
  });
}

// Example usage
createAndAppendDiv(
  "mainLoaded",
  "my-id-loader",
  "Custom Title-loader",
  "pink",
  "15px",
  "10px",
  "Custom loader Text"
);
