import {
    StyledAddNewOrEditTaskModal,
    StyledContainerRow,
    StyledContainerColumn,
    StyledButtonForImg,
} from "./addNewOrEditTaskModal.style";
import {
    AddNewOrEditTaskValues,
    initialAddNewTaskValues,
    statusOptions,
    validationSchema,
    MAX_SUBTASKS,
    placeholderOptions,
} from "./addNewOrEditTaskModal.data";
import { Form, Formik, ErrorMessage, FormikProps } from "formik";
import Input from "../../input/Input";
import Button from "../../button/Button";
import cross from "../../../assets/icon-cross.svg";
import Label from "../../label/Label";
import Select from "../../select/Select";
import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import _ from "lodash";

interface AddNewOrEditTaskModalProps {
    open: boolean;
    width?: number;
    type: "add" | "edit";
    initialValues?: AddNewOrEditTaskValues;
    onCancel: () => void;
    onSubmit: (values: AddNewOrEditTaskValues) => void;
}

const AddNewOrEditTaskModal = ({
    open,
    width = 480,
    type,
    initialValues,
    onCancel,
    onSubmit,
}: AddNewOrEditTaskModalProps) => {
    const [currentInitialValues, setCurrentInitialValues] = useState<AddNewOrEditTaskValues>(
        initialValues || initialAddNewTaskValues
    );
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const formikValuesRef = useRef<FormikProps<AddNewOrEditTaskValues> | null>(null);

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

    const handleSubmit = (values: AddNewOrEditTaskValues) => {
        setCurrentInitialValues(values);
        onSubmit(values);
    };

    const modalTitle = type === "add" ? "Add New Task" : "Edit Task";
    const buttonTitle = type === "add" ? "Create Task" : "Save Changes";

    //TODO: handle dark mode
    return (
        <StyledAddNewOrEditTaskModal
            title={modalTitle}
            open={open}
            width={width}
            centered
            closable={false}
            footer={null}
            onCancel={onCancel}
        >
            <Formik
                initialValues={currentInitialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                innerRef={formikValuesRef}
            >
                {({ values }) => {
                    //eslint-disable-next-line
                    useEffect(() => {
                        if (!_.isEqual(values, currentInitialValues)) {
                            setIsButtonDisabled(false);
                        } else {
                            setIsButtonDisabled(true);
                        }
                    }, [values, currentInitialValues]);

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
                                                        placeholder={placeholderOptions[index]}
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
                                <Button type="submit" category="primarySmall" disabled={isButtonDisabled}>
                                    {buttonTitle}
                                </Button>
                            </StyledContainerColumn>
                        </Form>
                    );
                }}
            </Formik>
        </StyledAddNewOrEditTaskModal>
    );
};

export default AddNewOrEditTaskModal;
