// Import
import { getSession } from "../utils/get-session.js";

// Fonction de suppression d'une tâche
export async function handleDeleteTodo(id: number): Promise<void> {

    try {
        // Envoie de la requête
        const response = await fetch("http://localhost:3000/api/manage/todo", {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${getSession()}`
            },
            body : JSON.stringify({id})
        });

        // Récupération de la réponse
        const { data } = await response.json();
        
        // Renvoie d'erreur
        if (!response.ok) throw new Error(data.message || "Delete Todo failed");
        return data
        
    } catch (error) {
        // Renvoie d'erreur
        console.log(error instanceof Error ? error.message : "Delete Todo failed");
    }
}