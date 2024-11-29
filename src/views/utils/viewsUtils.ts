import { Board, Subtask } from "../../types";

export const countCompletedSubtasks = (subtasks: Subtask[]) => {
    return subtasks?.filter((subtask) => subtask.isCompleted).length;
};

export const getStatusOptions = (board: Board) => {
    return board?.columns?.map((column) => column.name) || [];
};

export const getTransformedStatusOptions = (board: Board) => {
    const statusOptions = getStatusOptions(board);
    return statusOptions.map((option) => ({ value: option, label: option }));
};
