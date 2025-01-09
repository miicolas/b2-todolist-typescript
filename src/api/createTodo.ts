import { getSession } from "../utils/get-session.js";

// createTodo.ts
interface createTodoData {
    title: string;
    description: string;
    dueDate: string;
}

export async function handleCreateTodo(title: string, description: string, dueDate: string): Promise<void> {

    if (!title || !description || !dueDate) {
        console.log("Please enter a title, description and due date");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/manage/todo", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${getSession()}`
             },
            body: JSON.stringify({ title, description, dueDate })
        });

        const { data } = await response.json();                
        if (!response.ok) throw new Error(data.message || "Create todo failed");
        
        
    } catch (error) {
        console.log(error instanceof Error ? error.message : "Create todo failed");
    }
}