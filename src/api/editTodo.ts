// Import
import { getSession } from "../utils/get-session.js";

// Interface
interface  EditTodo {
    title: string;
    dueDate: Date;
    description: string;
    id: number;
    
}

// Fonction de modification d'une tâche
export async function handleEditTodo({id, title, description, dueDate}: EditTodo): Promise<void> {

    try {
        // Envoie de la requête
        const response = await fetch("http://localhost:3000/api/manage/todo/edit", {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${getSession()}`
            },
            body : JSON.stringify({id, title, dueDate, description})
        });

        // Récupération de la réponse
        const { data } = await response.json();
        
        // Renvoie d'erreur
        if (!response.ok) throw new Error(data.message || "Edit Todo failed");
        return data
        
    } catch (error) {
        // Renvoie d'erreur
        console.log(error instanceof Error ? error.message : "Edit Todo failed");
    }
}