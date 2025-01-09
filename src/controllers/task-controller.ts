import { Task } from "../models/type.js";
import { LocalStorageService } from "../utils/localstorage-service.js";
import { handleCreateTodo} from "../api/createTodo.js";

export class TaskController {
  private taskService: LocalStorageService<Task>;
  private currentUserId: string;

  constructor(currentUserId: string) {
    this.taskService = new LocalStorageService<Task>("tasks");
    this.currentUserId = currentUserId;
  }

  async createTask(title: string, description: string, dueDate: string) {
    const createTask = await handleCreateTodo(title, description, dueDate);
    return createTask;

  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskService.getAll();
    return tasks
  }


  
}