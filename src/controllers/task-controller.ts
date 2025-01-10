import { Task } from "../models/type.js";
import { handleCreateTodo } from "../api/createTodo.js";
import { handleGetTodo } from "../api/getTodos.js";
import { handleCompleteTodo } from "../api/completeTodo.js";
import { handleDeleteTodo } from "../api/deleteTodo.js";
import { handleEditTodo } from "../api/editTodo.js";
// Class TaskController
export class TaskController {

  // Création d'une tâche
  async createTask(title: string, description: string, dueDate: Date): Promise<void> {
    await handleCreateTodo({title, description, dueDate});
  }

  // Récupération de toutes les tâches
  async getAllTasks(): Promise<Task[]> {
    const response = await handleGetTodo();
    return response as unknown as Task[];
  }

  // Complétion d'une tâche
  async completeTask(id: number): Promise<void> {
    await handleCompleteTodo(id);
  }

  // Suppression d'une tâche
  async deleteTask(id: number): Promise<void> {
    await handleDeleteTodo(id);
  } 

  // Modification d'une tâche
  async editTask(id: number, title: string, description: string, dueDate: Date): Promise<void> {
    await handleEditTodo({id, title, description, dueDate});
  }
} 