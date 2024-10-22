import {
    StyledMainContainer,
    StyledNewColumnContainer,
    StyledNewColumnButton,
    StyledContainer,
    StyledAddColummnButton,
    StyledText,
} from "./board.style";
import Column from "./column/Column";
import { Board as BoardType, Column as ColumnType } from "../../../types";
import AddOrEditBoardModal from "../../modals/addOrEditBoardModal/AddOrEditBoardModal";
import { useState } from "react";

interface BoardProps {
    board: BoardType;
    updateBoard: (values: BoardType) => void;
}

const Board = ({ board, updateBoard }: BoardProps) => {
    const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
    const [isEditBoardModalVisible, setIsEditBoardModalVisible] = useState(isEditBoardModalOpen);
    const statusOptions = board?.columns?.map((column) => column.name) || [];
    const checkIfColumnExists = !!board?.columns?.length;
    const checkIfBoardExists = !!board;

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

    const handleSubmit = (values: BoardType) => {
        updateBoard(values);
        setIsEditBoardModalOpen(false);
    };

    const handleEditColumn = (updatedColumn: ColumnType) => {
        const updatedColumns = board.columns.map((column) => (column.id === updatedColumn.id ? updatedColumn : column));
        updateBoard({ ...board, columns: updatedColumns });
    };

    const getEmptyBoardView = () => {
        if (checkIfBoardExists && !checkIfColumnExists) {
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
        if (checkIfColumnExists) {
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
        <StyledMainContainer $isAddColumnButtonVisible={!checkIfColumnExists}>
            {board?.columns?.map((column) => (
                <Column key={column.id} column={column} statusOptions={statusOptions} updateColumn={handleEditColumn} />
            ))}
            {emptyBoardView}
            {boardWithColumnsView}

            {isEditBoardModalVisible && (
                <AddOrEditBoardModal
                    open={isEditBoardModalOpen}
                    onCancel={handleEditBoardModalCancel}
                    type="edit"
                    onSubmit={handleSubmit}
                    initialValues={board}
                    afterClose={handleEditBoardModalAfterClose}
                />
            )}
        </StyledMainContainer>
    );
};

export default Board;
