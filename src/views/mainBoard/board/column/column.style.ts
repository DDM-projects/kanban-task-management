import styled from "styled-components";
import { fontHeadingSmallStyle } from "../../../../theme.style";
import { themeColors } from "../../../../theme";
import { COLUMN_MAIN_CONTAINER_GAP } from "./column.data";

export const StyledMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 260px;
    max-width: 260px;
    height: 100%;
    gap: ${COLUMN_MAIN_CONTAINER_GAP}px;
`;

export const StyledContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 15px;
    max-height: 54px;
    margin-top: 10px;
`;

export const StyledColumnIcon = styled.div`
    min-width: 15px;
    min-height: 15px;
    border-radius: 50%;
    cursor: pointer;
`;

export const StyledTitle = styled.p`
    ${fontHeadingSmallStyle};

    max-width: 100%;
    color: ${themeColors.grey};
    text-transform: uppercase;
    overflow-wrap: anywhere;
    margin-top: 0;
`;

export const StyledTasksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
