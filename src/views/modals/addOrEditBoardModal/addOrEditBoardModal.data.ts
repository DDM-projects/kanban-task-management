import { nanoid } from "nanoid";
import * as Yup from "yup";
import { validationSchema as taskValidationSchema } from "../addNewOrEditTaskModal/addNewOrEditTaskModal.data";
import { Board } from "../../../types";

export const initialAddBoardValues: Board = {
    id: nanoid(),
    name: "",
    columns: [
        {
            id: nanoid(),
            name: "",
            tasks: [],
            availableStatus: [],
            color: "#49C4E5",
        },
        {
            id: nanoid(),
            name: "",
            tasks: [],
            availableStatus: [],
            color: "#8471F2",
        },
    ],
};

export const columnSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Column name must contain at least 2 characters")
        .max(30, "Column name is too long")
        .required("Column name is required"),
    tasks: Yup.array().of(taskValidationSchema),
});

export const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must contain at least 2 characters")
        .max(40, "Name is too long")
        .required("Name is required"),
    columns: Yup.array().of(columnSchema),
});

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
