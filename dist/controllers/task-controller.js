import { LocalStorageService } from "../utils/localstorage-service.js";
export class TaskController {
    constructor(currentUserId) {
        this.taskService = new LocalStorageService("tasks");
        this.currentUserId = "1";
    }
    createTask(task) {
        const newTask = {
            id: "1",
            title: task.title,
            description: task.description,
            completed: false,
            userId: this.currentUserId,
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined
        };
        this.taskService.add(newTask);
    }
    getAllTasks() {
        const tasks = this.taskService.getAll();
        return tasks;
    }
    setTaskAsCompleted(taskId) {
        // Implement the setTaskAsCompleted method here
        console.log("setTaskAsCompleted method not implemented");
    }
    deleteTask(taskId) {
        // Implement the deleteTask method here
        console.log("deleteTask method not implemented");
    }
    addTask(task) {
        // Implement the addTask method here
        console.log("addTask method not implemented");
    }
}
