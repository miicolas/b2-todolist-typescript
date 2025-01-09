"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Récupération du formulaire de création de compte
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
    form === null || form === void 0 ? void 0 : form.addEventListener("submit", handleSignUp);
});
// Fonction à excuter quand un utilisateur se connecte
function handleSignUp(event) {
    return __awaiter(this, void 0, void 0, function* () {
        // Empeche la page de s'actualiser
        event.preventDefault();
        // Récupération des éléments du formulaire
        const usernameElement = document.getElementById("username");
        const emailElement = document.getElementById("email");
        const passwordElement = document.getElementById("password");
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
        // Connection au back
        try {
            // Liaison avec le back et envoie du formulaire
            const response = yield fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            // Récupération de la réponse
            const { data } = yield response.json();
            console.log(data);
            // En cas d'erreur, créer un message d'erreur
            if (!response.ok)
                throw new Error(data.message || "Sign up failed");
            // En cas de réussite, créer un message de réussite et rediriger vers la page de connection
            console.log("Signed up successfully!");
            window.location.href = "/signin.html";
            // En cas d'erreur, créer un message d'erreur
        }
        catch (error) {
            console.log(error instanceof Error ? error.message : "Sign up failed");
        }
    });
}
