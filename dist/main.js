// Imports
import { TaskController } from "./controllers/task-controller.js";
import { getSession } from "./utils/get-session.js";
// Récupération du TOKEN
const token = getSession();
console.log("Token:", token);
// Si il n'y a pas de TOKEN -> redirection vers la page de connexion
if (!token) {
    console.log("No token found, redirecting to signin page");
    window.location.href = "/";
}
// Récupération de la liste des tâches du formulaire de création de tâches
const taskListElement = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
// Création d'un TaskController
const taskController = new TaskController("2");
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
    // Récupération des boutons des tâches
    const deleteTaskButton = taskListItemElement.querySelector('[data-task="delete"]');
    const editTaskButton = taskListItemElement.querySelector('[data-task="edit"]');
    const completeTaskButton = taskListItemElement.querySelector('[data-task="complete"]');
    // Suppression de la tâche
    deleteTaskButton.addEventListener("click", () => {
        taskController.deleteTask(task.id);
        taskListItemElement.remove();
    });
    // Modification de la tâche
    editTaskButton.addEventListener("click", () => {
        console.log("Edit task");
    });
    // Complétion de la tâche
    completeTaskButton.addEventListener("click", () => {
        console.log("Complete task");
    });
    return taskListItemElement;
}
// Affichage des tâches
function renderTasks() {
    taskListElement.innerHTML = "";
    const tasks = taskController.getAllTasks();
    console.log(tasks);
    tasks.forEach(task => {
        taskListElement.appendChild(taskListItem(task));
    });
}
renderTasks();
