// Export du type Task
export type Task = {
    id: string;
    title: string;
    description?: string;
    completed: Boolean;
    dueDate?: Date;
    userId: string;
};

// Export du type User
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};