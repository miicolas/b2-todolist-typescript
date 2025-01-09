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
export class TaskController {
    constructor(currentUserId) {
        this.taskService = new LocalStorageService("tasks");
        this.currentUserId = currentUserId;
    }
    createTask(title, description, dueDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const createTask = yield handleCreateTodo(title, description, dueDate);
            return createTask;
        });
    }
    getAllTasks() {
        return this.taskService.getAll();
    }
    setTaskAsCompleted(taskId) {
        const tasks = this.taskService.getAll();
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = true;
            this.taskService.saveAll(tasks);
        }
    }
    deleteTask(taskId) {
        const tasks = this.taskService.getAll();
        const filteredTasks = tasks.filter(t => t.id !== taskId);
        this.taskService.saveAll(filteredTasks);
    }
}
