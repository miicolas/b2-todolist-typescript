interface SignUpData {
    username: string;
    email: string;
    password: string;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form") as HTMLFormElement | null;
    form?.addEventListener("submit", handleSignUp);
});

async function handleSignUp(event: Event): Promise<void> {
    event.preventDefault();

    const usernameElement = document.getElementById("username") as HTMLInputElement | null;
    const emailElement = document.getElementById("email") as HTMLInputElement | null;
    const passwordElement = document.getElementById("password") as HTMLInputElement | null;

    if (!usernameElement || !emailElement || !passwordElement) {
        console.log("Username, email, or password input not found");
        return;
    }

    const name = usernameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;

    if (!name || !email || !password) {
        console.log("Please enter a username, email, and password");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        

        if (!response.ok) throw new Error(data.message || "Sign up failed");

        console.log("Signed up successfully!");
        window.location.href = "/signin.html";
    } catch (error) {
        console.log(error instanceof Error ? error.message : "Sign up failed");
    }
}