interface Identifiable {
  id: string;
}

export class LocalStorageService<T extends Identifiable> {
  constructor(private storageKey: string) {}

  getAll(): T[] {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return [];
    const parsed = JSON.parse(data);
    console.log(parsed);
    return parsed.map((item: any) => ({
      ...item,
      dueDate: item.dueDate ? new Date(item.dueDate) : null
    }));
  }

  add(item: T): void {
    const items = this.getAll();
    items.push(item);
    this.saveAll(items);
  }

  delete(item: T): void {
    const items = this.getAll();
    const filteredItems = items.filter(i => i.id !== item.id);
    this.saveAll(filteredItems);
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
}