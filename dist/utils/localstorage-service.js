var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { handleGetTodo } from "../api/getTodos.js";
import { handleCompleteTodo } from "../api/completeTodo.js";
import { handleDeleteTodo } from "../api/deleteTodo.js";
// Class LocalStorageService basé sur l'interface Indentifiable
export class LocalStorageService {
    // A voir
    constructor(storageKey) {
        this.storageKey = storageKey;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield handleGetTodo();
            return items;
        });
    }
    completeItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield handleCompleteTodo(id);
            return item;
        });
    }
    deleteItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield handleDeleteTodo(id);
            return item;
        });
    }
    setItem(key, value) {
        localStorage.setItem(key, value);
    }
}
