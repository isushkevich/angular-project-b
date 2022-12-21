export interface TodoItem {
    completed: boolean;
    id: number;
    todo: string;
    userId: number;
}

export interface Data {
    limit: number,
    skip: number,
    todos: Array<TodoItem>,
    total: number,
}
