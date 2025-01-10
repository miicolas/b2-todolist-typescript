import { getSession } from "../utils/get-session.js";

// editTodo.ts
interface  EditTodo {
    title: string;
    dueDate: string;
    updatedAt: string;
    userId: string;
    completed: boolean;
    description: string;
    id: number;
    
}

export async function handleEditTodo(id: number, title: string, description: string, dueDate: Date): Promise<void> {

    try {
        console.log(getSession());
        const response = await fetch("http://localhost:3000/api/manage/todo/edit", {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${getSession()}`
            },
            body : JSON.stringify({id, title, dueDate, description})
        });

        const { data } = await response.json();
        
        if (!response.ok) throw new Error(data.message || "Edit Todo failed");
        return data
        
    } catch (error) {
        console.log(error instanceof Error ? error.message : "Edit Todo failed");
    }
}