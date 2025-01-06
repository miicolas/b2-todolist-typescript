export type Task = {
    id: string;
    title: string;
    description?: string;
    completed: Boolean;
    dueDate?: Date;
    userId: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};