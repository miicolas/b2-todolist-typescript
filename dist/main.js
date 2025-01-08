import { TaskController } from "./controllers/task-controller.js";
import { getSession } from "./utils/get-session.js";
const token = getSession();
console.log("Token:", token); // Ajoutez ce log pour vérifier la valeur du token
if (!token) {
    console.log("No token found, redirecting to signin page"); // Ajoutez ce log pour vérifier que la redirection est exécutée
    window.location.href = "/";
}
const taskListElement = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const taskController = new TaskController("2");
window.taskController = taskController;
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    taskController.createTask(title, description, dueDate);
    taskForm.reset();
});
function taskListItem(task) {
    const taskListItemElement = document.createElement("li");
    const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString("fr-FR") : "No due date";
    taskListItemElement.innerHTML = `
        <div class="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-800">${task.title}</h3>
                <span class="text-sm text-gray-500">${dueDate}</span>
            </div>
            
            <p class="text-gray-600 mb-4">${task.description}</p>
            
            <div class="flex justify-end gap-2" data-task-id="${task.id}">
                <button class="p-2 text-blue-600 hover:bg-blue-50 rounded-full" onclick="console.log('Edit task')" data-task="edit">
                </button>
                <button class="p-2 text-red-600 hover:bg-red-50 rounded-full" data-task="delete">
                </button>
                <button class="p-2 text-green-600 hover:bg-green-50 rounded-full" data-task="complete">
                </button>
            </div>
        </div>
    `;
    const deleteTaskButton = taskListItemElement.querySelector('[data-task="delete"]');
    const editTaskButton = taskListItemElement.querySelector('[data-task="edit"]');
    const completeTaskButton = taskListItemElement.querySelector('[data-task="complete"]');
    deleteTaskButton.addEventListener("click", () => {
        taskController.deleteTask(task.id);
        taskListItemElement.remove();
    });
    editTaskButton.addEventListener("click", () => {
        console.log("Edit task");
    });
    completeTaskButton.addEventListener("click", () => {
        console.log("Complete task");
    });
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
