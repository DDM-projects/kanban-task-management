import {
    StyledMainContainer,
    StyledNewColumnContainer,
    StyledNewColumnButton,
    StyledContainer,
    StyledAddColummnButton,
    StyledText,
} from "./board.style";
import Column from "./column/Column";
import { Board as BoardType } from "../../../types";
import AddOrEditBoardModal from "../../modals/addOrEditBoardModal/AddOrEditBoardModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBoard, setSelectedBoard } from "../../../state/selectedBoard/selectedBoardSlice";
import { AppDispatch } from "../../../state/store";

const Board = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedBoard = useSelector(selectBoard);
    const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
    const [isEditBoardModalVisible, setIsEditBoardModalVisible] = useState(isEditBoardModalOpen);
    const columnExists = !!selectedBoard?.statuses?.length;
    const boardExists = !!selectedBoard;

    const handleEditBoardModalOpen = () => {
        setIsEditBoardModalOpen(true);
        setIsEditBoardModalVisible(true);
    };

    const handleEditBoardModalCancel = () => {
        setIsEditBoardModalOpen(false);
    };

    const handleEditBoardModalAfterClose = () => {
        setIsEditBoardModalVisible(false);
    };

    const handleSubmit = (updatedBoard: BoardType) => {
        dispatch(setSelectedBoard(updatedBoard));
        setIsEditBoardModalOpen(false);
    };

    const getEmptyBoardView = () => {
        if (boardExists && !columnExists) {
            return (
                <StyledContainer>
                    <StyledText>This board is empty. Create a new column to get started.</StyledText>
                    <StyledAddColummnButton
                        width={174}
                        buttonFunction={handleEditBoardModalOpen}
                        category="primaryLarge"
                    >
                        + Add New Column
                    </StyledAddColummnButton>
                </StyledContainer>
            );
        }
        return <></>;
    };

    const emptyBoardView = getEmptyBoardView();

    const getBoardWithColumnsView = () => {
        if (columnExists) {
            return (
                <StyledNewColumnContainer>
                    <StyledNewColumnButton onClick={handleEditBoardModalOpen}>+ New Column</StyledNewColumnButton>
                </StyledNewColumnContainer>
            );
        }
        return <></>;
    };

    const boardWithColumnsView = getBoardWithColumnsView();

    //TODO: handle dark mode

    return (
        <StyledMainContainer $isAddColumnButtonVisible={!columnExists}>
            {selectedBoard?.statuses?.map((column) => (
                <Column key={column.id} column={column} />
            ))}
            {emptyBoardView}
            {boardWithColumnsView}

            {isEditBoardModalVisible && (
                <AddOrEditBoardModal
                    open={isEditBoardModalOpen}
                    onCancel={handleEditBoardModalCancel}
                    type="edit"
                    onSubmit={handleSubmit}
                    initialValues={selectedBoard}
                    afterClose={handleEditBoardModalAfterClose}
                />
            )}
        </StyledMainContainer>
    );
};

export default Board;
