var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { handleCreateTodo } from "../api/createTodo.js";
import { handleGetTodo } from "../api/getTodos.js";
import { handleCompleteTodo } from "../api/completeTodo.js";
import { handleDeleteTodo } from "../api/deleteTodo.js";
import { handleEditTodo } from "../api/editTodo.js";
// Class TaskController
export class TaskController {
    // Création d'une tâche
    createTask(title, description, dueDate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield handleCreateTodo({ title, description, dueDate });
        });
    }
    // Récupération de toutes les tâches
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield handleGetTodo();
            return response === null || response === void 0 ? void 0 : response.data;
        });
    }
    // Complétion d'une tâche
    completeTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield handleCompleteTodo(id);
        });
    }
    // Suppression d'une tâche
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield handleDeleteTodo(id);
        });
    }
    // Modification d'une tâche
    editTask(id, title, description, dueDate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield handleEditTodo({ id, title, description, dueDate });
        });
    }
}
