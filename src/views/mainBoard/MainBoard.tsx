import { StyledMainContainer, StyledRowContainer, StyledBoardContainer } from "./mainBoard.style";
import Sidebar from "./sidebar/Sidebar";
import Header from "./board/header/Header";
import Board from "./board/Board";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../state/store";
import { selectBoard } from "../../state/selectedBoard/selectedBoardSlice";
import { selectBoards, setBoards } from "../../state/boards/boardsSlice";
import _ from "lodash";

const MainBoard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const boards = useSelector(selectBoards);
    const selectedBoard = useSelector(selectBoard);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const handleSidebarVisibility = (isVisible: boolean) => {
        setIsSidebarVisible(isVisible);
    };

    useEffect(() => {
        const board = boards.find((board) => board.id === selectedBoard.id);

        if (!_.isEqual(board, selectedBoard) && !!selectedBoard) {
            const newBoards = boards.map((item) => (item.id === board?.id ? selectedBoard : item));
            dispatch(setBoards(newBoards));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBoard]);

    return (
        <StyledMainContainer>
            <Header />
            <StyledRowContainer>
                <Sidebar setSidebarVisibility={handleSidebarVisibility} />
                <StyledBoardContainer $isSidebarVisible={isSidebarVisible}>
                    <Board />
                </StyledBoardContainer>
            </StyledRowContainer>
        </StyledMainContainer>
    );
};

export default MainBoard;
