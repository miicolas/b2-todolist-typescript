// Interface
interface Identifiable {
  id: string;
}

// Class LocalStorageService basé sur l'interface Indentifiable
export class LocalStorageService<T extends Identifiable> {
  // A voir
  constructor(private storageKey: string) {}

  // Récupération du LocalStorage
  getAll(): T[] {
    const data = localStorage.getItem(this.storageKey);
    // Si il n'y a aucune valeur -> return un array vide
    if (!data) return [];
    // Parsing des valeurs
    const parsed = JSON.parse(data);
    console.log(parsed);
    // Renvoie des valeurs
    return parsed.map((item: any) => ({
      ...item,
      // Vérification d'une date
      dueDate: item.dueDate ? new Date(item.dueDate) : null
    }));
  }

  // Ajout d'item au LocalStorage
  add(item: T): void {
    const items = this.getAll();
    items.push(item);
    this.saveAll(items);
  }

  // Suppression d'item du LocalStorage
  delete(item: T): void {
    const items = this.getAll();
    const filteredItems = items.filter(i => i.id !== item.id);
    this.saveAll(filteredItems);
  }

  // Sauvegarde des valeurs dans le LocalStorage
  saveAll(items: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  // Renvoie des items du LocalStorage
  getAllItems(): T[] {
    return this.getAll();
  }

  // Modification d'item dans le LocalStorage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}