export class LocalStorageService {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }
    getAll() {
        const data = localStorage.getItem(this.storageKey);
        console.log(this.storageKey);
        console.log(data);
        return data ? JSON.parse(data) : [];
    }
    add(item) {
        const items = this.getAll();
        items.push(item);
        this.saveAll(items);
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
    removeItem(key) {
        localStorage.removeItem(key);
    }
}
