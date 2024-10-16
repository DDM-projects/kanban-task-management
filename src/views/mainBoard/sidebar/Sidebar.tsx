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
import { useState } from "react";
import { Board } from "../../../types";
import type { MenuProps } from "antd";
import boardIcon from "../../../assets/icon-board.svg";
import lightThemeIcon from "../../../assets/icon-light-theme.svg";
import darkThemeIcon from "../../../assets/icon-dark-theme.svg";
import showSidebarIcon from "../../../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../../../assets/icon-hide-sidebar.svg";

interface SidebarProps {
    boards: Board[];
    onAddBoardSubmit: (board: Board) => void;
    selectedKeys?: string[];
    onMenuItemSelect: (id: string) => void;
    setSidebarVisibility: (isVisible: boolean) => void;
}

const Sidebar = ({ boards, onAddBoardSubmit, selectedKeys, onMenuItemSelect, setSidebarVisibility }: SidebarProps) => {
    const [isSidebarDisplayed, setIsSidebarDisplayed] = useState(true);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false);
    const [isAddBoardModalVisible, setIsAddBoardModalVisible] = useState(isAddBoardModalOpen);

    const items: MenuProps["items"] = boards.map((board) => ({
        key: board.id,
        label: board.name,
        icon: <img src={boardIcon} className="board-icon" alt="board icon" />,
        style: itemStyle,
    }));

    const handleMenuItemSelect = (info: any) => {
        onMenuItemSelect(info.key);
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

    const handleAddBoardSubmit = (board: Board) => {
        onAddBoardSubmit?.(board);
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
                            selectedKeys={selectedKeys}
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
