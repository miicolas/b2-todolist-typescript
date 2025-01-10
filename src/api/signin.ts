// Interface
interface SignInData {
    username: string;
    password: string;
}

// Récupuration du formulaire de connection
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signin-form") as HTMLFormElement | null;
    form?.addEventListener("submit", handleSignIn);
});

// Fonction à excuter quand un utilisateur se connecte
async function handleSignIn(event: Event): Promise<void> {
    // Empeche la page de s'actualiser
    event.preventDefault();
    
    // Récupération des éléments du formulaire
    const emailElement = (document.getElementById("email") as HTMLInputElement);
    const passwordElement = (document.getElementById("password") as HTMLInputElement);

    // Si un élément n'est pas trouvé -> stop la fonction
    if (!emailElement || !passwordElement) {
        console.log("Email or password input not found");
        return;
    }

    // Récupération des valeurs du formulaire
    const email = emailElement.value;
    const password = passwordElement.value;

    // Si une valeur est vide -> stop la fonction
    if (!email || !password) {
        console.log("Please enter a username and password");
        return;
    }

    try {
        // Envoie de la requête
        const response = await fetch("http://localhost:3000/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        // Récupération de la réponse
        const { data } = await response.json();
        console.log(data);

            // Stockage du TOKEN dans le LocalStorage
            const token = data.token;
            if (token) {
                localStorage.setItem("token", token);
            }
                
        // Renvoi d'erreur
        if (!response.ok) throw new Error(data.message || "Sign in failed");

        window.location.href = "/views/dashboard.html";
        
    } catch (error) {
        // Renvoi d'erreur
        console.log(error instanceof Error ? error.message : "Sign in failed");
    }
}