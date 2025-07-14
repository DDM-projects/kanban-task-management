import { StyledMainContainer, StyledRowContainer, StyledBoardContainer } from "./mainBoard.style";
import Sidebar from "./sidebar/Sidebar";
import Header from "./board/header/Header";
import Board from "./board/Board";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { setSelectedBoard } from "../../state/selectedBoard/selectedBoardSlice";
import { setBoards } from "../../state/boards/boardsSlice";
import { getAllBoards, getBoardById, getExampleData, postNewBoard } from "../../service/services";

const MainBoard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isExampleDataButtonVisible, setIsExampleDataButtonVisible] = useState(false);

    const handleSidebarVisibility = (isVisible: boolean) => {
        setIsSidebarVisible(isVisible);
    };

    const hideExampleDataButton = () => {
        setIsExampleDataButtonVisible(false);
    };

    const showExampleDataButton = () => {
        setIsExampleDataButtonVisible(true);
    };

    const handleAddExampleData = async () => {
        const response = await getExampleData();

        if (response.status !== "success") {
            console.error("error");
            return;
        }

        const exampleData = response.data;
        const postResponse = await postNewBoard(exampleData);

        if (postResponse.status !== "success") {
            console.error("error");
            return;
        }

        dispatch(setSelectedBoard(postResponse.data));
        dispatch(setBoards([postResponse.data]));
        hideExampleDataButton();
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

        if (fetchedBoards.length === 0) {
            showExampleDataButton();
            return;
        }

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
            <Header onLastBoardDelete={showExampleDataButton} />
            <StyledRowContainer>
                <Sidebar setSidebarVisibility={handleSidebarVisibility} onFirstBoardCreate={hideExampleDataButton} />
                <StyledBoardContainer $isSidebarVisible={isSidebarVisible}>
                    <Board
                        isAddExampleDataButtonVisible={isExampleDataButtonVisible}
                        addExampleDataButtonFunction={handleAddExampleData}
                    />
                </StyledBoardContainer>
            </StyledRowContainer>
        </StyledMainContainer>
    );
};

export default MainBoard;
