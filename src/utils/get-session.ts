// Fonction pour obtenir la session
export const getSession = (): string | null =>  {
    const session = localStorage.getItem("token");
    return session ? session : null;
};