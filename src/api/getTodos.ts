import { getSession } from "../utils/get-session.js";

export async function handleGetTodo(): Promise<void> {

    try {
        const response = await fetch("http://localhost:3000/api/manage/todos", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${getSession()}`
             },
        });

        const { data } = await response.json();
        
        if (!response.ok) throw new Error(data.message || "getTodo failed");
        return data 
        
    } catch (error) {
        console.log(error instanceof Error ? error.message : "getTodo failed");
    }
}