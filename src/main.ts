// Imports
import { TaskController } from "./controllers/task-controller.js";
import { Task } from "./models/type.js";
import { getSession } from "./utils/get-session.js";
import { deleteToken } from "./utils/del-token.js";

// Récupération du TOKEN
const token: string | null = getSession();

// Si il n'y a pas de TOKEN -> redirection vers la page de connexion
if (!token) {
    console.log("No token found, redirecting to signin page");
    window.location.href = "/";
}

// Récupération du bouton de logout
const logoutElement = document.getElementById("logout-btn") as HTMLElement;

// Suppression du TOKEN et renvoie vers la page de connexion
logoutElement.addEventListener("click", (e: Event) => {
    deleteToken()
    window.location.reload()
})

// Récupération du bouton de logout
const iconElement = document.getElementById("icon") as HTMLElement;

// Animation du bouton de déconnexion
iconElement.addEventListener("click", (e: Event) => {
    logoutElement.classList.toggle("slide-out")
    logoutElement.classList.toggle("slide-in")
    logoutElement.classList.remove("hidden")
})

// Récupération de la liste des tâches du formulaire de création de tâches
const taskListElement = document.getElementById("task-list") as HTMLElement;
const taskForm = document.getElementById("task-form") as HTMLFormElement;

const closeButtonEdit = document.querySelector("[data-close-button]") as HTMLElement;

// Fermeture du modal d'édition
closeButtonEdit.addEventListener("click", () => {
    const modalEdit = document.getElementById("crud-modal") as HTMLElement;
    modalEdit.classList.add("hidden");
});

// Création d'un TaskController
const taskController: TaskController = new TaskController();

// Stockage du TaskController dans le navigateur
(window as any).taskController = taskController;

// Lorsque le formulaire est soumis :
taskForm.addEventListener("submit", async (event: Event) => {
    // Empeche la page de s'actualiser
    event.preventDefault();

    // Récupération des éléments du formulaire
    const titleElement = (document.getElementById("title") as HTMLInputElement | null);
    const descriptionElement = (document.getElementById("description") as HTMLInputElement | null);
    const dueDateElement = (document.getElementById("due-date") as HTMLInputElement | null);

    // Si un élément n'est pas trouvé -> stop la fonction
    if (!titleElement || !descriptionElement || !dueDateElement) {
        return taskListElement;
    }

    // Récupération des valeurs du formulaire
    const title: string = titleElement.value;
    const description: string = descriptionElement.value;
    const dueDate: Date = new Date(dueDateElement.value);

    // Si une valeur est vide -> stop la fonction
    if (!title || !description || !dueDate) {
        console.log("Please enter a title, a description, and a dueDate");
        return;
    }

    // Création d'une tâche et réinitialise le formulaire
    await taskController.createTask(title, description, dueDate);
    taskForm.reset();
    renderTasks();
});

// Template des tâches
function taskListItem(task: Task): HTMLElement | undefined {
    if (!task || !task.title || !task.description || !task.dueDate) {
        console.error("Invalid task data:", task);
        return undefined;
    }

    const taskListItemElement = document.createElement('tr');
    const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString("fr-FR") : "No due date";    taskListItemElement.innerHTML = `
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
    const deleteTaskButton = taskListItemElement.querySelector('.delete-btn') as HTMLButtonElement;
    const editTaskButton = taskListItemElement.querySelector('.edit-btn') as HTMLButtonElement;
    const completeTaskButton = taskListItemElement.querySelector('.complete-btn') as HTMLButtonElement;

    // Suppression de la tâche
    if (deleteTaskButton) {
        deleteTaskButton.addEventListener("click", async () => {
            const taskId: number | null = deleteTaskButton.getAttribute("data-id") ? parseInt(deleteTaskButton.getAttribute("data-id") as string, 10) : null;
            if (taskId) {
                await taskController.deleteTask(taskId as unknown as number);
                renderTasks();
            }
        });
    } else {
        console.error("Delete button not found for task:", task);
    }

    // Modification de la tâche
    if (editTaskButton) {
        editTaskButton.addEventListener("click", () => {
            const taskId: number | null = editTaskButton.getAttribute("data-id") ? parseInt(editTaskButton.getAttribute("data-id") as string, 10) : null;
            if (taskId) {
                const editTitleElement = document.getElementById("edit-title") as HTMLInputElement;
        const editDescriptionElement = document.getElementById("edit-description") as HTMLInputElement;
        const editDueDateElement = document.getElementById("edit-due-date") as HTMLInputElement;

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
        const modalEdit = document.getElementById("crud-modal") as HTMLElement;
        modalEdit.classList.remove("hidden");

        const formEdit = document.getElementById("edit-task-form") as HTMLFormElement;

        // Sauvegarde des modifications
        formEdit.addEventListener("submit", async (event: Event) => {
            event.preventDefault(); // Empêche la soumission du formulaire

            // Récupération des nouvelles valeurs
            const newTitle: string = editTitleElement.value;
            const newDescription: string = editDescriptionElement.value;
            const newDueDate: Date = new Date(editDueDateElement.value);

            // Vérification de l'existance des nouvelles valeurs
            if (!newTitle || !newDescription || !newDueDate) {
                console.log("Please enter a title, a description, and a due date");
                return;
            }

            // Modification de la tâche et rafraichissement de la page
            await taskController.editTask(taskId as unknown as number, newTitle, newDescription, newDueDate as unknown as Date);
            modalEdit.classList.add("hidden");
            formEdit.reset();
            window.location.reload();
        
        });
            }
        });
    } else {
        console.error("Edit button not found for task:", task);
    }

    // Complétion de la tâche
    if (completeTaskButton) {
        completeTaskButton.addEventListener("click", async () => {
            const taskId: number | null = completeTaskButton.getAttribute("data-id") ? parseInt(completeTaskButton.getAttribute("data-id") as string, 10) : null;
            if (taskId) {
                await taskController.completeTask(taskId as unknown as number);
                renderTasks();
            }
        });
    } else {
        console.error("Complete button not found for task:", task);
    }
    return taskListItemElement;
}

// Récupération des tâches
async function renderTasks() {
    taskListElement.innerHTML = "";
    const tasks: Task[] = await taskController.getAllTasks();
    tasks.forEach(task => {
        const taskElement: HTMLElement | undefined = taskListItem(task);
        if (taskElement) {
            taskListElement.appendChild(taskElement);
        }
    });
}

renderTasks();