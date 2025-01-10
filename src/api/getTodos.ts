// Import
import { getSession } from "../utils/get-session.js";

// Fonction de récupération des tâches
export async function handleGetTodo(): Promise<void> {

    try {
        // Envoie de la requête
        const response = await fetch("http://localhost:3000/api/manage/todos", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${getSession()}`
             },
        });

        // Récupération de la réponse
        const { data } = await response.json();
        
        // Renvoie d'erreur
        if (!response.ok) throw new Error(data.message || "getTodo failed");
        return data 
        
    } catch (error) {
        // Renvoie d'erreur
        console.log(error instanceof Error ? error.message : "getTodo failed");
    }
}