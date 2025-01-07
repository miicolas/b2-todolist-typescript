import { LocalStorageService } from "../utils/localstorage-service.js";
export class TaskController {
    constructor(currentUserId) {
        this.taskService = new LocalStorageService("tasks");
        this.currentUserId = currentUserId;
    }
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
    getAllTasks() {
        return this.taskService.getAll();
    }
    setTaskAsCompleted(taskId) {
        const tasks = this.taskService.getAll();
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = true;
            this.taskService.saveAll(tasks);
        }
    }
    deleteTask(taskId) {
        const tasks = this.taskService.getAll();
        const filteredTasks = tasks.filter(t => t.id !== taskId);
        this.taskService.saveAll(filteredTasks);
    }
}
