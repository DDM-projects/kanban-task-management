import {
    itemStyle,
    StyledLogoContainer,
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
import { useState } from "react";
import { Board } from "../../../types";
import type { MenuProps } from "antd";
import logoDark from "../../../assets/logo-dark.svg";
import boardIcon from "../../../assets/icon-board.svg";
import lightThemeIcon from "../../../assets/icon-light-theme.svg";
import darkThemeIcon from "../../../assets/icon-dark-theme.svg";
import showSidebarIcon from "../../../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../../../assets/icon-hide-sidebar.svg";
interface SidebarProps {
    boards: Board[];
}

const Sidebar = ({ boards }: SidebarProps) => {
    const [isSidebarDisplayed, setIsSidebarDisplayed] = useState(true);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);

    const items: MenuProps["items"] = boards.map((board) => ({
        key: board.id,
        label: board.name,
        icon: <img src={boardIcon} className="board-icon" />,
        style: itemStyle,
    }));

    const handleHideSidebar = () => {
        setIsSidebarHidden(true);
        setTimeout(() => {
            setIsSidebarDisplayed(false);
        }, 1000);
    };

    const handleShowSidebar = () => {
        setIsSidebarDisplayed(true);
        setTimeout(() => {
            setIsSidebarHidden(false);
        }, 0);
    };

    //TODO: handle dark mode

    return (
        <>
            <StyledLogoContainer>
                <img src={logoDark} />
            </StyledLogoContainer>
            <StyledMainContainer>
                <StyledSidebar $isHidden={isSidebarHidden} $isDisplayed={isSidebarDisplayed}>
                    <StyledColumnContainer $gapSize={0}>
                        <StyledTitle>All boards ({boards.length})</StyledTitle>
                        <StyledMenu items={items} />
                        <StyledCreateBoardButton>
                            <img src={boardIcon} className="add-board-icon" /> + Create New Board
                        </StyledCreateBoardButton>
                    </StyledColumnContainer>
                    <StyledColumnContainer $alignItems="center" $gapSize={20}>
                        <StyledRowContainer>
                            <img src={lightThemeIcon} />
                            <StyledSwitch />
                            <img src={darkThemeIcon} />
                        </StyledRowContainer>
                        <StyledHideSidebarContainer>
                            <StyledHideSidebarButton onClick={handleHideSidebar}>
                                <img src={hideSidebarIcon} className="hideSidebar-icon" />
                                Hide Sidebar
                            </StyledHideSidebarButton>
                        </StyledHideSidebarContainer>
                    </StyledColumnContainer>
                </StyledSidebar>
                {!isSidebarDisplayed && (
                    <StyledShowSidebarButton onClick={handleShowSidebar}>
                        <img src={showSidebarIcon} className="showSidebar-icon" />
                    </StyledShowSidebarButton>
                )}
            </StyledMainContainer>
        </>
    );
};

export default Sidebar;
