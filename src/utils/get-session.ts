// Fonction pour obtenir la session
export const getSession = () => {
    const session = localStorage.getItem("token");
    return session ? JSON.parse(session) : null;
};