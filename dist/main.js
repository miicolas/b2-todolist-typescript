import { TaskController } from "./controllers/task-controller.js";
const taskListElement = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const taskController = new TaskController("1");
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    console.log(title, description, dueDate);
    const newTask = {
        id: "",
        title,
        description,
        dueDate: new Date(dueDate),
        completed: false,
        userId: "1"
    };
    taskController.createTask(newTask);
});
function taskListItem(task) {
    var _a;
    const taskListItemElement = document.createElement("li");
    taskListItemElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Due date: ${((_a = task.dueDate) === null || _a === void 0 ? void 0 : _a.toLocaleDateString()) || "No due date"}</p>
        <button>Edit</button>
        <button>Delete</button>
        <button>Mark as Complete</button>
        `;
    return taskListItemElement;
}
function renderTasks() {
    taskListElement.innerHTML = "";
    const tasks = taskController.getAllTasks();
    console.log(tasks);
    tasks.forEach(task => {
        taskListElement.appendChild(taskListItem(task));
    });
}
renderTasks();
