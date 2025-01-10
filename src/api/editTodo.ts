// Import
import { getSession } from "../utils/get-session.js";
import { editTodoData, todoDataFetch } from "../models/type.js";

// Fonction de modification d'une tâche
export async function handleEditTodo({id, title, description, dueDate}: editTodoData): Promise<todoDataFetch | undefined> {

    try {
        // Envoie de la requête
        const response: Response = await fetch("http://localhost:3000/api/manage/todos", {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${getSession()}`
            },
            body : JSON.stringify({id, title, dueDate, description})
        });

        // Récupération de la réponse
        const data: todoDataFetch = await response.json();
        
        // Renvoie d'erreur
        if (!response.ok) throw new Error(data.message || "Edit Todo failed");
        return data
        
    } catch (error) {
        // Renvoie d'erreur
        console.log(error instanceof Error ? error.message : "Edit Todo failed");
    }
}