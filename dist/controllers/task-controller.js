var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LocalStorageService } from "../utils/localstorage-service.js";
import { handleCreateTodo } from "../api/createTodo.js";
// Class TaskController
export class TaskController {
    constructor(currentUserId) {
        this.taskService = new LocalStorageService("tasks");
        this.currentUserId = currentUserId;
    }
    // Création d'une tâche
    createTask(title, description, dueDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const createTask = yield handleCreateTodo(title, description, dueDate);
            return createTask;
        });
    }
    // Récupération de toutes les tâches
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.taskService.getAll();
            return tasks;
        });
    }
    // Complétion d'une tâche
    completeTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const completeTask = yield this.taskService.completeItem(id);
            return completeTask;
        });
    }
    // Suppression d'une tâche
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteTask = yield this.taskService.deleteItem(id);
            return deleteTask;
        });
    }
}
