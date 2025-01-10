// Import
import { getSession } from "../utils/get-session.js";
import { createTodoData, todoDataFetch} from "../models/type.js";

// Fonction de création de tâche
export async function handleCreateTodo({title, description, dueDate}: createTodoData): Promise<todoDataFetch | undefined> {

    // Vérification des valeurs du formulaire de création
    if (!title || !description || !dueDate) {
        console.log("Please enter a title, description and due date");
        return;
    }

    try {
        // Envoie de la requête
        const response: Response = await fetch("http://localhost:3000/api/manage/todo", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${getSession()}`
             },
            body: JSON.stringify({ title, description, dueDate })
        });

        // Récupération de la réponse
        const data: todoDataFetch= await response.json();
        
        // Renvoie d'erreur
        if (!response.ok) throw new Error(data.message || "Create todo failed");
        return data
        
    } catch (error) {
        // Renvoie d'erreur
        console.log(error instanceof Error ? error.message : "Create todo failed");
    }
}