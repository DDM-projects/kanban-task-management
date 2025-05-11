import { StyledMainContainer, StyledRowContainer, StyledBoardContainer } from "./mainBoard.style";
import Sidebar from "./sidebar/Sidebar";
import Header from "./board/header/Header";
import Board from "./board/Board";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { setSelectedBoard } from "../../state/selectedBoard/selectedBoardSlice";
import { setBoards } from "../../state/boards/boardsSlice";
import { getAllBoards, getBoardById } from "../../service/services";

const MainBoard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const handleSidebarVisibility = (isVisible: boolean) => {
        setIsSidebarVisible(isVisible);
    };

    const fetchBoards = async () => {
        const response = await getAllBoards();

        if (response.status !== "success") {
            console.error("error");
            return;
        }

        const fetchedBoards = response.data.map((board) => {
            return {
                id: board.id,
                name: board.name,
            };
        });

        if (fetchedBoards.length === 0) return;

        const boardResponse = await getBoardById(fetchedBoards[0].id);

        if (boardResponse.status !== "success") {
            console.error("error");
            return;
        }

        dispatch(setSelectedBoard(boardResponse.data));
        dispatch(setBoards(fetchedBoards));
    };

    useEffect(() => {
        fetchBoards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
