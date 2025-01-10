// Interface
interface SignUpData {
    username: string;
    email: string;
    password: string;
}

// Récupération du formulaire de création de compte
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form") as HTMLFormElement | null;
    form?.addEventListener("submit", handleSignUp);
});

// Fonction à excuter quand un utilisateur se connecte
async function handleSignUp(event: Event): Promise<void> {
    // Empeche la page de s'actualiser
    event.preventDefault();

    // Récupération des éléments du formulaire
    const usernameElement = document.getElementById("username") as HTMLInputElement | null;
    const emailElement = document.getElementById("email") as HTMLInputElement | null;
    const passwordElement = document.getElementById("password") as HTMLInputElement | null;

    // Si un élément n'est pas trouvé -> stop la fonction
    if (!usernameElement || !emailElement || !passwordElement) {
        console.log("Username, email, or password input not found");
        return;
    }

    // Récupération des valeurs du formulaire
    const name = usernameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;

    // Si une valeur est vide -> stop la fonction
    if (!name || !email || !password) {
        console.log("Please enter a username, email, and password");
        return;
    }

    try {
        // Envoie de la requête
        const response = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        // Récupération de la réponse
        const { data } = await response.json();
        console.log(data);

        // Renvoie d'erreur
        if (!response.ok) throw new Error(data.message || "Sign up failed");

        // Renvoie de message de succès
        console.log("Signed up successfully!");
        window.location.href = "/views/";
        window.location.href = "/views/index.html";

    } catch (error) {
        // Renvoie d'erreur
        console.log(error instanceof Error ? error.message : "Sign up failed");
    }
}