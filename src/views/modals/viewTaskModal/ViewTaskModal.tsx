import React from "react";
import { Subtask, Task } from "../../../types";
import Checkbox from "../../../components/checkbox/Checkbox";
import Label from "../../../components/label/Label";
import {
    StyledModal,
    StyledContainerColumn,
    StyledContainerRow,
    StyledTextContainer,
    StyledImgButton,
} from "../modals.style";
import Select, { SelectProps } from "../../../components/select/Select";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import menuIcon from "../../../assets/icon-vertical-ellipsis.svg";
import { Dropdown, type MenuProps } from "antd";
import { themeColors, fontBodyLarge } from "../../../theme";

interface ViewTaskModalProps {
    open: boolean;
    width?: number;
    onCancel: () => void;
    onDelete: () => void;
    onEdit: () => void;
    onChangeSelect: (id: string, status: string) => void;
    onChangeCheckbox: (id: string, isCompleted: boolean) => void;
    task: Task;
    statusOptions: SelectProps["options"];
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
    statusOptions,
    onChangeSelect,
    onChangeCheckbox,
}: ViewTaskModalProps) => {
    const countCompletedSubtasks = (subtasks: Subtask[]) => {
        return subtasks?.filter((subtask) => subtask.isCompleted).length;
    };

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
            title={
                <StyledContainerRow>
                    {task.title}
                    <Dropdown placement="bottom" menu={{ items }} trigger={["click"]} overlayStyle={{ width: 192 }}>
                        <StyledImgButton $width={5} $height={20} type="button">
                            <img src={menuIcon} alt="menu" />
                        </StyledImgButton>
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
                    value={task.status}
                    options={statusOptions}
                    onChange={(value: string) => onChangeSelect(task.id, value)}
                />
            </StyledContainerColumn>
        </StyledModal>
    );
};

export default ViewTaskModal;
