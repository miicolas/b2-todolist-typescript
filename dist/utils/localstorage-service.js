// Class LocalStorageService basé sur l'interface Indentifiable
export class LocalStorageService {
    // A voir
    constructor(storageKey) {
        this.storageKey = storageKey;
    }
    // Récupération du LocalStorage
    getAll() {
        const data = localStorage.getItem(this.storageKey);
        // Si il n'y a aucune valeur -> return un array vide
        if (!data)
            return [];
        // Parsing des valeurs
        const parsed = JSON.parse(data);
        console.log(parsed);
        // Renvoie des valeurs
        return parsed.map((item) => (Object.assign(Object.assign({}, item), { 
            // Vérification d'une date
            dueDate: item.dueDate ? new Date(item.dueDate) : null })));
    }
    // Ajout d'item au LocalStorage
    add(item) {
        const items = this.getAll();
        items.push(item);
        this.saveAll(items);
    }
    // Suppression d'item du LocalStorage
    delete(item) {
        const items = this.getAll();
        const filteredItems = items.filter(i => i.id !== item.id);
        this.saveAll(filteredItems);
    }
    // Sauvegarde des valeurs dans le LocalStorage
    saveAll(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
    // Renvoie des items du LocalStorage
    getAllItems() {
        return this.getAll();
    }
    // Modification d'item dans le LocalStorage
    setItem(key, value) {
        localStorage.setItem(key, value);
    }
}
