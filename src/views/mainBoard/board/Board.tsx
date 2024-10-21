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

interface BoardProps {
    board: BoardType;
    onSubmit: (values: BoardType) => void;
    changeColumnColor: (id: string, color: string) => void;
}

const Board = ({ board, onSubmit, changeColumnColor }: BoardProps) => {
    const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
    const statusOptions = board?.columns?.map((column) => column.name) || [];
    const checkIfColumnExists = !!board?.columns?.length;

    const handleEditBoardModalOpen = () => {
        setIsEditBoardModalOpen(true);
    };

    const handleEditBoardModalCancel = () => {
        setIsEditBoardModalOpen(false);
    };

    const handleColumnColorChange = (id: string, color: string) => {
        changeColumnColor(id, color);
    };

    const handleSubmit = (values: BoardType) => {
        onSubmit(values);
        setIsEditBoardModalOpen(false);
    };

    //TODO: handle dark mode

    return (
        <StyledMainContainer $isAddColumnButtonVisible={!checkIfColumnExists}>
            {board?.columns?.map((column) => (
                <Column
                    key={column.id}
                    column={column}
                    statusOptions={statusOptions}
                    changeColumnColor={(color: string) => handleColumnColorChange(column.id, color)}
                />
            ))}
            {checkIfColumnExists ? (
                <StyledNewColumnContainer>
                    <StyledNewColumnButton onClick={handleEditBoardModalOpen}>+ New Column</StyledNewColumnButton>
                </StyledNewColumnContainer>
            ) : (
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
            )}
            <AddOrEditBoardModal
                open={isEditBoardModalOpen}
                onCancel={handleEditBoardModalCancel}
                type="edit"
                onSubmit={handleSubmit}
                initialValues={board}
            />
        </StyledMainContainer>
    );
};

export default Board;
