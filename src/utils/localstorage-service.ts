export class LocalStorageService<T> {
    constructor(private storageKey: string) {}
  
    getAll(): T[] {
      const data = localStorage.getItem(this.storageKey) as string;
      console.log(this.storageKey);
      console.log(data);
      return data ? JSON.parse(data) : [];
    }
  
    add(item: T): void {
      const items = this.getAll();
      items.push(item);
      this.saveAll(items);
    }
  
    saveAll(items: T[]): void {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
  
    getAllItems(): T[] {
      return this.getAll();
    }
  
    setItem(key: string, value: string): void {
      localStorage.setItem(key, value);
    }
  
    removeItem(key: string): void {
      localStorage.removeItem(key);
    }
  }