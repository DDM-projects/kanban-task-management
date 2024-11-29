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
import { useDispatch, useSelector } from "react-redux";
import { selectBoard, setSelectedBoard, addTask } from "../../../../state/selectedBoard/selectedBoardSlice";
import { deleteBoard, selectBoards } from "../../../../state/boards/boardsSlice";
import { AppDispatch } from "../../../../state/store";

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedBoard = useSelector(selectBoard);
    const boards = useSelector(selectBoards);
    const [isAddTaskButtonDisabled, setIsAddTaskButtonDisabled] = useState(!selectedBoard?.columns?.length);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(isAddTaskModalOpen);
    const [isMenuButtonDisabled, setIsMenuButtonDisabled] = useState(!selectedBoard);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
    const [isEditBoardModalVisible, setIsEditBoardModalVisible] = useState(isEditBoardModalOpen);
    const headerTitle = selectedBoard ? selectedBoard.name : defaultHeaderTitle;
    const deleteModalText = getDeleteModalText(selectedBoard?.name || "");

    useEffect(() => {
        if (!selectedBoard) {
            setIsMenuButtonDisabled(true);
            setIsAddTaskButtonDisabled(true);
        }

        if (selectedBoard) {
            setIsMenuButtonDisabled(false);

            if (selectedBoard.columns?.length > 0) {
                setIsAddTaskButtonDisabled(false);
            } else {
                setIsAddTaskButtonDisabled(true);
            }
        }
    }, [selectedBoard]);

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

    const handleAddTaskSubmit = (task: Task) => {
        if (!selectedBoard) {
            return;
        }

        dispatch(addTask(task));
        handleAddTaskModalCancel();
    };

    const handleDeleteOptionClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteBoard = () => {
        dispatch(deleteBoard(selectedBoard));

        if (boards && boards[0].id !== selectedBoard.id) {
            dispatch(setSelectedBoard(boards[0]));
        } else {
            dispatch(setSelectedBoard(boards[1]));
        }

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
        dispatch(setSelectedBoard(board));
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
                    initialValues={selectedBoard}
                    afterClose={handleEditModalAfterClose}
                />
            )}

            {isAddTaskModalVisible && (
                <AddNewOrEditTaskModal
                    open={isAddTaskModalOpen}
                    type="add"
                    onCancel={handleAddTaskModalCancel}
                    onSubmit={handleAddTaskSubmit}
                    afterClose={handleAddTaskModalAfterClose}
                />
            )}
        </>
    );
};

export default Header;
