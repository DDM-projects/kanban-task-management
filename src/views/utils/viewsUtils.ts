import { Subtask } from "../../types";

export const countCompletedSubtasks = (subtasks: Subtask[]) => {
    return subtasks?.filter((subtask) => subtask.isCompleted).length;
};
