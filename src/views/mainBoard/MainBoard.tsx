import { StyledMainContainer, StyledRowContainer, StyledBoardContainer } from "./mainBoard.style";
import Sidebar from "./sidebar/Sidebar";
import Header from "./board/header/Header";
import Board from "./board/Board";
import { useState } from "react";
import { Board as BoardType } from "../../types";

const MainBoard = () => {
    const [boards, setBoards] = useState<BoardType[]>([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [selectedBoardId, setSelectedBoardId] = useState<string>(boards[0]?.id || "");
    const selectedBoard = boards?.find((board) => board.id === selectedBoardId) || boards[0];

    const handleMenuItemSelect = (id: string) => {
        setSelectedBoardId(id);
    };

    const handleAddBoard = (board: BoardType) => {
        setBoards([...boards, board]);
        setSelectedBoardId(board.id);
    };

    const handleSidebarVisibility = (isVisible: boolean) => {
        setIsSidebarVisible(isVisible);
    };

    const handleDeleteBoard = () => {
        const updatedBoards = boards.filter((board) => board.id !== selectedBoardId);
        setBoards(updatedBoards);
        setSelectedBoardId(updatedBoards[0]?.id || "");
    };

    const handleEditBoard = (updatedBoard: BoardType) => {
        const updatedBoards = boards.map((board) => (board.id === updatedBoard.id ? updatedBoard : board));
        setBoards(updatedBoards);
    };

    return (
        <StyledMainContainer>
            <Header board={selectedBoard} onDelete={handleDeleteBoard} updateBoard={handleEditBoard} />
            <StyledRowContainer>
                <Sidebar
                    setSidebarVisibility={handleSidebarVisibility}
                    boards={boards}
                    onMenuItemSelect={handleMenuItemSelect}
                    selectedKeys={[selectedBoardId]}
                    onAddBoardSubmit={handleAddBoard}
                />
                <StyledBoardContainer $isSidebarVisible={isSidebarVisible}>
                    <Board updateBoard={handleEditBoard} board={selectedBoard} />
                </StyledBoardContainer>
            </StyledRowContainer>
        </StyledMainContainer>
    );
};

export default MainBoard;
