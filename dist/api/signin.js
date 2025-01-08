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
    const form = document.getElementById("signin-form");
    form === null || form === void 0 ? void 0 : form.addEventListener("submit", handleSignIn);
});
function handleSignIn(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        if (!email || !password) {
            console.log("Please enter a username and password");
            return;
        }
        try {
            const response = yield fetch("http://localhost:3000/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const { data } = yield response.json();
            console.log(data);
            const token = data.token;
            console.log(token);
            if (token) {
                localStorage.setItem("token", token);
            }
            if (!response.ok)
                throw new Error(data.message || "Sign in failed");
        }
        catch (error) {
            console.log(error instanceof Error ? error.message : "Sign in failed");
        }
    });
}
