import { TaskController } from "./controllers/task-controller.js";
import { Task } from "./models/type.js";


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
    taskForm.reset()
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                    </svg>
                </button>
                <button class="p-2 text-red-600 hover:bg-red-50 rounded-full" data-task="delete">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                </button>
                <button class="p-2 text-green-600 hover:bg-green-50 rounded-full" data-task="complete">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <path d="M22 4L12 14.01l-3-3"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    const deleteTaskButton = taskListItemElement.querySelector('[data-task="delete"]') as HTMLButtonElement;
    const editTaskButton = taskListItemElement.querySelector('[data-task="edit"]') as HTMLButtonElement;
    const completeTaskButton = taskListItemElement.querySelector('[data-task="complete"]') as HTMLButtonElement;

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