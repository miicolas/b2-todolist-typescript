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

  // Récupération de toutes les tâches
  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskService.getAll();
    return tasks
  }

  // Complétion d'une tâche
  async completeTask(id: number) {
    
    const completeTask = await this.taskService.completeItem(id as unknown as number);
    return completeTask;

  }

  // Suppression d'une tâche
  async deleteTask(id: number) {
    
    const deleteTask = await this.taskService.deleteItem(id as unknown as number);
    return deleteTask;
  } 
  
}