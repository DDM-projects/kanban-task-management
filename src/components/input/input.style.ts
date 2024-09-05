import { Input } from "antd";
import styled, { css } from "styled-components";
import { themeColors } from "../../theme";
import { fontBodyLargeStyle } from "../../theme.style";

export const mainInputStyle = css`
    ${fontBodyLargeStyle};

    box-sizing: border-box;
    border: 1px solid ${themeColors.greyInputBorder};
    border-radius: 4px;
    height: 40px;
    box-shadow: none;

    &.ant-input-outlined:hover {
        border-color: ${themeColors.mainPurple};
        cursor: pointer;
    }

    &.ant-input-outlined:focus {
        border-color: ${themeColors.mainPurple};
        box-shadow: none;
    }
`;

export const StyledTextInput = styled(Input)`
    ${mainInputStyle};
`;

export const StyledTextAreaInput = styled(Input.TextArea)`
    ${mainInputStyle};

    &.ant-input {
        height: 112px !important;
        resize: none !important;
    }
`;

export const StyledTextInputDarkMode = styled(StyledTextInput)`
    color: ${themeColors.white};
`;

export const StyledTextInputContainer = styled.div`
    position: relative;
    width: fit-content;
`;

export const StyledTextInputError = styled(StyledTextInput)`
    border-color: ${themeColors.red};
`;

export const StyledTextInputErrorContainer = styled(StyledTextInputContainer)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
`;

export const StyledTextInputErrorMessage = styled.p`
    ${fontBodyLargeStyle};

    color: ${themeColors.red};
`;
