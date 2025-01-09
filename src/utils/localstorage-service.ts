import { handleGetTodo } from "../api/getTodos.js";


interface Identifiable {
  id: string;
}

export class LocalStorageService<T extends Identifiable> {
  constructor(private storageKey: string) {}

  async getAll(): Promise<T[]> {

    const items: T[] = await handleGetTodo() as unknown as T[];
    return items;
  }

  

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}