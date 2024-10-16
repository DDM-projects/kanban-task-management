import { StyledMainContainer, StyledRowContainer, StyledBoardContainer } from "./mainBoard.style";
import Sidebar from "./sidebar/Sidebar";
import Header from "./board/header/Header";
import Board from "./board/Board";
import { useState } from "react";
import { Board as BoardType } from "../../types";

const MainBoard = () => {
    const [boards, setBoards] = useState<BoardType[]>([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [selectedBoardId, setSelectedBoardId] = useState<string>(boards[0].id || "");
    const selectedBoard = boards?.find((board) => board.id === selectedBoardId) || boards[0];

    const handleMenuItemSelect = (id: string) => {
        setSelectedBoardId(id);
    };

    const handleAddBoardSubmit = (board: BoardType) => {
        setBoards([...boards, board]);
        setSelectedBoardId(board.id);
    };

    const handleSidebarVisibility = (isVisible: boolean) => {
        setIsSidebarVisible(isVisible);
    };

    const handleEditBoardSubmit = (values: BoardType) => {
        //TODO: create function
    };

    const handleChangeColumnColor = (id: string, color: string) => {
        //TODO: create function
    };

    return (
        <StyledMainContainer>
            <Header />
            <StyledRowContainer>
                <Sidebar
                    setSidebarVisibility={handleSidebarVisibility}
                    boards={boards}
                    onMenuItemSelect={handleMenuItemSelect}
                    selectedKeys={[selectedBoardId]}
                    onAddBoardSubmit={handleAddBoardSubmit}
                />
                <StyledBoardContainer $isSidebarVisible={isSidebarVisible}>
                    <Board
                        onSubmit={handleEditBoardSubmit}
                        board={selectedBoard}
                        changeColumnColor={handleChangeColumnColor}
                    />
                </StyledBoardContainer>
            </StyledRowContainer>
        </StyledMainContainer>
    );
};

export default MainBoard;
