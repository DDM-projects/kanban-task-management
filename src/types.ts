export interface Subtask {
    id: string;
    title: string;
    isCompleted: boolean;
}
export interface Task {
    id: string;
    title: string;
    description: string;
    subtasks: Subtask[];
    status: string;
}
export interface Column {
    id: string;
    name: string;
    tasks: Task[];
    color: string;
}
export interface Board {
    id: string;
    name: string;
    columns: Column[];
}
