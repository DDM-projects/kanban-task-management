import {
    StyledAddNewTaskModal,
    StyledContainerRow,
    StyledContainerColumn,
    StyledButtonForImg,
} from "./addNewTaskModal.style";
import { Form, Formik, ErrorMessage, FormikProps } from "formik";
import Input from "../../input/Input";
import Button from "../../button/Button";
import cross from "../../../assets/icon-cross.svg";
import Label from "../../label/Label";
import Select from "../../select/Select";
import {
    InitialAddNewTaskValues,
    initialAddNewTaskValues,
    statusOptions,
    validationSchema,
    MAX_SUBTASKS,
} from "./addNewTaskModal.data";
import React, { useRef } from "react";
import { nanoid } from "nanoid";

interface AddNewTaskModalProps {
    open: boolean;
    width?: number;
    onCancel: () => void;
    onSubmit: (values: InitialAddNewTaskValues) => void;
}

const AddNewTaskModal = ({ open, width = 480, onCancel, onSubmit }: AddNewTaskModalProps) => {
    const formikValuesRef = useRef<FormikProps<InitialAddNewTaskValues> | null>(null);

    const addNewSubtask = () => {
        const subtasksLength = formikValuesRef.current?.values?.subtasks?.length;

        if (subtasksLength && subtasksLength >= MAX_SUBTASKS) {
            return;
        }

        const newSubtask = {
            id: nanoid(),
            title: "",
            isCompleted: false,
        };

        formikValuesRef.current?.setValues({
            ...formikValuesRef.current?.values,
            subtasks: [...formikValuesRef.current?.values.subtasks, newSubtask],
        });
    };

    const updateSubtasksAfterDelete = (id: string) => {
        formikValuesRef.current?.setValues({
            ...formikValuesRef.current?.values,
            subtasks: formikValuesRef.current?.values.subtasks.filter((subtask) => subtask.id !== id),
        });
    };

    //TODO: handle dark mode
    return (
        <StyledAddNewTaskModal
            title="Add New Task"
            open={open}
            width={width}
            centered
            closable={false}
            footer={null}
            onCancel={onCancel}
        >
            <Formik
                initialValues={initialAddNewTaskValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                innerRef={formikValuesRef}
            >
                {({ values }) => {
                    return (
                        <Form>
                            <StyledContainerColumn>
                                <Input
                                    name="title"
                                    placeholder="e.g. Take coffee break"
                                    type="text"
                                    id="title"
                                    label="Title"
                                />
                                <Input
                                    name="description"
                                    placeholder="e.g. It's always good to take a break. This 15 minutes break will recharge the batteries a little"
                                    type="textarea"
                                    id="description"
                                    label="Description"
                                />
                                <ErrorMessage name="description" component="div" className="formik-error" />
                                <StyledContainerColumn $gapSize={10}>
                                    <Label marginBottom={0} label={`Subtasks (max ${MAX_SUBTASKS})`} />
                                    {values.subtasks.map((subtask, index) => {
                                        return (
                                            <React.Fragment key={subtask.id}>
                                                <StyledContainerRow>
                                                    <Input
                                                        width={385}
                                                        name={`subtasks[${index}].title`}
                                                        placeholder="e.g. Make coffee"
                                                        type="text"
                                                    />
                                                    <StyledButtonForImg
                                                        type="button"
                                                        onClick={() => updateSubtasksAfterDelete(subtask.id)}
                                                    >
                                                        <img src={cross} alt="cross" className="modal-img" />
                                                    </StyledButtonForImg>
                                                </StyledContainerRow>
                                            </React.Fragment>
                                        );
                                    })}
                                    {values.subtasks.length >= MAX_SUBTASKS && (
                                        <p className="formik-error">You can add max {MAX_SUBTASKS} subtasks</p>
                                    )}
                                    <Button
                                        buttonFunction={addNewSubtask}
                                        category="secondary"
                                        disabled={values.subtasks.length >= MAX_SUBTASKS}
                                    >
                                        + Add New Subtask
                                    </Button>
                                </StyledContainerColumn>
                                <Select label="Status" defaultValue="Todo" options={statusOptions}></Select>
                                <Button type="submit" category="primarySmall">
                                    Create Task
                                </Button>
                            </StyledContainerColumn>
                        </Form>
                    );
                }}
            </Formik>
        </StyledAddNewTaskModal>
    );
};

export default AddNewTaskModal;
