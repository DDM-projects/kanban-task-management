import styled, { css } from "styled-components";
import { themeColors } from "../../../theme";
import Button from "../../../components/button/Button";
import { fontHeadingLargeStyle, fontHeadingMediumStyle, fontHeadingXlStyle } from "../../../theme.style";
import { COLUMN_MAIN_CONTAINER_GAP } from "./column/column.data";

export const COLUMN_TITLE_HEIGHT = 39;

export const StyledMainContainer = styled.div<{ $isAddColumnButtonVisible: boolean }>`
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    gap: 20px;
    padding: 20px;
    overflow: auto;

    ${({ $isAddColumnButtonVisible }) =>
        $isAddColumnButtonVisible &&
        css`
            justify-content: center;
            align-items: center;
        `}
`;

export const StyledNewColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 280px;
    height: 714px;
    margin-top: calc(${COLUMN_TITLE_HEIGHT}px + ${COLUMN_MAIN_CONTAINER_GAP}px);
    //copied from Figma
    background: linear-gradient(180deg, #e9effa 0%, rgba(233, 239, 250, 0.5) 100%);
`;

export const StyledNewColumnButton = styled.button`
    all: unset;
    cursor: pointer;

    ${fontHeadingXlStyle};

    color: ${themeColors.grey};

    &:hover {
        color: ${themeColors.mainPurple};
    }
`;

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 500px;
`;

export const StyledText = styled.p`
    ${fontHeadingLargeStyle};

    color: ${themeColors.grey};
`;

export const StyledAddColummnButton = styled(Button)`
    ${fontHeadingMediumStyle};

    color: ${themeColors.white};
`;
