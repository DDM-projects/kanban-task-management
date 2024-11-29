import { nanoid } from "nanoid";
import * as Yup from "yup";
import {
    validationSchema as taskValidationSchema,
    spaceTest,
} from "../addNewOrEditTaskModal/addNewOrEditTaskModal.data";
import { Column } from "../../../types";
import { store } from "../../../state/store";

export const getRandomColor = () => {
    const getRandomValue = () => Math.floor(Math.random() * 166) + 50;

    const r = getRandomValue();
    const g = getRandomValue();
    const b = getRandomValue();

    const toHex = (value: number) => value.toString(16);

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const getInitialAddBoardValues = () => {
    return {
        id: nanoid(),
        name: "",
        columns: [
            {
                id: nanoid(),
                name: "",
                tasks: [],
                color: "#49C4E5",
            },
            {
                id: nanoid(),
                name: "",
                tasks: [],
                color: "#8471F2",
            },
        ],
    };
};

export const getColumnSchema = () => {
    return Yup.object().shape({
        name: Yup.string()
            .test(spaceTest.title, spaceTest.message, spaceTest.function)
            .min(2, "Column name must contain at least 2 characters")
            .max(30, "Column name is too long")
            .test("column-name-exists", "Column name already exists", function (value) {
                const columns = this.options.context?.columns as Column[];
                const options = this.options as any;
                const index = options.index as number;
                const filteredColumns = columns.filter((column, i) => i !== index);
                return !filteredColumns.some(
                    (column) =>
                        column.name?.toLowerCase().replace(/\s+/g, "") === value?.toLowerCase().replace(/\s+/g, "")
                );
            })
            .required("Column name is required"),
        tasks: Yup.array().of(taskValidationSchema),
    });
};

export const getValidationSchema = (type: string) => {
    return Yup.object().shape({
        name: Yup.string()
            .test(spaceTest.title, spaceTest.message, spaceTest.function)
            .min(2, "Name must contain at least 2 characters")
            .max(40, "Name is too long")
            .test("board-name-exists", "Board name already exists", function (value) {
                const dataState = store.getState();
                const boardsState = dataState.boards.boards;
                const getBoards = (type: string) => {
                    if (type === "add") {
                        return boardsState;
                    }

                    if (type === "edit") {
                        const options = this.options as any;
                        const id = options.context.id;
                        return boardsState.filter((board) => board.id !== id);
                    }
                };
                const boards = getBoards(type);
                return !boards?.some(
                    (board) =>
                        board.name?.toLowerCase().replace(/\s+/g, "") === value?.toLowerCase().replace(/\s+/g, "")
                );
            })
            .required("Name is required"),
        columns: Yup.array().of(getColumnSchema()),
    });
};

export const placeholderOptions = [
    "e.g. Todo",
    "e.g. Doing",
    "e.g. Done",
    "e.g. To check",
    "e.g. In Review",
    "e.g. Ready for Testing",
    "e.g. Testing",
    "e.g. Needs Clarification",
    "e.g. On Hold",
    "e.g. Ready for Deployment",
];

export const MAX_COLUMNS = 10;
