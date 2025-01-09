export const getSession = () => {
    const session = localStorage.getItem("token");
    return session ? session : null;
};