import styled from "styled-components";
import { Select } from "antd";
import { fontBodyLargeStyle } from "../../theme.style";
import { themeColors } from "../../theme";

export const StyledSelect = styled(Select)`
    ${fontBodyLargeStyle};

    box-sizing: border-box;
    border: 1px solid ${themeColors.greyInputBorder};
    border-radius: 4px;
    height: 40px;

    &.ant-select-focused .ant-select-selector {
        border: 1px solid ${themeColors.mainPurple} !important;
        box-shadow: none !important;
    }

    &.ant-select:hover .ant-select-selector {
        border: 1px solid ${themeColors.mainPurple} !important;
        box-shadow: none !important;
    }

    &&&.ant-select-single .ant-select-selector .ant-select-selection-item {
        ${fontBodyLargeStyle};
    }
`;

export const StyledSelectDarkMode = styled(StyledSelect)`
    color: ${themeColors.white};
`;
