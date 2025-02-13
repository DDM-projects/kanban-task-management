import { Board, Subtask } from "../../types";

export const countCompletedSubtasks = (subtasks: Subtask[]) => {
    return subtasks?.filter((subtask) => subtask.completed).length;
};

export const getStatusOptions = (board: Board) => {
    return board?.statuses?.map((column) => ({ id: column.id, name: column.name })) || [];
};

export const getTransformedStatusOptions = (board: Board) => {
    const statusOptions = getStatusOptions(board);
    return statusOptions.map((option) => ({ value: option.id, label: option.name }));
};
