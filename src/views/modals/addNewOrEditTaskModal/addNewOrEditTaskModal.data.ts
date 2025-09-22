import { nanoid } from "nanoid";
import * as Yup from "yup";

export const spaceTest = {
    title: "No-leading-trailing-spaces",
    message: "Cannot contain leading and trailing spaces",
    function: (value: string | undefined) => value === value?.trim(),
};

export const subtaskSchema = Yup.object().shape({
    title: Yup.string()
        .test(spaceTest.title, spaceTest.message, spaceTest.function)
        .min(2, "Title must contain at least 2 characters")
        .max(100, "Title is too long")
        .required("Title is required"),
    completed: Yup.boolean(),
});

export const validationSchema = Yup.object().shape({
    title: Yup.string()
        .test(spaceTest.title, spaceTest.message, spaceTest.function)
        .min(2, "Title must contain at least 2 characters")
        .max(100, "Title is too long")
        .required("Title is required"),
    description: Yup.string()
        .test(spaceTest.title, spaceTest.message, spaceTest.function)
        .min(2, "Description must contain at least 2 characters")
        .max(200, "Description is too long"),
    subtasks: Yup.array().of(subtaskSchema),
    statusName: Yup.string().required("Status is required"),
});

export const getInitialAddNewTaskValues = (defaultStatus: { value: string; label: string }) => {
    return {
        id: "",
        title: "",
        description: "",
        subtasks: [
            {
                id: nanoid(),
                title: "",
                completed: false,
                taskId: "",
                index: 0,
            },
            {
                id: nanoid(),
                title: "",
                completed: false,
                taskId: "",
                index: 1,
            },
        ],
        statusName: defaultStatus.label,
        statusId: defaultStatus.value,
        index: 0,
    };
};

export const placeholderOptions = [
    "e.g. Make coffee",
    "e.g. Drink coffee and smile",
    "e.g. Eat some tasty cokkie for dessert",
    "e.g. Stretch a little",
    "e.g. Take a walk across the room",
    "e.g. Wash the dishes after coffee",
];

export const MAX_SUBTASKS = 6;
