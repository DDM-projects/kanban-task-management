import styled, { css } from "styled-components";
import { themeColors } from "../../../../theme";
import { fontHeadingMediumStyle, fontHeadingXlStyle } from "../../../../theme.style";
import Button from "../../../../components/button/Button";

export const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 96px;
    width: 1140px;
    padding: 10px 20px;
    background-color: ${themeColors.white};
    border-bottom: 1px solid ${themeColors.lightGrey};
`;

export const StyledHeaderTitle = styled.h1`
    ${fontHeadingXlStyle};
`;

export const StyledContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    width: 20%;
`;

export const StyledAddTaskButton = styled(Button)`
    ${fontHeadingMediumStyle};

    color: white;

    &:disabled {
        background-color: ${themeColors.mainPurpleLight};
        color: white;
    }
`;

export const StyledMenuButton = styled.button<{ $isDisabled?: boolean }>`
    all: unset;
    width: 5px;
    height: 20px;
    cursor: pointer;

    ${({ $isDisabled }) =>
        $isDisabled &&
        css`
            cursor: default;
        `}
`;
