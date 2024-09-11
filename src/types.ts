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
    availableStatus: string[];
}
export interface Board {
    name: string;
    columns: Column[];
}
