import { getSession } from "../utils/get-session.js";

export async function handleCompleteTodo(id: number): Promise<void> {

    try {
        console.log(getSession());
        const response = await fetch("http://localhost:3000/api/manage/todo", {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${getSession()}`
            },
            body : JSON.stringify({id})
        });

        const { data } = await response.json();
        
        if (!response.ok) throw new Error(data.message || "Complete Todo failed");
        return data
        
    } catch (error) {
        console.log(error instanceof Error ? error.message : "Complete Todo failed");
    }
}