export interface Column {
    id: string;
    name: string;
    tasks: Task[];
}

export interface Board {
    name: string;
    columns: Column[];
}

export interface Subtask {
    id: string;
    title: string;
    isCompleted: boolean;
}

export interface Task {
    title: string;
    description: string;
    subtasks: Subtask[];
    status: string;
}
