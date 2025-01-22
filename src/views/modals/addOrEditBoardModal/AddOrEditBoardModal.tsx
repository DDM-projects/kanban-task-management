import { useEffect, useRef, useState } from "react";
import { StyledModal, StyledContainerRow, StyledContainerColumn, StyledButton } from "../modals.style";
import { Form, Formik, FormikProps } from "formik";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Label from "../../../components/label/Label";
import _ from "lodash";
import cross from "../../../assets/icon-cross.svg";
import {
    getRandomColor,
    getInitialAddBoardValues,
    MAX_COLUMNS,
    placeholderOptions,
    getValidationSchema,
} from "./addOrEditBoardModal.data";
import { Board, Column } from "../../../types";
import React from "react";
import { ColorPicker } from "antd";

interface AddOrEditBoardModalProps {
    open: boolean;
    width?: number;
    type: "add" | "edit";
    initialValues?: Board;
    destroyOnClose?: boolean;
    onCancel: () => void;
    onSubmit: (values: Board) => void;
    afterClose?: () => void;
}

const AddOrEditBoardModal = ({
    open,
    width = 480,
    type,
    initialValues,
    destroyOnClose = true,
    onCancel,
    onSubmit,
    afterClose,
}: AddOrEditBoardModalProps) => {
    const initialAddBoardValues = getInitialAddBoardValues();
    const [columnsLength, setColumnsLength] = useState(
        initialValues?.statuses.length || initialAddBoardValues.statuses.length
    );
    const [currentInitialValues, setCurrentInitialValues] = useState<Board>(initialValues || initialAddBoardValues);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isScrollVisible, setIsScrollVisible] = useState(false);
    const formikValuesRef = useRef<FormikProps<Board> | null>(null);
    const validationSchema = getValidationSchema(type);

    const checkIfScrollAppeared = () => {
        const modalBody = document.querySelector(".ant-modal-body");
        const modalScroll = modalBody ? modalBody.scrollHeight > modalBody.clientHeight : false;

        if (modalScroll) {
            setIsScrollVisible(true);
        } else {
            setIsScrollVisible(false);
        }
    };

    const addNewColumn = () => {
        const columnsLength = formikValuesRef.current?.values?.statuses?.length;

        if (columnsLength && columnsLength >= MAX_COLUMNS) {
            return;
        }

        const newColumn: Column = {
            id: "",
            name: "",
            tasks: [],
            color: getRandomColor(),
        };

        formikValuesRef.current?.setValues({
            ...formikValuesRef.current?.values,
            statuses: [...formikValuesRef.current?.values.statuses, newColumn],
        });

        setColumnsLength((prev) => prev + 1);
    };

    const updateColumnsAfterDelete = (id: string) => {
        formikValuesRef.current?.setValues({
            ...formikValuesRef.current?.values,
            statuses: formikValuesRef.current?.values.statuses.filter((status) => status.id !== id),
        });

        setColumnsLength((prev) => prev - 1);
    };

    const handleSubmit = (values: Board) => {
        setCurrentInitialValues(values);
        onSubmit(values);
    };

    useEffect(() => {
        checkIfScrollAppeared();
    }, [columnsLength]);

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
            $isScrollVisible={isScrollVisible}
            afterClose={afterClose}
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
                        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                    {values.statuses.map((status, index) => {
                                        return (
                                            <React.Fragment key={status.id}>
                                                <StyledContainerRow>
                                                    <Input
                                                        width={360}
                                                        name={`statuses[${index}].name`}
                                                        placeholder={placeholderOptions[index]}
                                                        type="text"
                                                    />
                                                    <ColorPicker
                                                        size="small"
                                                        defaultValue={status.color}
                                                        onChangeComplete={(value) =>
                                                            setFieldValue(
                                                                `statuses[${index}].color`,
                                                                value.toHexString()
                                                            )
                                                        }
                                                    />
                                                    {values.statuses.length && (
                                                        <StyledButton
                                                            type="button"
                                                            onClick={() => updateColumnsAfterDelete(status.id)}
                                                        >
                                                            <img src={cross} alt="cross" className="modal-img" />
                                                        </StyledButton>
                                                    )}
                                                </StyledContainerRow>
                                            </React.Fragment>
                                        );
                                    })}
                                    {values.statuses.length >= MAX_COLUMNS && (
                                        <p className="formik-error">You can add max {MAX_COLUMNS} columns</p>
                                    )}
                                    <Button
                                        buttonFunction={addNewColumn}
                                        category="secondary"
                                        disabled={values.statuses.length >= MAX_COLUMNS}
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
