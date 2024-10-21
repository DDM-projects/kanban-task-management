import { useEffect, useState } from "react";
import {
    StyledHeader,
    StyledHeaderTitle,
    StyledContainer,
    StyledAddTaskButton,
    StyledMenuButton,
    StyledLogoContainer,
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
import logoDark from "../../../../assets/logo-dark.svg";

interface HeaderProps {
    board?: Board;
    onDelete?: () => void;
    updateBoard: (board: Board) => void;
}

const Header = ({ board, onDelete, updateBoard }: HeaderProps) => {
    const [isAddTaskButtonDisabled, setIsAddTaskButtonDisabled] = useState(!board?.columns?.length);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(isAddTaskModalOpen);
    const [isMenuButtonDisabled, setIsMenuButtonDisabled] = useState(!board);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
    const [isEditBoardModalVisible, setIsEditBoardModalVisible] = useState(isEditBoardModalOpen);
    const headerTitle = board ? board.name : defaultHeaderTitle;
    const deleteModalText = getDeleteModalText(board?.name || "");
    const statusOptions = board?.columns?.map((column) => column.name) || [];
    const transformedStatusOptions = statusOptions.map((option) => ({ value: option, label: option }));
    const defaultStatus = statusOptions[0];

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
        setIsAddTaskModalVisible(true);
    };

    const handleAddTaskModalCancel = () => {
        setIsAddTaskModalOpen(false);
    };

    const handleAddTaskModalAfterClose = () => {
        setIsAddTaskModalVisible(false);
    };

    const handleAddTask = (newTask: Task) => {
        if (!board) {
            return;
        }

        const updatedColumns =
            board.columns.map((column) => {
                if (column.name === newTask.status) {
                    return {
                        ...column,
                        tasks: [...column.tasks, newTask],
                    };
                } else {
                    return column;
                }
            });

        const updatedBoard = { ...board, columns: updatedColumns };
        updateBoard(updatedBoard);
    };

    const handleAddTaskSubmit = (task: Task) => {
        handleAddTask(task);
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
        setIsEditBoardModalVisible(true);
    };

    const handleEditModalCancel = () => {
        setIsEditBoardModalOpen(false);
    };

    const handleEditModalSubmit = (board: Board) => {
        updateBoard(board);
        handleEditModalCancel();
    };

    const handleEditModalAfterClose = () => {
        setIsEditBoardModalVisible(false);
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
            <StyledContainer>
                <StyledLogoContainer>
                    <img src={logoDark} alt="logo dark" />
                </StyledLogoContainer>
                <StyledHeader>
                    <StyledHeaderTitle>{headerTitle}</StyledHeaderTitle>
                    <StyledContainer $width={200}>
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
            </StyledContainer>
            <DeleteModal
                open={isDeleteModalOpen}
                onCancel={handleDeleteModalCancel}
                onDelete={handleDeleteBoard}
                title={deleteModalTitle}
                text={deleteModalText}
            />
            {isEditBoardModalVisible && (
                <AddOrEditBoardModal
                    open={isEditBoardModalOpen}
                    type="edit"
                    onCancel={handleEditModalCancel}
                    onSubmit={handleEditModalSubmit}
                    initialValues={board}
                    afterClose={handleEditModalAfterClose}
                />
            )}
            {isAddTaskModalVisible && (
                <AddNewOrEditTaskModal
                    open={isAddTaskModalOpen}
                    type="add"
                    onCancel={handleAddTaskModalCancel}
                    onSubmit={handleAddTaskSubmit}
                    statusOptions={transformedStatusOptions}
                    defaultStatus={defaultStatus}
                    afterClose={handleAddTaskModalAfterClose}
                />
            )}
        </>
    );
};

export default Header;
