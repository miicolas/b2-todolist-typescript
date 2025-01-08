export class LocalStorageService {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }
    getAll() {
        const data = localStorage.getItem(this.storageKey);
        if (!data)
            return [];
        const parsed = JSON.parse(data);
        console.log(parsed);
        return parsed.map((item) => (Object.assign(Object.assign({}, item), { dueDate: item.dueDate ? new Date(item.dueDate) : null })));
    }
    add(item) {
        const items = this.getAll();
        items.push(item);
        this.saveAll(items);
    }
    delete(item) {
        const items = this.getAll();
        const filteredItems = items.filter(i => i.id !== item.id);
        this.saveAll(filteredItems);
    }
    saveAll(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
    getAllItems() {
        return this.getAll();
    }
    setItem(key, value) {
        localStorage.setItem(key, value);
    }
}
