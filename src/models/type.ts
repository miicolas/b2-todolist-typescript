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

export type createTodoData = {
    title: string;
    description: string;
    dueDate: Date;
}

export type editTodoData = {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
}

export type signInData = {
    token: string;
    message: string;
}

export type signUpData = {
    message: string;
    data : {
        id: string;
        name: string;
        email: string;
        password: string;
    }
}


export type todoDataFetch = {

    message: string;
    data : {
        id: number;
        title: string;
        description: string | null;
        dueDate: Date | null;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }
}

export type todoDataFetchAll = {
    message: string;
    data: {
        todos: todoDataFetch[];
    }
}