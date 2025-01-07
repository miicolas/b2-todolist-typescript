import { TaskController } from "./controllers/task-controller.js";
const taskListElement = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const taskController = new TaskController("2");
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    console.log(title, description, dueDate);
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
            
            <div class="flex justify-end gap-2">
                <button class="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                    </svg>
                </button>
                <button class="p-2 text-red-600 hover:bg-red-50 rounded-full">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                </button>
                <button class="p-2 text-green-600 hover:bg-green-50 rounded-full">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <path d="M22 4L12 14.01l-3-3"/>
                    </svg>
                </button>
            </div>
        </div>
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
