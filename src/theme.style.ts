import { css } from "styled-components";
import {
    buttonPrimaryLarge,
    buttonSmall,
    fontBodyLarge,
    fontBodyMedium,
    fontHeadingLarge,
    fontHeadingMedium,
    fontHeadingSmall,
    fontHeadingXl,
    themeColors,
    themeFontMain,
} from "./theme";

export const themeFontMainStyle = css`
    font-family: ${themeFontMain.fontFamily};
    font-weight: ${themeFontMain.fontWeight};
    color: ${themeColors.black};
`;

export const fontHeadingXlStyle = css`
    ${themeFontMainStyle};

    font-size: ${fontHeadingXl.fontSize};
    line-height: ${fontHeadingXl.lineHeight};
`;

export const fontHeadingLargeStyle = css`
    ${themeFontMainStyle};

    font-size: ${fontHeadingLarge.fontSize};
    line-height: ${fontHeadingLarge.lineHeight};
`;

export const fontHeadingMediumStyle = css`
    ${themeFontMainStyle};

    font-size: ${fontHeadingMedium.fontSize};
    line-height: ${fontHeadingMedium.lineHeight};
`;

export const fontHeadingSmallStyle = css`
    ${themeFontMainStyle};

    font-size: ${fontHeadingSmall.fontSize};
    line-height: ${fontHeadingSmall.lineHeight};
    letter-spacing: ${fontHeadingSmall.letterSpacing};
`;

export const fontBodyLargeStyle = css`
    ${themeFontMainStyle};

    font-size: ${fontBodyLarge.fontSize};
    line-height: ${fontBodyLarge.lineHeight};
    color: ${fontBodyLarge.color};
    font-weight: 500;
`;

export const fontBodyMediumStyle = css`
    ${themeFontMainStyle};

    font-size: ${fontBodyMedium.fontSize};
    line-height: ${fontBodyMedium.lineHeight};
    color: ${fontBodyMedium.color};
`;

export const buttonPrimaryLargeStyle = css`
    ${fontHeadingLargeStyle};

    height: ${buttonPrimaryLarge.height};
    border: ${buttonPrimaryLarge.border};
    cursor: ${buttonPrimaryLarge.cursor};
    border-radius: ${buttonPrimaryLarge.borderRadius};
    background-color: ${buttonPrimaryLarge.backgroundColor};
    color: ${buttonPrimaryLarge.color};
    font-weight: ${buttonPrimaryLarge.fontWeight};
`;

export const buttonSmallStyle = css`
    ${fontBodyLargeStyle};

    height: ${buttonSmall.height};
    border-radius: ${buttonSmall.borderRadius};
    border: ${buttonSmall.border};
    cursor: ${buttonSmall.cursor};
    color: ${buttonSmall.color};
    font-weight: ${buttonSmall.fontWeight};
`;

export const buttonPrimarySmallStyle = css`
    ${buttonSmallStyle};

    background-color: ${themeColors.mainPurple};
`;

export const buttonPrimaryHoverStyle = css`
    background-color: ${themeColors.mainPurpleHover};
`;

export const buttonSecondaryStyle = css`
    ${buttonSmallStyle};

    color: ${themeColors.mainPurple};
    background-color: ${themeColors.mainPurpleLightest};
`;

export const buttonSecondaryHoverStyle = css`
    background-color: ${themeColors.mainPurpleLight};
`;

export const buttonDestructiveStyle = css`
    ${buttonSmallStyle};

    background-color: ${themeColors.red};
`;

export const buttonDestructiveHoverStyle = css`
    background-color: ${themeColors.redHover};
`;

export const buttonSecondaryDarkModeStyle = css`
    ${buttonSecondaryStyle};

    background-color: ${themeColors.white};
`;
