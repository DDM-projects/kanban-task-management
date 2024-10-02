import styled from "styled-components";
import { themeColors } from "../../../../theme";
import { fontBodyMediumStyle, fontHeadingMediumStyle } from "../../../../theme.style";

export const StyledTitle = styled.p`
    ${fontHeadingMediumStyle};

    margin: 0;
`;

export const StyledTask = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 280px;
    min-height: 88px;
    padding: 23px 16px;
    border-radius: 8px;
    background-color: ${themeColors.white};
    box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545); //copied from figma
    cursor: pointer;

    &:hover {
        ${StyledTitle} {
            color: ${themeColors.mainPurple};
        }
    }
`;

export const StyledSubtaskStatus = styled.p`
    ${fontBodyMediumStyle};

    margin: 0;
    color: ${themeColors.grey};
`;
