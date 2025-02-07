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
import { getSession } from "./utils/get-session.js";
import { deleteToken } from "./utils/del-token.js";
// Récupération du TOKEN
const token = getSession();
// Si il n'y a pas de TOKEN -> redirection vers la page de connexion
if (!token) {
    console.log("No token found, redirecting to signin page");
    window.location.href = "/";
}
// Récupération du bouton de logout
const logoutElement = document.getElementById("logout-btn");
// Suppression du TOKEN et renvoie vers la page de connexion
logoutElement.addEventListener("click", (e) => {
    deleteToken();
    window.location.reload();
});
// Récupération du bouton de logout
const iconElement = document.getElementById("icon");
// Animation du bouton de déconnexion
iconElement.addEventListener("click", (e) => {
    logoutElement.classList.toggle("slide-out");
    logoutElement.classList.toggle("slide-in");
    logoutElement.classList.remove("hidden");
});
// Récupération de la liste des tâches du formulaire de création de tâches
const taskListElement = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const closeButtonEdit = document.querySelector("[data-close-button]");
// Fermeture du modal d'édition
closeButtonEdit.addEventListener("click", () => {
    const modalEdit = document.getElementById("crud-modal");
    modalEdit.classList.add("hidden");
});
// Création d'un TaskController
const taskController = new TaskController();
// Stockage du TaskController dans le navigateur
window.taskController = taskController;
// Lorsque le formulaire est soumis :
taskForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    // Empeche la page de s'actualiser
    event.preventDefault();
    // Récupération des éléments du formulaire
    const titleElement = document.getElementById("title");
    const descriptionElement = document.getElementById("description");
    const dueDateElement = document.getElementById("due-date");
    // Si un élément n'est pas trouvé -> stop la fonction
    if (!titleElement || !descriptionElement || !dueDateElement) {
        return taskListElement;
    }
    // Récupération des valeurs du formulaire
    const title = titleElement.value;
    const description = descriptionElement.value;
    const dueDate = new Date(dueDateElement.value);
    // Si une valeur est vide -> stop la fonction
    if (!title || !description || !dueDate) {
        console.log("Please enter a title, a description, and a dueDate");
        return;
    }
    // Création d'une tâche et réinitialise le formulaire
    yield taskController.createTask(title, description, dueDate);
    taskForm.reset();
    renderTasks();
}));
// Template des tâches
function taskListItem(task) {
    if (!task || !task.title || !task.description || !task.dueDate) {
        console.error("Invalid task data:", task);
        return undefined;
    }
    const taskListItemElement = document.createElement('tr');
    const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString("fr-FR") : "No due date";
    taskListItemElement.innerHTML = `
        <td class="px-6 py-4 text-gray-100 font-medium">${task.title}</td>
        <td class="px-6 py-4 text-gray-200">${task.description}</td>
        <td class="px-6 py-4 text-gray-200">${dueDate}</td>
        <td class="px-6 py-4 text-gray-200">${task.completed ? "Completed" : "Not completed"}</td>
        <td class="px-6 py-4">
            <button class="edit-btn py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100" data-id="${task.id}">Edit</button>
            <button class="delete-btn py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100" data-id="${task.id}">Delete</button>
            <button class="complete-btn py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100" data-id="${task.id}">Complete</button>
        </td>
    `;
    // Récupération des boutons des tâches
    const deleteTaskButton = taskListItemElement.querySelector('.delete-btn');
    const editTaskButton = taskListItemElement.querySelector('.edit-btn');
    const completeTaskButton = taskListItemElement.querySelector('.complete-btn');
    // Suppression de la tâche
    if (deleteTaskButton) {
        deleteTaskButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const taskId = deleteTaskButton.getAttribute("data-id") ? parseInt(deleteTaskButton.getAttribute("data-id"), 10) : null;
            if (taskId) {
                yield taskController.deleteTask(taskId);
                renderTasks();
            }
        }));
    }
    else {
        console.error("Delete button not found for task:", task);
    }
    // Modification de la tâche
    if (editTaskButton) {
        editTaskButton.addEventListener("click", () => {
            const taskId = editTaskButton.getAttribute("data-id") ? parseInt(editTaskButton.getAttribute("data-id"), 10) : null;
            if (taskId) {
                const editTitleElement = document.getElementById("edit-title");
                const editDescriptionElement = document.getElementById("edit-description");
                const editDueDateElement = document.getElementById("edit-due-date");
                // Vérifiez que les éléments existent
                if (!editTitleElement || !editDescriptionElement || !editDueDateElement) {
                    console.log("Edit form elements not found");
                    return;
                }
                // Mise à jour des valeurs du formulaire d'édition avec les valeurs actuelles de la tâche
                editTitleElement.value = task.title;
                editDescriptionElement.value = task.description || '';
                editDueDateElement.value = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '';
                // Affichage du modal d'édition
                const modalEdit = document.getElementById("crud-modal");
                modalEdit.classList.remove("hidden");
                const formEdit = document.getElementById("edit-task-form");
                // Sauvegarde des modifications
                formEdit.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault(); // Empêche la soumission du formulaire
                    // Récupération des nouvelles valeurs
                    const newTitle = editTitleElement.value;
                    const newDescription = editDescriptionElement.value;
                    const newDueDate = new Date(editDueDateElement.value);
                    // Vérification de l'existance des nouvelles valeurs
                    if (!newTitle || !newDescription || !newDueDate) {
                        console.log("Please enter a title, a description, and a due date");
                        return;
                    }
                    // Modification de la tâche et rafraichissement de la page
                    yield taskController.editTask(taskId, newTitle, newDescription, newDueDate);
                    modalEdit.classList.add("hidden");
                    formEdit.reset();
                    window.location.reload();
                }));
            }
        });
    }
    else {
        console.error("Edit button not found for task:", task);
    }
    // Complétion de la tâche
    if (completeTaskButton) {
        completeTaskButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const taskId = completeTaskButton.getAttribute("data-id") ? parseInt(completeTaskButton.getAttribute("data-id"), 10) : null;
            if (taskId) {
                yield taskController.completeTask(taskId);
                renderTasks();
            }
        }));
    }
    else {
        console.error("Complete button not found for task:", task);
    }
    return taskListItemElement;
}
// Récupération des tâches
function renderTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        taskListElement.innerHTML = "";
        const tasks = yield taskController.getAllTasks();
        tasks.forEach(task => {
            const taskElement = taskListItem(task);
            if (taskElement) {
                taskListElement.appendChild(taskElement);
            }
        });
    });
}
renderTasks();
