import React, { useEffect, useRef, useState } from "react";
import { StyledModal, StyledContainerRow, StyledContainerColumn, StyledButton } from "../modals.style";
import {
    getInitialAddNewTaskValues,
    validationSchema,
    MAX_SUBTASKS,
    placeholderOptions,
} from "./addNewOrEditTaskModal.data";
import { Subtask, Task } from "../../../types";
import { Form, Formik, FormikProps } from "formik";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Label from "../../../components/label/Label";
import Select from "../../../components/select/Select";
import _ from "lodash";
import cross from "../../../assets/icon-cross.svg";
import { useSelector } from "react-redux";
import { selectBoard } from "../../../state/selectedBoard/selectedBoardSlice";
import { getTransformedStatusOptions } from "../../utils/viewsUtils";
import { nanoid } from "nanoid";

interface AddNewOrEditTaskModalProps {
    open: boolean;
    width?: number;
    type: "add" | "edit";
    initialValues?: Task;
    destroyOnClose?: boolean;
    onCancel: () => void;
    onSubmit: (values: Task) => void;
    afterClose?: () => void;
}

const AddNewOrEditTaskModal = ({
    open,
    width = 480,
    type,
    initialValues,
    destroyOnClose = true,
    onCancel,
    onSubmit,
    afterClose,
}: AddNewOrEditTaskModalProps) => {
    const selectedBoard = useSelector(selectBoard);
    const transformedStatusOptions = selectedBoard ? getTransformedStatusOptions(selectedBoard) : [];
    const defaultStatus = transformedStatusOptions[0] || { value: "", label: "" };
    const initialAddNewTaskValues = getInitialAddNewTaskValues(defaultStatus);
    const [currentInitialValues, setCurrentInitialValues] = useState<Task>(initialValues || initialAddNewTaskValues);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [subtasksLength, setSubtasksLength] = useState(
        initialValues?.subtasks.length || initialAddNewTaskValues.subtasks.length
    );
    const [isScrollVisible, setIsScrollVisible] = useState(false);
    const formikValuesRef = useRef<FormikProps<Task> | null>(null);

    const checkIfScrollAppeared = () => {
        const modalBody = document.querySelector(".ant-modal-body");
        const modalScroll = modalBody ? modalBody.scrollHeight > modalBody.clientHeight : false;

        if (modalScroll) {
            setIsScrollVisible(true);
        } else {
            setIsScrollVisible(false);
        }
    };

    const addNewSubtask = () => {
        const subtasksLength = formikValuesRef.current?.values?.subtasks?.length;

        if (subtasksLength && subtasksLength >= MAX_SUBTASKS) {
            return;
        }

        const newSubtask: Subtask = {
            id: nanoid(),
            title: "",
            completed: false,
            taskId: "",
            index: 0,
        };

        formikValuesRef.current?.setValues({
            ...formikValuesRef.current?.values,
            subtasks: [...formikValuesRef.current?.values.subtasks, newSubtask],
        });

        setSubtasksLength((prev) => prev + 1);
    };

    const updateSubtasksAfterDelete = (id: string) => {
        formikValuesRef.current?.setValues({
            ...formikValuesRef.current?.values,
            subtasks: formikValuesRef.current?.values.subtasks.filter((subtask) => subtask.id !== id),
        });

        setSubtasksLength((prev) => prev - 1);
    };

    const handleSubmit = (values: Task) => {
        const subtasks = values.subtasks.map((subtask, index) => ({ ...subtask, index }));
        const column = selectedBoard?.statuses.find((status) => status.name === values.statusName);
        values.subtasks = subtasks;

        if (type === "add") {
            values.index = column?.tasks.length || 0;
        }
        setCurrentInitialValues(values);
        onSubmit(values);
    };

    useEffect(() => {
        checkIfScrollAppeared();
    }, [subtasksLength]);

    const modalTitle = type === "add" ? "Add New Task" : "Edit Task";
    const buttonTitle = type === "add" ? "Create Task" : "Save Changes";

    //TODO: handle dark mode

    return (
        <StyledModal
            title={modalTitle}
            open={open}
            width={width}
            centered
            closable={false}
            footer={null}
            onCancel={onCancel}
            destroyOnClose={destroyOnClose}
            afterClose={afterClose}
            $isScrollVisible={isScrollVisible}
        >
            <Formik
                initialValues={currentInitialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                innerRef={formikValuesRef}
            >
                {({ values, setFieldValue }) => {
                    //eslint-disable-next-line
                    useEffect(() => {
                        if (!_.isEqual(values, currentInitialValues)) {
                            setIsButtonDisabled(false);
                        } else {
                            setIsButtonDisabled(true);
                        }
                        // eslint-disable-next-line
                    }, [values, currentInitialValues]);

                    return (
                        <Form>
                            <StyledContainerColumn data-testid="add-or-edit-task-modal">
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
                                                    <StyledButton
                                                        type="button"
                                                        onClick={() => updateSubtasksAfterDelete(subtask.id)}
                                                    >
                                                        <img src={cross} alt="cross" className="modal-img" />
                                                    </StyledButton>
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
                                <Select
                                    name="statusId"
                                    label="Status"
                                    options={transformedStatusOptions}
                                    onChange={(value) => {
                                        const status = transformedStatusOptions.find(
                                            (option) => option.value === value
                                        );
                                        status && setFieldValue("statusName", status.label);
                                    }}
                                ></Select>
                                <Button type="submit" category="primarySmall" disabled={isButtonDisabled}>
                                    {buttonTitle}
                                </Button>
                            </StyledContainerColumn>
                        </Form>
                    );
                }}
            </Formik>
        </StyledModal>
    );
};

export default AddNewOrEditTaskModal;
