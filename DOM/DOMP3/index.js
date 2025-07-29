console.log("Project: TODO");

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const task = taskInput.value;

  if (task.trim() === "") return;

  const li = document.createElement("li");

  li.innerText = task;

  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✅";
  completeBtn.style.marginLeft = "5px";
  completeBtn.onclick = function () {
    li.classList.toggle("completed");
  };
  li.appendChild(completeBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.style.marginLeft = "5px";
  deleteBtn.onclick = function () {
    li.remove();
  };
  li.appendChild(deleteBtn);

  taskList.appendChild(li);

  taskInput.value = "";
}

function filterTasks() {
  const taskInput = document.getElementById("searchInput");
  const taskList = document.querySelectorAll("ul#taskList li");
  const task = taskInput.value;
  taskList.forEach((item) => {
    item.style.display = item.innerText.toLowerCase().includes(task.toLowerCase())
      ? "list-item"
      : "none";
  });
}
