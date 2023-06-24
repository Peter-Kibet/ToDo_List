import "./style.css";

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const todoList = document.getElementById("todo-list");
const addTaskButton = document.getElementById("add-task-button");
const newTaskInput = document.getElementById("new-task-input");
const clearAllButton = document.getElementById("clear-all-button");

function renderTasks() {
  todoList.innerHTML = "";

  tasks.forEach((task, i) => {
    const listItem = document.createElement("li");
    listItem.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
    });
    listItem.appendChild(checkbox);

    const taskDescription = document.createElement("span");
    taskDescription.classList.add("task-description");
    taskDescription.innerText = task.description;
    taskDescription.addEventListener("click", () => {
      editTaskDescription(i);
      renderTasks();
    });
    listItem.appendChild(taskDescription);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.style.display = "none";
    deleteButton.addEventListener("click", () => {
      deleteTask(i);
      renderTasks();
    });
    listItem.appendChild(deleteButton);

    const ellipsisButton = document.createElement("button");
    ellipsisButton.classList.add("ellipsis-button");
    ellipsisButton.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
    ellipsisButton.addEventListener("click", () => {
      deleteButton.style.display = "inline-block";
      ellipsisButton.style.display = "none";
    });
    listItem.appendChild(ellipsisButton);

    todoList.appendChild(listItem);
  });
}

function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length,
  };
  tasks.push(newTask);
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateIndexes();
  saveTasks();
}

function editTaskDescription(index) {
  const newDescription = prompt("Enter new task description:");
  if (newDescription !== null) {
    tasks[index].description = newDescription;
    saveTasks();
  }
}

function updateIndexes() {
  tasks.forEach((task, i) => {
    task.index = i;
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskButton.addEventListener("click", () => {
  const newTaskDescription = newTaskInput.value;
  if (newTaskDescription.trim() !== "") {
    addTask(newTaskDescription);
    renderTasks();
    newTaskInput.value = "";
  }
});

newTaskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTaskButton.click();
  }
});

clearAllButton.addEventListener("click", () => {
  tasks.splice(
    0,
    tasks.length,
    ...tasks.filter((task) => task.completed === false)
  );
  updateIndexes();
  saveTasks();
  renderTasks();
});

renderTasks();
