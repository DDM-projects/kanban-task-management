import React from "react";
import { Task } from "../../../types";
import Checkbox from "../../../components/checkbox/Checkbox";
import Label from "../../../components/label/Label";
import {
    StyledModal,
    StyledContainerColumn,
    StyledContainerRow,
    StyledTextContainer,
    StyledButton,
} from "../modals.style";
import Select from "../../../components/select/Select";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import menuIcon from "../../../assets/icon-vertical-ellipsis.svg";
import { Dropdown, type MenuProps } from "antd";
import { themeColors, fontBodyLarge } from "../../../theme";
import { DROPDOWN_MENU_WIDTH } from "../../mainBoard/mainBoard.data";
import { countCompletedSubtasks, getTransformedStatusOptions } from "../../utils/viewsUtils";
import { useSelector } from "react-redux";
import { selectBoard } from "../../../state/selectedBoard/selectedBoardSlice";

interface ViewTaskModalProps {
    open: boolean;
    width?: number;
    onCancel: () => void;
    onDelete: () => void;
    onEdit: () => void;
    onChangeSelect: (status: string) => void;
    onChangeCheckbox: (id: string, isCompleted: boolean) => void;
    task: Task;
    destroyOnClose?: boolean;
}

const dropdownItemStyle = {
    height: 33,
    ...fontBodyLarge,
    borderRadius: 8,
};

const ViewTaskModal = ({
    open,
    width = 480,
    onCancel,
    onDelete,
    onEdit,
    task,
    onChangeSelect,
    onChangeCheckbox,
    destroyOnClose = true,
}: ViewTaskModalProps) => {
    const selectedBoard = useSelector(selectBoard);
    const transformedStatusOptions = getTransformedStatusOptions(selectedBoard);

    const items: MenuProps["items"] = [
        {
            key: "edit",
            label: "Edit Task",
            onClick: onEdit,
            style: { ...dropdownItemStyle, color: themeColors.grey },
        },
        {
            key: "delete",
            label: "Delete Task",
            onClick: onDelete,
            style: { ...dropdownItemStyle, color: themeColors.red },
        },
    ];

    //TODO: handle dark mode

    return (
        <StyledModal
            open={open}
            width={width}
            centered
            closable={false}
            footer={null}
            onCancel={onCancel}
            destroyOnClose={destroyOnClose}
            title={
                <StyledContainerRow>
                    {task.title}
                    <Dropdown
                        placement="bottom"
                        menu={{ items }}
                        trigger={["click"]}
                        overlayStyle={{ width: DROPDOWN_MENU_WIDTH }}
                    >
                        <StyledButton $width={5} $height={20} type="button">
                            <img src={menuIcon} alt="menu" />
                        </StyledButton>
                    </Dropdown>
                </StyledContainerRow>
            }
        >
            <StyledContainerColumn>
                <StyledTextContainer>{task.description}</StyledTextContainer>
                <Label
                    label={`Subtask ${countCompletedSubtasks(task.subtasks)} of ${task.subtasks?.length}`}
                    marginBottom={0}
                />
                {task.subtasks?.map((subtask, index) => {
                    return (
                        <React.Fragment key={subtask.id}>
                            <Checkbox
                                name={`subtasks[${index}].title`}
                                value={subtask.isCompleted}
                                onChange={(e: CheckboxChangeEvent) => onChangeCheckbox(subtask.id, e.target.checked)}
                            >
                                {subtask.title}
                            </Checkbox>
                        </React.Fragment>
                    );
                })}
                <Select
                    label="Current status"
                    name="status"
                    value={task.status}
                    options={transformedStatusOptions}
                    onChange={(value: string) => onChangeSelect(value)}
                />
            </StyledContainerColumn>
        </StyledModal>
    );
};

export default ViewTaskModal;
