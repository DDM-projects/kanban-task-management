import styled from "styled-components";
import { StyledModal, StyledContainerRow as StyledMainContainerRow } from "../modals.style";
import { themeColors } from "../../../theme";
import { fontBodyLargeStyle } from "../../../theme.style";

export const StyledDeleteModal = styled(StyledModal)`
    &.ant-modal .ant-modal-content {
        min-height: 230px;
    }

    &.ant-modal .ant-modal-title {
        color: ${themeColors.red};
    }
`;

export const StyledText = styled.p`
    ${fontBodyLargeStyle};

    color: ${themeColors.grey};
    margin: 0;
`;

export const StyledContainerRow = styled(StyledMainContainerRow)`
    width: 100%;
`;
