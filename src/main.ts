import { TaskController } from "./controllers/task-controller.js";
import { Task } from "./models/type.js";
import { getSession } from "./utils/get-session.js";

const token = getSession();
if (!token) {
    console.log("No token found, redirecting to signin page");
    window.location.href = "/";
}

const taskListElement = document.getElementById("task-list") as HTMLElement;
const taskForm = document.getElementById("task-form") as HTMLFormElement;

const taskController = new TaskController("2");

(window as any).taskController = taskController;

taskForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLInputElement).value;
    const dueDate = (document.getElementById("due-date") as HTMLInputElement).value;

    taskController.createTask(title, description, dueDate);
    taskForm.reset();
});

function taskListItem(task: Task) {
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
    const deleteTaskButton = taskListItemElement.querySelector('[data-task="delete"]') as HTMLButtonElement;
    const editTaskButton = taskListItemElement.querySelector('[data-task="edit"]') as HTMLButtonElement;
    const completeTaskButton = taskListItemElement.querySelector('[data-task="complete"]') as HTMLButtonElement;

    deleteTaskButton.addEventListener("click", () => {
        console.log("Delete task");
    });

    editTaskButton.addEventListener("click", () => {
        console.log("Edit task");
    });

    completeTaskButton.addEventListener("click", () => {
        console.log("Complete task");
    });
    
    return taskListItemElement;
}

async function renderTasks() {
    taskListElement.innerHTML = "";
    const tasks = await taskController.getAllTasks();
    if (Array.isArray(tasks)) {
        tasks.forEach(task => {
            taskListElement.appendChild(taskListItem(task));
        });
    } else {
        console.error("Tasks is not an array:", tasks);
    }}

renderTasks();