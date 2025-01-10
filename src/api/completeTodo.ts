// Import
import { getSession } from "../utils/get-session.js";

// Fonction de complétion de tâche
export async function handleCompleteTodo(id: number): Promise<void> {

    try {
        // Envoie de la requête
        const response = await fetch("http://localhost:3000/api/manage/todo", {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${getSession()}`
            },
            body : JSON.stringify({id})
        });

        // Récupération de la réponse
        const { data } = await response.json();
        
        // Renvoie d'erreur
        if (!response.ok) throw new Error(data.message || "Complete Todo failed");
        return data
        
    } catch (error) {
        // Renvoie d'erreur
        console.log(error instanceof Error ? error.message : "Complete Todo failed");
    }
}