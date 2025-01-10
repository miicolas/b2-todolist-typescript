var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Imports
import { TaskController } from "./controllers/task-controller.js";
import { deleteToken } from "./utils/del-token.js";
import { getSession } from "./utils/get-session.js";
// Récupération du TOKEN
const token = getSession();
// Si il n'y a pas de TOKEN -> redirection vers la page de connexion
if (!token) {
    console.log("No token found, redirecting to signin page");
    window.location.href = "/views/index.html";
}
// Récupération du bouton de logout
const logoutElement = document.getElementById("logout-btn");
logoutElement.addEventListener("click", (e) => {
    deleteToken();
    window.location.reload();
});
// Récupération du bouton de logout
const iconElement = document.getElementById("icon");
iconElement.addEventListener("click", (e) => {
    logoutElement.classList.toggle("slide-out");
    logoutElement.classList.toggle("slide-in");
    logoutElement.classList.remove("hidden");
});
// Récupération de la liste des tâches du formulaire de création de tâches
const taskListElement = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
// Création d'un TaskController
const taskController = new TaskController();
// Stockage du TaskController dans le navigateur
window.taskController = taskController;
// Lorsque le formulaire est soumis :
taskForm.addEventListener("submit", (event) => {
    // Empeche la page de s'actualiser
    event.preventDefault();
    // Récupération des éléments du formulaire
    const titleElement = document.getElementById("title");
    const descriptionElement = document.getElementById("description");
    const dueDateElement = document.getElementById("due-date");
    // Si un élément n'est pas trouvé -> stop la fonction
    if (!titleElement || !descriptionElement || !dueDateElement) {
        console.log("Title, description, or dueDate input not found");
        return;
    }
    // Récupération des valeurs du formulaire
    const title = titleElement.value;
    const description = descriptionElement.value;
    const dueDate = dueDateElement.value;
    // Si une valeur est vide -> stop la fonction
    if (!title || !description || !dueDate) {
        console.log("Please enter a title, a description, and a dueDate");
        return;
    }
    // Création d'une tâche et réinitialise le formulaire
    taskController.createTask(title, description, dueDate);
    taskForm.reset();
});
// Template des tâches
function taskListItem(task) {
    const taskListItemElement = document.createElement("tr");
    const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString("fr-FR") : "No due date";
    taskListItemElement.innerHTML = `
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" data-task-id="${task.id}">
            <th scope="row" class="px-6 py-4 font-medium">
                ${task.title}
            </th>
            <td class="px-6 py-4">
                 ${task.description}
            </td>
            <td class="px-6 py-4">
                ${dueDate}
            </td>
            <td class="px-6 py-4">
                ${task.completed ? "Completed" : "Not completed"}
            </td>
            <td class="px-6 py-4" data-task-id="${task.id}">
                <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" data-task="delete">Delete</button>
                <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" data-task="complete">Complete</button>
                <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" data-task="edit">Edit</button>
            </td>
        </tr>
    `;
    // Récupération des boutons des tâches
    const deleteTaskButton = taskListItemElement.querySelector('[data-task="delete"]');
    const editTaskButton = taskListItemElement.querySelector('[data-task="edit"]');
    const completeTaskButton = taskListItemElement.querySelector('[data-task="complete"]');
    // Suppression de la tâche
    deleteTaskButton.addEventListener("click", () => {
        var _a;
        const taskId = (_a = completeTaskButton.closest('[data-task-id]')) === null || _a === void 0 ? void 0 : _a.getAttribute("data-task-id");
        if (!taskId) {
            console.log("Task id not found");
            return;
        }
        taskController.deleteTask(taskId);
        window.location.reload();
    });
    // Modification de la tâche
    editTaskButton.addEventListener("click", () => {
        console.log("Edit task");
    });
    // Complétion de la tâche
    completeTaskButton.addEventListener("click", () => {
        var _a;
        const taskId = (_a = completeTaskButton.closest('[data-task-id]')) === null || _a === void 0 ? void 0 : _a.getAttribute("data-task-id");
        if (!taskId) {
            console.log("Task id not found");
            return;
        }
        taskController.completeTask(taskId);
        window.location.reload();
    });
    return taskListItemElement;
}
function renderTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        taskListElement.innerHTML = "";
        const tasks = yield taskController.getAllTasks();
        if (Array.isArray(tasks)) {
            tasks.forEach(task => {
                taskListElement.appendChild(taskListItem(task));
            });
        }
        else {
            console.error("Tasks is not an array:", tasks);
        }
    });
}
renderTasks();
