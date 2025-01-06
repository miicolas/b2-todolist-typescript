import { Task } from "../models/type.js";
import { LocalStorageService } from "../utils/localstorage-service.js";


export class TaskController {

    private taskService: LocalStorageService<Task>;
    private currentUserId: string;

    constructor(currentUserId: string) {
        this.taskService = new LocalStorageService<Task>("tasks");
        this.currentUserId = "1";
    }

    createTask(task: Task): void {
        const newTask: Task = {
            id: "1", 
            title: task.title,
            description: task.description,
            completed: false,
            userId: this.currentUserId,
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined
        };

        this.taskService.add(newTask);
        
    }

    getAllTasks(): Task[] {
        
        const tasks = this.taskService.getAll();
        return tasks;
    }

    setTaskAsCompleted(taskId: string): void {
        // Implement the setTaskAsCompleted method here
        console.log("setTaskAsCompleted method not implemented");
    }

    deleteTask(taskId: string): void {
        // Implement the deleteTask method here
        console.log("deleteTask method not implemented");
    }

    addTask(task: Task): void {
        // Implement the addTask method here
        console.log("addTask method not implemented");
    }

}