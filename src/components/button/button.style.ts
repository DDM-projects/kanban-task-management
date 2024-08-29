import styled, { css } from "styled-components";
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

export const disabledButtonStyle = css`
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
`;

export const StyledPrimaryLargeBtn = styled.button`
    ${buttonPrimaryLargeStyle};

    &:hover {
        ${buttonPrimaryHoverStyle};
    }

    &:disabled {
        ${disabledButtonStyle};
    }
`;

export const StyledPrimarySmallBtn = styled.button`
    ${buttonPrimarySmallStyle};

    &:hover {
        ${buttonPrimaryHoverStyle};
    }

    &:disabled {
        ${disabledButtonStyle};
    }
`;

export const StyledSecondaryBtn = styled.button`
    ${buttonSecondaryStyle};

    &:hover {
        ${buttonSecondaryHoverStyle};
    }

    &:disabled {
        ${disabledButtonStyle};
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

    &:disabled {
        ${disabledButtonStyle};
    }
`;
