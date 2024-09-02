import * as Yup from "yup";
import { nanoid } from "nanoid";

export interface AddNewOrEditTaskValues {
    title: string;
    description: string;
    subtasks: { id: string; title: string; isCompleted: boolean }[];
    status: "Todo" | "Doing" | "Done";
}

const subtaskSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, "Title must contain at least 2 characters")
        .max(60, "Title is too long")
        .required("Title is required"),
    isCompleted: Yup.boolean(),
});

export const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, "Title must contain at least 2 characters")
        .max(60, "Title is too long")
        .required("Title is required"),
    description: Yup.string()
        .min(2, "Description must contain at least 2 characters")
        .max(100, "Description is too long"),
    subtasks: Yup.array().of(subtaskSchema),
    status: Yup.string().oneOf(["Todo", "Doing", "Done"]),
});

export const initialAddNewTaskValues: AddNewOrEditTaskValues = {
    title: "",
    description: "",
    subtasks: [
        {
            id: nanoid(),
            title: "",
            isCompleted: false,
        },
        {
            id: nanoid(),
            title: "",
            isCompleted: false,
        },
    ],
    status: "Todo",
};

export const statusOptions = [
    {
        value: "Todo",
        label: "Todo",
    },
    {
        value: "Doing",
        label: "Doing",
    },
    {
        value: "Done",
        label: "Done",
    },
];

export const placeholderOptions = [
    "e.g. Make coffee",
    "e.g. Drink coffee and smile",
    "e.g. Eat some tasty cokkie for dessert",
    "e.g. Stretch a little",
    "e.g. Take a walk across the room",
    "e.g. Wash the dishes after coffee",
];

export const MAX_SUBTASKS = 6;
