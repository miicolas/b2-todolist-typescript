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
// Fonction de suppression d'une tâche
export function handleDeleteTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Envoie de la requête
            const response = yield fetch("http://localhost:3000/api/manage/todo", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${getSession()}`
                },
                body: JSON.stringify({ id })
            });
            // Récupération de la réponse
            const data = yield response.json();
            // Renvoie d'erreur
            if (!response.ok)
                throw new Error(data.message || "Delete Todo failed");
            return data;
        }
        catch (error) {
            // Renvoie d'erreur
            console.log(error instanceof Error ? error.message : "Delete Todo failed");
        }
    });
}
