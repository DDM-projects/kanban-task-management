import styled from "styled-components";
import {
    buttonDestructiveStyle,
    buttonPrimaryLargeStyle,
    buttonPrimarySmallStyle,
    buttonSecondaryDarkModeStyle,
    buttonSecondaryStyle,
    buttonPrimaryHoverStyle,
    buttonSecondaryHoverStyle,
    buttonDestructiveHoverStyle,
} from "../../theme.style";

export const StyledPrimaryLargeBtn = styled.button`
    ${buttonPrimaryLargeStyle};
    &:hover {
        ${buttonPrimaryHoverStyle};
    }
`;

export const StyledPrimarySmallBtn = styled.button`
    ${buttonPrimarySmallStyle};
    &:hover {
        ${buttonPrimaryHoverStyle};
    }
`;

export const StyledSecondaryBtn = styled.button`
    ${buttonSecondaryStyle};
    &:hover {
        ${buttonSecondaryHoverStyle};
    }
`;

export const StyledSecondaryDarkModeBtn = styled.button`
    ${buttonSecondaryDarkModeStyle};
`;

export const StyledDestructiveBtn = styled.button`
    ${buttonDestructiveStyle};
    &:hover {
        ${buttonDestructiveHoverStyle};
    }
`;
