// signin.ts
interface SignInData {
    username: string;
    password: string;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signin-form") as HTMLFormElement | null;
    form?.addEventListener("submit", handleSignIn);
});


async function handleSignIn(event: Event): Promise<void> {
    event.preventDefault();
    
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!email || !password) {
        console.log("Please enter a username and password");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const { data } = await response.json();
        console.log(data);

            const token = data.token;
            console.log(token);
            if (token) {
                localStorage.setItem("token", token);
            }
                
        if (!response.ok) throw new Error(data.message || "Sign in failed");
        
        
    } catch (error) {
        console.log(error instanceof Error ? error.message : "Sign in failed");
    }
}