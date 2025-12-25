document.addEventListener("DOMContentLoaded", function () {
  const contentContainer = document.getElementById("content-container");

  // Create and customize the <div> element
  const div = document.createElement("div");
  div.className = "main";
  div.id = "my-id";
  div.setAttribute("title", "generated Title");
  div.style.backgroundColor = "green";
  div.style.padding = "12px";
  div.style.borderRadius = "20px";
  div.textContent = "Created div node";

  // Append the <div> to the content container
  contentContainer.appendChild(div);

  console.log({ div });
});
