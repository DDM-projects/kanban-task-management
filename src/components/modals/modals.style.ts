import styled from "styled-components";
import { Dropdown, Modal } from "antd";
import { themeColors } from "../../theme";
import { fontBodyLargeStyle, fontHeadingLargeStyle } from "../../theme.style";

export const StyledModal = styled(Modal)`
    &.ant-modal .ant-modal-content {
        max-height: 675px;
        border-radius: 6px;
        background-color: ${themeColors.white};
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .ant-modal-body {
        overflow-y: auto;
        overflow-x: hidden;
    }

    &.ant-modal .ant-modal-title {
        ${fontHeadingLargeStyle};

        margin-bottom: 20px;
    }

    .formik-error {
        color: red;
    }
`;

export const StyledContainerColumn = styled.div<{ $gapSize?: number }>`
    display: flex;
    flex-direction: column;
    gap: ${({ $gapSize }) => ($gapSize !== undefined ? `${$gapSize}px` : "20px")};
`;

export const StyledContainerRow = styled.div`
    display: flex;
    width: 416px;
    justify-content: space-between;
    align-items: center;
`;

export const StyledButtonForImg = styled.button<{ $width?: number; $height?: number }>`
    all: unset;
    width: ${({ $width }) => ($width !== undefined ? `${$width}px` : "15px")};
    height: ${({ $height }) => ($height !== undefined ? `${$height}px` : "15px")};

    &:hover .modal-img {
        filter: brightness(0) saturate(100%);
        filter: brightness(0) saturate(100%) invert(48%) sepia(67%) saturate(1412%) hue-rotate(326deg) brightness(96%)
            contrast(91%);
    }

    &:hover {
        cursor: pointer;
    }
`;

export const StyledTextContainer = styled.div`
    ${fontBodyLargeStyle};

    color: ${themeColors.grey};
    width: 416px;
`;
