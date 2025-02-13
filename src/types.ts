export interface Subtask {
    id: string;
    title: string;
    completed: boolean;
    taskId: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    subtasks: Subtask[];
    statusName: string;
    statusId: string;
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
    statuses: Column[];
}

export interface BoardInfo {
    id: string;
    name: string;
}
