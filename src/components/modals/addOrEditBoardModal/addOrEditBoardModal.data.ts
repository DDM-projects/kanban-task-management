import { nanoid } from "nanoid";
import * as Yup from "yup";
import { validationSchema as taskValidationSchema } from "../addNewOrEditTaskModal/addNewOrEditTaskModal.data";
import { Board } from "../../../types";

export const initialAddBoardValues: Board = {
    name: "",
    columns: [
        {
            id: nanoid(),
            name: "",
            tasks: [],
        },
        {
            id: nanoid(),
            name: "",
            tasks: [],
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

export const placeholderOptions = ["e.g. Todo", "e.g. Doing", "e.g. Done", "e.g. To check"];

export const MAX_COLUMNS = 4;

export const MIN_COLUMNS = 2;
