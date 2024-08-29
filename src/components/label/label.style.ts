import styled from "styled-components";
import { fontBodyMediumStyle } from "../../theme.style";
import { themeColors } from "../../theme";

export const StyledTextLabel = styled.div<{ $marginBottom?: number }>`
    ${fontBodyMediumStyle};

    color: ${themeColors.grey};
    margin-bottom: ${({ $marginBottom }) => ($marginBottom !== undefined ? `${$marginBottom}px` : "10px")};
`;
