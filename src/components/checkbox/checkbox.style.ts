import styled, { css } from "styled-components";
import { Checkbox } from "antd";
import { themeColors } from "../../theme";
import { fontBodyMediumStyle } from "../../theme.style";

export const StyledCheckbox = styled(Checkbox)<{ lineThrough?: boolean }>`
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    background-color: ${themeColors.lightestGrey};
    color: ${themeColors.black};

    ${fontBodyMediumStyle};

    .ant-checkbox + span {
        display: flex;
        align-items: center;
        height: 40px;
    }

    .ant-checkbox {
        border-radius: 2px;
    }

    &:hover {
        background-color: ${themeColors.mainPurpleLight};
        mix-blend-mode: normal;
    }

    &.ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox-inner {
        border: 1px solid ${themeColors.greyInputBorder} !important;
    }

    .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${themeColors.mainPurple};
        border-color: ${themeColors.mainPurple};
    }

    .ant-checkbox-checked .ant-checkbox-inner:hover {
        background-color: ${themeColors.mainPurple};
    }

    &.ant-checkbox-wrapper:hover .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${themeColors.mainPurple} !important;
    }

    ${({ lineThrough }) =>
        lineThrough &&
        css`
            .ant-checkbox-checked + span {
                color: rgba(0, 1, 18, 0.5);
                text-decoration: line-through;
            }
        `}
`;

export const StyledCheckboxDarkMode = styled(StyledCheckbox)`
    background-color: ${themeColors.darkestGrey};
    color: ${themeColors.white};

    .ant-checkbox-inner {
        background-color: ${themeColors.darkGrey};
    }

    ${({ lineThrough }) =>
        lineThrough &&
        css`
            .ant-checkbox-checked + span {
                color: rgba(255, 255, 255, 0.5);
                text-decoration: line-through;
            }
        `}
`;
