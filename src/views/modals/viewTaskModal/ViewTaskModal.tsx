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
    onChangeSelect: (status: { value: string; label: string }) => void;
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
    const transformedStatusOptions = selectedBoard ? getTransformedStatusOptions(selectedBoard) : [];

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

    const handleChangeSelect = (value: string) => {
        const status = transformedStatusOptions.find((option) => option.value === value);
        status && onChangeSelect(status);
    };

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
                        align={{ offset: [0, 15] }}
                    >
                        <StyledButton $width={5} $height={20} $paddingLeft={10} type="button">
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
                                value={subtask.completed}
                                onChange={(e: CheckboxChangeEvent) => onChangeCheckbox(subtask.id, e.target.checked)}
                            >
                                {subtask.title}
                            </Checkbox>
                        </React.Fragment>
                    );
                })}
                <Select
                    label="Current status"
                    name="statusId"
                    value={task.statusId}
                    options={transformedStatusOptions}
                    onChange={handleChangeSelect}
                />
            </StyledContainerColumn>
        </StyledModal>
    );
};

export default ViewTaskModal;
