function createAndAppendDiv(
    className,
    id,
    title,
    backgroundColor,
    padding,
    margin,
    borderRadius,
    textContent
) {
    const div = document.createElement("div");
    div.className = className;
    div.id = id || Math.round(Math.random() * 10 + 1); // Use provided ID or generate a random one
    div.setAttribute("title", title || "generated Title");
    div.style.backgroundColor = backgroundColor || "green";
    div.style.padding = padding || "12px";
    div.style.margin = margin || "10px";
    div.style.borderRadius = borderRadius || "20px";

    const addText = document.createTextNode(textContent || "Created div node");
    div.appendChild(addText);

    document.body.appendChild(div);

    console.log({ div, addText });
}

// Example usage
createAndAppendDiv(
    "main2",
    "my-id2",
    "Custom Title2",
    "orange",
    "15px",
    "5px",
    "10px",
    "Custom Text2"
);
createAndAppendDiv(
    "other",
    null,
    "ano-title",
    "red",
    "15px",
    null,
    "10px",
    "Another Text"
);

// using loop:

function createAndAppendDivs() {
    const colors = ["red", "blue", "green", "orange", "purple"];
    const texts = ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"];

    for (let i = 0; i < colors.length; i++) {
        const div = document.createElement("div");
        div.className = "main";
        div.style.backgroundColor = colors[i];
        div.style.padding = "12px";
        div.style.margin = "10px";
        div.style.borderRadius = "20px";

        const addText = document.createTextNode(texts[i]);
        div.appendChild(addText);

        document.body.appendChild(div);

        console.log({ div, addText });
    }
}

// Call the function to create and append the divs
createAndAppendDivs();
