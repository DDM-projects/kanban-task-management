import { fontBodyLarge } from "../../../../theme";

export const defaultHeaderTitle = "Create New Board";

export const deleteModalTitle = "Delete this Board?";

export const getDeleteModalText = (boardName: string) =>
    `Are you sure you want to delete the "${boardName}" board? This action will remove all columns and tasks and cannot be reversed`;

export const dropdownItemStyle = {
    height: 33,
    ...fontBodyLarge,
    boorderRadius: 8,
};

export const ADD_TASK_BUTTON_WIDTH = 164;

