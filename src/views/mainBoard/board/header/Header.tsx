import { useEffect, useState } from "react";
import {
    StyledHeader,
    StyledHeaderTitle,
    StyledContainer,
    StyledAddTaskButton,
    StyledMenuButton,
} from "./header.style";
import {
    defaultHeaderTitle,
    deleteModalTitle,
    getDeleteModalText,
    dropdownItemStyle,
    ADD_TASK_BUTTON_WIDTH,
} from "./header.data";
import { DROPDOWN_MENU_WIDTH } from "../../mainBoard.data";
import menuIcon from "../../../../assets/icon-vertical-ellipsis.svg";
import DeleteModal from "../../../modals/deleteBoardOrTaskModal/DeleteModal";
import AddOrEditBoardModal from "../../../modals/addOrEditBoardModal/AddOrEditBoardModal";
import AddNewOrEditTaskModal from "../../../modals/addNewOrEditTaskModal/AddNewOrEditTaskModal";
import { Dropdown, type MenuProps } from "antd";
import { Board, Task } from "../../../../types";
import { themeColors } from "../../../../theme";

interface HeaderProps {
    board?: Board;
    onDelete?: () => void;
    onEditSubmit?: (board: Board) => void;
    onAddTaskSubmit?: (task: Task) => void;
}

const Header = ({ board, onDelete, onEditSubmit, onAddTaskSubmit }: HeaderProps) => {
    const [isAddTaskButtonDisabled, setIsAddTaskButtonDisabled] = useState(!board?.columns?.length);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [isMenuButtonDisabled, setIsMenuButtonDisabled] = useState(!board);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
    const headerTitle = board ? board.name : defaultHeaderTitle;
    const deleteModalText = getDeleteModalText(board?.name || "");

    useEffect(() => {
        if (!board) {
            setIsMenuButtonDisabled(true);
            setIsAddTaskButtonDisabled(true);
        }

        if (board) {
            setIsMenuButtonDisabled(false);

            if (board.columns?.length > 0) {
                setIsAddTaskButtonDisabled(false);
            } else {
                setIsAddTaskButtonDisabled(true);
            }
        }
    }, [board]);

    const handleAddTaskButtonClick = () => {
        setIsAddTaskModalOpen(true);
    };

    const handleAddTaskModalCancel = () => {
        setIsAddTaskModalOpen(false);
    };

    const handleAddTaskSubmit = (task: Task) => {
        onAddTaskSubmit?.(task);
        handleAddTaskModalCancel();
    };

    const handleDeleteOptionClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteBoard = () => {
        onDelete?.();
        handleDeleteModalCancel();
    };

    const handleEditOptionClick = () => {
        setIsEditBoardModalOpen(true);
    };

    const handleEditModalCancel = () => {
        setIsEditBoardModalOpen(false);
    };

    const handleEditModalSubmit = (board: Board) => {
        onEditSubmit?.(board);
        handleEditModalCancel();
    };

    const items: MenuProps["items"] = [
        {
            key: "edit",
            label: "Edit Board",
            onClick: handleEditOptionClick,
            style: { ...dropdownItemStyle, color: themeColors.grey },
        },
        {
            key: "delete",
            label: "Delete Board",
            onClick: handleDeleteOptionClick,
            style: { ...dropdownItemStyle, color: themeColors.red },
        },
    ];

    //TODO: handle dark mode

    return (
        <>
            <StyledHeader>
                <StyledHeaderTitle>{headerTitle}</StyledHeaderTitle>
                <StyledContainer>
                    <StyledAddTaskButton
                        disabled={isAddTaskButtonDisabled}
                        category="primaryLarge"
                        width={ADD_TASK_BUTTON_WIDTH}
                        buttonFunction={handleAddTaskButtonClick}
                    >
                        + Add New Task
                    </StyledAddTaskButton>
                    <Dropdown
                        placement="bottomRight"
                        menu={{ items }}
                        trigger={["click"]}
                        overlayStyle={{ width: DROPDOWN_MENU_WIDTH }}
                    >
                        <StyledMenuButton disabled={isMenuButtonDisabled} $isDisabled={isMenuButtonDisabled}>
                            <img src={menuIcon} alt="menu-icon" />
                        </StyledMenuButton>
                    </Dropdown>
                </StyledContainer>
            </StyledHeader>

            {isDeleteModalOpen && (
                <DeleteModal
                    open={isDeleteModalOpen}
                    onCancel={handleDeleteModalCancel}
                    onDelete={handleDeleteBoard}
                    title={deleteModalTitle}
                    text={deleteModalText}
                />
            )}

            {isEditBoardModalOpen && (
                <AddOrEditBoardModal
                    open={isEditBoardModalOpen}
                    type="edit"
                    onCancel={handleEditModalCancel}
                    onSubmit={handleEditModalSubmit}
                    initialValues={board}
                />
            )}

            {isAddTaskModalOpen && (
                <AddNewOrEditTaskModal
                    open={isAddTaskModalOpen}
                    type="add"
                    onCancel={handleAddTaskModalCancel}
                    onSubmit={handleAddTaskSubmit}
                />
            )}
        </>
    );
};

export default Header;
