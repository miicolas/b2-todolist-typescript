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
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
    form === null || form === void 0 ? void 0 : form.addEventListener("submit", handleSignUp);
});
function handleSignUp(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const usernameElement = document.getElementById("username");
        const emailElement = document.getElementById("email");
        const passwordElement = document.getElementById("password");
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
            const response = yield fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            const data = yield response.json();
            if (!response.ok)
                throw new Error(data.message || "Sign up failed");
            console.log("Signed up successfully!");
            window.location.href = "/signin.html";
        }
        catch (error) {
            console.log(error instanceof Error ? error.message : "Sign up failed");
        }
    });
}
