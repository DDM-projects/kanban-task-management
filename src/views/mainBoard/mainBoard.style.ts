import styled from "styled-components";
import { themeColors } from "../../theme";
import { SIDEBAR_WIDTH, SIDEBAR_ANIMATION_DURATION } from "./sidebar/sidebar.data";

export const StyledMainContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 1440px;
    height: 1024px;
    background-color: ${themeColors.lightestGrey};
`;

export const StyledRowContainer = styled.div`
    display: flex;
    height: 100%;
`;

export const StyledBoardContainer = styled.div<{ $isSidebarVisible: boolean }>`
    position: absolute;
    left: ${({ $isSidebarVisible }) => ($isSidebarVisible ? `${SIDEBAR_WIDTH}px` : 0)};
    right: 0;
    transition: left linear ${SIDEBAR_ANIMATION_DURATION}s;
    height: 860px;
`;
