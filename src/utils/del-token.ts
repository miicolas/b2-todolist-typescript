// Fonction pour supprimer le token
export const deleteToken = (): void => {
    localStorage.removeItem("token");
};