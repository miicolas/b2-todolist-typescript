var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import
import { getSession } from "../utils/get-session.js";
// Fonction de création de tâche
export function handleCreateTodo(_a) {
    return __awaiter(this, arguments, void 0, function* ({ title, description, dueDate }) {
        // Vérification des valeurs du formulaire de création
        if (!title || !description || !dueDate) {
            console.log("Please enter a title, description and due date");
            return;
        }
        try {
            // Envoie de la requête
            const response = yield fetch("http://localhost:3000/api/manage/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${getSession()}`
                },
                body: JSON.stringify({ title, description, dueDate })
            });
            // Récupération de la réponse
            const data = yield response.json();
            // Renvoie d'erreur
            if (!response.ok)
                throw new Error(data.message || "Create todo failed");
            return data;
        }
        catch (error) {
            // Renvoie d'erreur
            console.log(error instanceof Error ? error.message : "Create todo failed");
        }
    });
}
