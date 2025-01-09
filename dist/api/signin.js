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
// Récupuration du formulaire de connection
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signin-form");
    form === null || form === void 0 ? void 0 : form.addEventListener("submit", handleSignIn);
});
// Fonction à excuter quand un utilisateur se connecte
function handleSignIn(event) {
    return __awaiter(this, void 0, void 0, function* () {
        // Empeche la page de s'actualiser
        event.preventDefault();
        // Récupération des éléments du formulaire
        const emailElement = document.getElementById("email");
        const passwordElement = document.getElementById("password");
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
        // Connection au back
        try {
            // Liaison avec le back et envoie du formulaire
            const response = yield fetch("http://localhost:3000/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            // Récupération de la réponse
            const { data } = yield response.json();
            console.log(data);
            // Stockage du TOKEN dans le LocalStorage
            const token = data.token;
            console.log(token);
            if (token) {
                localStorage.setItem("token", token);
            }
            // En cas d'erreur, créer un message d'erreur
            if (!response.ok)
                throw new Error(data.message || "Sign in failed");
            // En cas d'erreur, créer un message d'erreur
        }
        catch (error) {
            console.log(error instanceof Error ? error.message : "Sign in failed");
        }
    });
}
