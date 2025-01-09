import { LocalStorageService } from "../utils/localstorage-service.js";
// Class TaskController
export class TaskController {
    constructor(currentUserId) {
        this.taskService = new LocalStorageService("tasks");
        this.currentUserId = currentUserId;
    }
    // Création d'une tâche
    createTask(title, description, dueDate) {
        const newTask = {
            id: crypto.randomUUID(),
            title: title,
            description: description,
            dueDate: new Date(dueDate),
            completed: false,
            userId: this.currentUserId,
        };
        this.taskService.add(newTask);
        return newTask;
    }
    // Récupération des tâches
    getAllTasks() {
        return this.taskService.getAll();
    }
    // Modification d'une tâche pour indiquer qu'elle est terminée
    setTaskAsCompleted(taskId) {
        const tasks = this.taskService.getAll();
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = true;
            this.taskService.saveAll(tasks);
        }
    }
    // Suppression d'une tâche
    deleteTask(taskId) {
        const tasks = this.taskService.getAll();
        const filteredTasks = tasks.filter(t => t.id !== taskId);
        this.taskService.saveAll(filteredTasks);
    }
}
