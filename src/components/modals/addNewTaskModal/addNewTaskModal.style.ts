import styled from "styled-components";
import { Modal } from "antd";
import { themeColors } from "../../../theme";
import { fontHeadingLargeStyle } from "../../../theme.style";

export const StyledAddNewTaskModal = styled(Modal)`
    &.ant-modal .ant-modal-content {
        height: 675px;
        width: 480px;
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

    .modal-img {
        cursor: pointer;
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

export const StyledButtonForImg = styled.button`
    all: unset;
    width: 15px;
    height: 15px;
`;
