// Imports
import { Task } from "../models/type.js";
import { LocalStorageService } from "../utils/localstorage-service.js";
import { handleCreateTodo} from "../api/createTodo.js";

// Class TaskController
export class TaskController {
  private taskService: LocalStorageService<Task>;
  private currentUserId: string;

  constructor(currentUserId: string) {
    this.taskService = new LocalStorageService<Task>("tasks");
    this.currentUserId = currentUserId;
  }


  // Création d'une tâche
  async createTask(title: string, description: string, dueDate: string) {
    const createTask = await handleCreateTodo(title, description, dueDate);
    return createTask;
  }

  // Récupération des tâches
  getAllTasks(): Task[] {
    return this.taskService.getAll();
  }

  // Modification d'une tâche pour indiquer qu'elle est terminée
  setTaskAsCompleted(taskId: string): void {
    const tasks = this.taskService.getAll();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = true;
      this.taskService.saveAll(tasks);
    }
  }

  // Suppression d'une tâche
  deleteTask(taskId: string): void {
    const tasks = this.taskService.getAll();
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    this.taskService.saveAll(filteredTasks);
  }
}