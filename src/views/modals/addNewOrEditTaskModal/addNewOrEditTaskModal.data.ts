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
        .max(60, "Title is too long")
        .required("Title is required"),
    isCompleted: Yup.boolean(),
});

export const validationSchema = Yup.object().shape({
    title: Yup.string()
        .test(spaceTest.title, spaceTest.message, spaceTest.function)
        .min(2, "Title must contain at least 2 characters")
        .max(80, "Title is too long")
        .required("Title is required"),
    description: Yup.string()
        .test(spaceTest.title, spaceTest.message, spaceTest.function)
        .min(2, "Description must contain at least 2 characters")
        .max(140, "Description is too long"),
    subtasks: Yup.array().of(subtaskSchema),
    statusName: Yup.string().required("Status is required"),
});

export const getInitialAddNewTaskValues = (defaultStatus: string) => {
    return {
        id: "",
        title: "",
        description: "",
        subtasks: [
            {
                id: "",
                title: "",
                isCompleted: false,
            },
            {
                id: "",
                title: "",
                isCompleted: false,
            },
        ],
        statusName: defaultStatus,
        statusId: ""
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
