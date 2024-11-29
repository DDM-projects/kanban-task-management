import styled from "styled-components";
import { Menu, Switch } from "antd";
import { fontHeadingMediumStyle, fontHeadingSmallStyle } from "../../../theme.style";
import { themeColors } from "../../../theme";
import { CSSProperties } from "react";
import {
    SIDEBAR_WIDTH,
    SIDEBAR_ANIMATION_DURATION,
    SIDEBAR_HEIGHT_WITHOUT_LOGO,
    SIDEBAR_TITLE_HEIGHT,
    SIDEBAR_GAP_SIZE,
    CREATE_BOARD_BUTTON_HEIGHT,
    SWITCH_AND_HIDE_SIDEBAR_BUTTON_CONTAINER_HEIGHT,
} from "./sidebar.data";

export const itemStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
    width: "275px",
    minHeight: "48px",
    margin: "0",
    borderRadius: "0px 100px 100px 0px",
};

export const StyledMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
`;

export const StyledSidebar = styled.div<{ $width?: number; $isHidden?: boolean; $isDisplayed?: boolean }>`
    display: ${({ $isDisplayed }) => ($isDisplayed ? "flex" : "none")};
    flex-direction: column;
    justify-content: space-between;
    gap: ${SIDEBAR_GAP_SIZE}px;
    height: ${SIDEBAR_HEIGHT_WITHOUT_LOGO}px;
    width: ${({ $width }) => ($width !== undefined ? `${$width}px` : `${SIDEBAR_WIDTH}px`)};
    box-sizing: border-box;
    background-color: ${themeColors.white};
    border-right: 1px solid ${themeColors.lightGrey};
    transition: transform linear ${SIDEBAR_ANIMATION_DURATION}s;
    transform: ${({ $isHidden }) => ($isHidden ? "translate(-100%, -1px)" : "translate(0, -1px)")};
`;

export const StyledColumnContainer = styled.div<{ $gapSize?: number; $alignItems?: string }>`
    display: flex;
    flex-direction: column;
    gap: ${({ $gapSize }) => ($gapSize !== undefined ? `${$gapSize}px` : "10px")};
    align-items: ${({ $alignItems }) => ($alignItems !== undefined ? $alignItems : "normal")};
    height: fit-content;
`;

export const StyledTitle = styled.p`
    ${fontHeadingSmallStyle};

    margin: 20px 0 25px 25px;
    color: ${themeColors.grey};
    text-transform: uppercase;
`;

export const StyledMenu = styled(Menu)`
    &.ant-menu {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-height: calc(
            ${SIDEBAR_HEIGHT_WITHOUT_LOGO}px - ${SIDEBAR_TITLE_HEIGHT}px - ${SIDEBAR_GAP_SIZE}px -
                ${CREATE_BOARD_BUTTON_HEIGHT}px - ${SWITCH_AND_HIDE_SIDEBAR_BUTTON_CONTAINER_HEIGHT}px
        );
        overflow-y: auto;
    }

    &&.ant-menu-root {
        border: none;
    }

    .ant-menu-item {
        ${fontHeadingMediumStyle};

        display: flex;
        justify-content: flex-start;
        width: 275px;
        padding-left: 25px;
        margin-left: 0;
        color: ${themeColors.grey};
    }

    .ant-menu-item-active {
        background-color: ${themeColors.mainPurpleLightest} !important;
        color: ${themeColors.mainPurple} !important;
    }

    .ant-menu-item-active .board-icon {
        filter: brightness(0) saturate(100%) invert(40%) sepia(10%) saturate(4133%) hue-rotate(205deg) brightness(96%)
            contrast(86%);
    }

    .ant-menu-item-selected {
        background-color: ${themeColors.mainPurple} !important;
        color: ${themeColors.white} !important;
    }

    .ant-menu-item-selected .board-icon,
    .ant-menu-item-selected.ant-menu-item-active .board-icon {
        filter: brightness(0) saturate(100%) invert(100%) sepia(18%) saturate(554%) hue-rotate(290deg) brightness(105%)
            contrast(102%);
    }
`;

export const StyledCreateBoardButton = styled.button`
    all: unset;

    ${fontHeadingMediumStyle};

    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: ${CREATE_BOARD_BUTTON_HEIGHT}px;
    gap: 20px;
    margin-left: 25px;
    cursor: pointer;
    color: ${themeColors.mainPurple};

    .add-board-icon {
        filter: brightness(0) saturate(100%) invert(40%) sepia(10%) saturate(4133%) hue-rotate(205deg) brightness(96%)
            contrast(86%);
    }

    &:hover {
        color: ${themeColors.mainPurpleHover};

        .add-board-icon {
            filter: brightness(0) saturate(100%) invert(80%) sepia(55%) saturate(4234%) hue-rotate(201deg)
                brightness(103%) contrast(101%);
        }
    }
`;

export const StyledRowContainer = styled.div<{ $width?: number }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: ${({ $width }) => ($width !== undefined ? `${$width}px` : "250px")};
    height: 48px;
    background-color: ${themeColors.lightestGrey};
`;

export const StyledSwitch = styled(Switch)`
    background-color: ${themeColors.mainPurple};

    &&:hover {
        background-color: ${themeColors.mainPurpleHover};
    }

    &&.ant-switch-checked {
        background-color: ${themeColors.mainPurple};

        &:hover {
            background-color: ${themeColors.mainPurpleHover};
        }
    }
`;

export const StyledHideSidebarContainer = styled.div`
    width: 100%;
`;

export const StyledHideSidebarButton = styled.button`
    all: unset;

    ${fontHeadingMediumStyle};

    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    width: 275px;
    height: 48px;
    padding-left: 30px;
    border-radius: 0px 100px 100px 0px;
    color: ${themeColors.grey};
    cursor: pointer;

    &:hover {
        background-color: ${themeColors.mainPurpleLightest};
        color: ${themeColors.mainPurple};

        .hideSidebar-icon {
            filter: brightness(0) saturate(100%) invert(40%) sepia(10%) saturate(4133%) hue-rotate(205deg)
                brightness(96%) contrast(86%);
        }
    }
`;

export const StyledShowSidebarButton = styled.button`
    all: unset;
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 32px;
    cursor: pointer;
    background-color: ${themeColors.mainPurple};
    border-radius: 0px 100px 100px 0px;

    img {
        width: 14px;
    }

    &:hover {
        background-color: ${themeColors.mainPurpleHover};
    }
`;
