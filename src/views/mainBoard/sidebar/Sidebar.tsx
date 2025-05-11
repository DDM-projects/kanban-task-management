import {
    itemStyle,
    StyledMainContainer,
    StyledSidebar,
    StyledColumnContainer,
    StyledTitle,
    StyledMenu,
    StyledCreateBoardButton,
    StyledRowContainer,
    StyledSwitch,
    StyledHideSidebarContainer,
    StyledHideSidebarButton,
    StyledShowSidebarButton,
} from "./sidebar.style";
import AddOrEditBoardModal from "../../modals/addOrEditBoardModal/AddOrEditBoardModal";
import { useEffect, useRef, useState } from "react";
import { Board } from "../../../types";
import type { MenuProps } from "antd";
import { Tooltip } from "antd";
import boardIcon from "../../../assets/icon-board.svg";
import lightThemeIcon from "../../../assets/icon-light-theme.svg";
import darkThemeIcon from "../../../assets/icon-dark-theme.svg";
import showSidebarIcon from "../../../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../../../assets/icon-hide-sidebar.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../state/store";
import { addBoard, selectBoards } from "../../../state/boards/boardsSlice";
import { setSelectedBoard, selectBoard } from "../../../state/selectedBoard/selectedBoardSlice";
import { themeColors } from "../../../theme";
import { getBoardById, postNewBoard } from "../../../service/services";

interface SidebarProps {
    setSidebarVisibility: (isVisible: boolean) => void;
}

const Sidebar = ({ setSidebarVisibility }: SidebarProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const boards = useSelector(selectBoards);
    const selectedBoard = useSelector(selectBoard);
    const [isSidebarDisplayed, setIsSidebarDisplayed] = useState(true);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false);
    const [isAddBoardModalVisible, setIsAddBoardModalVisible] = useState(isAddBoardModalOpen);
    const [tooltipVisibility, setTooltipVisibility] = useState<Record<string, boolean>>({});
    const textRef = useRef<Record<string, HTMLSpanElement>>({});

    useEffect(() => {
        const newTooltipVisibility: { [key: string]: boolean } = {};
        boards.forEach((board) => {
            const boardNameRef = textRef.current[board.id];

            if (boardNameRef) {
                const rect = boardNameRef.getBoundingClientRect();
                const isOverflowing = rect.width > 198;
                newTooltipVisibility[board.id] = isOverflowing;
            }
        });

        setTooltipVisibility(newTooltipVisibility);
    }, [boards]);

    const items: MenuProps["items"] = boards.map((board) => ({
        key: board.id,
        label: (
            <Tooltip
                color={themeColors.mainPurpleHover}
                overlayInnerStyle={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                title={board.name}
                mouseLeaveDelay={0}
                {...(tooltipVisibility[board.id] ? {} : { open: false })}
            >
                <span ref={(element) => (textRef.current[board.id] = element!)}>{board.name}</span>
            </Tooltip>
        ),
        icon: <img src={boardIcon} className="board-icon" alt="board icon" />,
        style: itemStyle,
    }));

    const handleMenuItemSelect = async (info: any) => {
        const currentSelectedBoard = boards?.find((board) => board.id === info.key) || boards[0];

        const fetchSelectedBoard = await getBoardById(currentSelectedBoard.id);

        if (fetchSelectedBoard.status !== "success") {
            console.error("error");
            return;
        }

        dispatch(setSelectedBoard(fetchSelectedBoard.data));
    };

    const handleHideSidebar = () => {
        setIsSidebarHidden(true);
        setTimeout(() => {
            setIsSidebarDisplayed(false);
        }, 1000);
        setSidebarVisibility(false);
    };

    const handleShowSidebar = () => {
        setIsSidebarDisplayed(true);
        setTimeout(() => {
            setIsSidebarHidden(false);
        }, 0);
        setSidebarVisibility(true);
    };

    const handleShowAddBoardModal = () => {
        setIsAddBoardModalVisible(true);
        setIsAddBoardModalOpen(true);
    };

    const handleAddBoardModalCancel = () => {
        setIsAddBoardModalOpen(false);
    };

    const handleAddBoardModalAfterClose = () => {
        setIsAddBoardModalVisible(false);
    };

    const handleAddBoardSubmit = async (board: Board) => {
        const response = await postNewBoard(board);

        if (response.status !== "success") {
            console.error("error");
            return;
        }

        dispatch(addBoard(response.data));
        dispatch(setSelectedBoard(response.data));
        handleAddBoardModalCancel();
    };

    //TODO: handle dark mode

    return (
        <>
            <StyledMainContainer>
                <StyledSidebar $isHidden={isSidebarHidden} $isDisplayed={isSidebarDisplayed}>
                    <StyledColumnContainer $gapSize={0}>
                        <StyledTitle>All boards ({boards.length})</StyledTitle>
                        <StyledMenu
                            items={items}
                            selectedKeys={[selectedBoard?.id || ""]}
                            onSelect={handleMenuItemSelect}
                        />
                        <StyledCreateBoardButton onClick={handleShowAddBoardModal}>
                            <img src={boardIcon} className="add-board-icon" alt="add board icon" /> + Create New Board
                        </StyledCreateBoardButton>
                    </StyledColumnContainer>
                    <StyledColumnContainer $alignItems="center" $gapSize={20}>
                        <StyledRowContainer>
                            <img src={lightThemeIcon} alt="light theme icon" />
                            <StyledSwitch />
                            <img src={darkThemeIcon} alt="dark theme icon" />
                        </StyledRowContainer>
                        <StyledHideSidebarContainer>
                            <StyledHideSidebarButton onClick={handleHideSidebar}>
                                <img src={hideSidebarIcon} className="hideSidebar-icon" alt="hide sidebar icon" />
                                Hide Sidebar
                            </StyledHideSidebarButton>
                        </StyledHideSidebarContainer>
                    </StyledColumnContainer>
                </StyledSidebar>

                {!isSidebarDisplayed && (
                    <StyledShowSidebarButton onClick={handleShowSidebar}>
                        <img src={showSidebarIcon} className="showSidebar-icon" alt="show sidebar icon" />
                    </StyledShowSidebarButton>
                )}
            </StyledMainContainer>

            {isAddBoardModalVisible && (
                <AddOrEditBoardModal
                    open={isAddBoardModalOpen}
                    type="add"
                    onCancel={handleAddBoardModalCancel}
                    onSubmit={handleAddBoardSubmit}
                    afterClose={handleAddBoardModalAfterClose}
                />
            )}
        </>
    );
};

export default Sidebar;
