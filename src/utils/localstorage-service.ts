import { handleGetTodo } from "../api/getTodos.js";
import { handleCompleteTodo } from "../api/completeTodo.js";
import { handleDeleteTodo } from "../api/deleteTodo.js";


interface Identifiable {
  id: string;
}

// Class LocalStorageService basé sur l'interface Indentifiable
export class LocalStorageService<T extends Identifiable> {
  // A voir
  constructor(private storageKey: string) {}

  async getAll(): Promise<T[]> {

    const items: T[] = await handleGetTodo() as unknown as T[];
    return items;
  }

  async completeItem(id: number) : Promise<T[]> {
    const item: T[] = await handleCompleteTodo(id) as unknown as T[];
    return item;
  }

  async deleteItem(id: number) : Promise<T[]> {
    const item: T[] = await handleDeleteTodo(id) as unknown as T[];
    return item;
  }

  

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}