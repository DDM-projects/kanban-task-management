import styled from "styled-components";
import { fontHeadingSmallStyle } from "../../../../theme.style";
import { themeColors } from "../../../../theme";

export const StyledMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 280px;
    max-height: 800px;
    overflow: auto;
    gap: 10px;
`;

export const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
`;

export const StyledColumnIcon = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    cursor: pointer;
`;

export const StyledTitle = styled.p`
    ${fontHeadingSmallStyle};

    color: ${themeColors.grey};
    text-transform: uppercase;
`;

export const StyledTasksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
