import styled, { css } from "styled-components";
import { themeColors } from "../../theme";
import { SIDEBAR_WIDTH, SIDEBAR_ANIMATION_DURATION } from "./sidebar/sidebar.data";
import { HEADER_HEIGHT, MAX_VIEW_HEIGHT, MAX_VIEW_WIDTH } from "./mainBoard.data";

export const scrollbarsStyle = css`
    ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${themeColors.lightGrey};
        border-radius: 20px;
    }

    ::-webkit-scrollbar-thumb {
        background: ${themeColors.mainPurpleLightest};
        border-radius: 20px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: ${themeColors.mainPurpleLight};
    }

    ::-webkit-scrollbar-corner {
        background-color: ${themeColors.lightestGrey};
    }
`;

export const StyledMainContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: ${MAX_VIEW_WIDTH}px;
    height: ${MAX_VIEW_HEIGHT}px;
    background-color: ${themeColors.lightestGrey};

    ${scrollbarsStyle};
`;

export const StyledRowContainer = styled.div`
    display: flex;
    height: 100%;
`;

export const StyledBoardContainer = styled.div<{ $isSidebarVisible: boolean }>`
    position: absolute;
    left: ${({ $isSidebarVisible }) => ($isSidebarVisible ? `${SIDEBAR_WIDTH}px` : 0)};
    right: 0;
    margin-left: ${({ $isSidebarVisible }) => ($isSidebarVisible ? 0 : "40px")};
    transition: margin-left linear ${SIDEBAR_ANIMATION_DURATION}s, left linear ${SIDEBAR_ANIMATION_DURATION}s;
    height: calc(${MAX_VIEW_HEIGHT}px - ${HEADER_HEIGHT}px);
`;
