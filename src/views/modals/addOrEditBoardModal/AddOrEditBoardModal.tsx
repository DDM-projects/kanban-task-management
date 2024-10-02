import { useEffect, useRef, useState } from "react";
import { StyledModal, StyledContainerRow, StyledContainerColumn, StyledButton } from "../modals.style";
import { Form, Formik, FormikProps } from "formik";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Label from "../../../components/label/Label";
import _ from "lodash";
import cross from "../../../assets/icon-cross.svg";
import { initialAddBoardValues, MAX_COLUMNS, placeholderOptions, validationSchema } from "./addOrEditBoardModal.data";
import { Board, Column } from "../../../types";
import React from "react";
import { nanoid } from "nanoid";

interface AddOrEditBoardModalProps {
    open: boolean;
    width?: number;
    type: "add" | "edit";
    initialValues?: Board;
    destroyOnClose?: boolean;
    onCancel: () => void;
    onSubmit: (values: Board) => void;
}

const AddOrEditBoardModal = ({
    open,
    width = 480,
    type,
    initialValues,
    destroyOnClose = true,
    onCancel,
    onSubmit,
}: AddOrEditBoardModalProps) => {
    const [currentInitialValues, setCurrentInitialValues] = useState<Board>(initialValues || initialAddBoardValues);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const formikValuesRef = useRef<FormikProps<Board> | null>(null);

    const addNewColumn = () => {
        const columnsLength = formikValuesRef.current?.values?.columns?.length;

        if (columnsLength && columnsLength >= MAX_COLUMNS) {
            return;
        }

        const newColumn: Column = {
            id: nanoid(),
            name: "",
            tasks: [],
            availableStatus: [],
        };

        formikValuesRef.current?.setValues({
            ...formikValuesRef.current?.values,
            columns: [...formikValuesRef.current?.values.columns, newColumn],
        });
    };

    const updateColumnsAfterDelete = (id: string) => {
        formikValuesRef.current?.setValues({
            ...formikValuesRef.current?.values,
            columns: formikValuesRef.current?.values.columns.filter((column) => column.id !== id),
        });
    };

    const handleSubmit = (values: Board) => {
        setCurrentInitialValues(values);
        onSubmit(values);
    };

    const modalTitle = type === "add" ? "Add New Board" : "Edit Board";
    const buttonTitle = type === "add" ? "Create New Board" : "Save Changes";

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
                                    name="name"
                                    placeholder="E.g. Web Design"
                                    label="Board Name"
                                    id="name"
                                    type="text"
                                />
                                <StyledContainerColumn $gapSize={10}>
                                    <Label marginBottom={0} label={`Board Columns (max ${MAX_COLUMNS}) `} />
                                    {values.columns.map((column, index) => {
                                        return (
                                            <React.Fragment key={column.id}>
                                                <StyledContainerRow>
                                                    <Input
                                                        width={385}
                                                        name={`columns[${index}].name`}
                                                        placeholder={placeholderOptions[index]}
                                                        type="text"
                                                    />
                                                    {values.columns.length && (
                                                        <StyledButton
                                                            type="button"
                                                            onClick={() => updateColumnsAfterDelete(column.id)}
                                                        >
                                                            <img src={cross} alt="cross" className="modal-img" />
                                                        </StyledButton>
                                                    )}
                                                </StyledContainerRow>
                                            </React.Fragment>
                                        );
                                    })}
                                    {values.columns.length >= MAX_COLUMNS && (
                                        <p className="formik-error">You can add max {MAX_COLUMNS} columns</p>
                                    )}
                                    <Button
                                        buttonFunction={addNewColumn}
                                        category="secondary"
                                        disabled={values.columns.length >= MAX_COLUMNS}
                                    >
                                        + Add New Column
                                    </Button>
                                </StyledContainerColumn>
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

export default AddOrEditBoardModal;
