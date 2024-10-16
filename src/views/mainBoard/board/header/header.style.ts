import styled, { css } from "styled-components";
import { themeColors } from "../../../../theme";
import { fontHeadingMediumStyle, fontHeadingXlStyle } from "../../../../theme.style";
import Button from "../../../../components/button/Button";
import { SIDEBAR_WIDTH } from "../../sidebar/sidebar.data";

export const StyledLogoContainer = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: ${SIDEBAR_WIDTH}px;
    height: 97px;
    padding-left: 25px;
    border-right: 1px solid ${themeColors.lightGrey};
    border-bottom: 1px solid ${themeColors.lightGrey};
    background-color: ${themeColors.white};
`;

export const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    height: 97px;
    width: 1140px;
    padding: 10px 20px;
    background-color: ${themeColors.white};
    border-bottom: 1px solid ${themeColors.lightGrey};
`;

export const StyledHeaderTitle = styled.h1`
    ${fontHeadingXlStyle};
`;

export const StyledContainer = styled.div<{ $width?: number }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
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
