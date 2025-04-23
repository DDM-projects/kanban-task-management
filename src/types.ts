export interface Subtask {
    id: string;
    title: string;
    completed: boolean;
    taskId: string;
    index: number;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    subtasks: Subtask[];
    statusName: string;
    statusId: string;
    index: number;
}

export interface Column {
    id: string;
    name: string;
    tasks: Task[];
    color: string;
    index: number;
}

export interface Board {
    id: string;
    name: string;
    statuses: Column[];
}

export interface BoardInfo {
    id: string;
    name: string;
}
