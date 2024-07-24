import { CSSProperties } from "react";

export const themeColors = {
    mainPurple: "#635FC7",
    mainPurpleHover: "#A8A4FF",
    mainPurpleLightest: "rgba(99, 95, 199, 0.1)",
    mainPurpleLight: "rgba(99, 95, 199, 0.25)",
    black: "#000112",
    darkestGrey: "#20212C",
    darkGrey: "#2B2C37",
    mediumGrey: "#3E3F4E",
    grey: "rgb(130, 143, 163)",
    greyInputBorder: "rgba(130, 143, 163, 0.25)",
    lightGrey: "#E4EBFA",
    lightestGrey: "#F4F7FD",
    white: "#FFFFFF",
    red: "#EA5555",
    redHover: "#FF9898",
};

export type ThemeColors = keyof typeof themeColors;

export const themeFontMain: CSSProperties = {
    fontFamily: "Plus Jakarta Sans, sans-serif",
    fontWeight: "bold",
    color: themeColors.black,
};

export const fontHeadingXl: CSSProperties = {
    ...themeFontMain,
    fontSize: "24px",
    lineHeight: "30px",
};

export const fontHeadingLarge: CSSProperties = {
    ...themeFontMain,
    fontSize: "18px",
    lineHeight: "23px",
};

export const fontHeadingMedium: CSSProperties = {
    ...themeFontMain,
    fontSize: "15px",
    lineHeight: "19px",
};

export const fontHeadingSmall: CSSProperties = {
    ...themeFontMain,
    fontSize: "12px",
    lineHeight: "15px",
    letterSpacing: "2.4px",
};

export const fontBodyLarge: CSSProperties = {
    ...themeFontMain,
    color: themeColors.darkGrey,
    fontSize: "13px",
    lineHeight: "23px",
    fontWeight: "500",
};

export const fontBodyMedium: CSSProperties = {
    ...themeFontMain,
    color: themeColors.darkGrey,
    fontSize: "12px",
    lineHeight: "15px",
};

export const buttonPrimaryLarge: CSSProperties = {
    ...fontHeadingLarge,
    height: "48px",
    borderRadius: "24px",
    border: "none",
    cursor: "pointer",
    backgroundColor: themeColors.mainPurple,
    color: themeColors.white,
};

export const buttonPrimaryHover: CSSProperties = {
    backgroundColor: themeColors.mainPurpleHover,
};

export const buttonSmall: CSSProperties = {
    ...fontBodyLarge,
    height: "40px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    color: themeColors.white,
};

export const buttonPrimarySmall: CSSProperties = {
    ...buttonSmall,
    backgroundColor: themeColors.mainPurple,
};

export const buttonSecondary: CSSProperties = {
    ...buttonSmall,
    color: themeColors.mainPurple,
    backgroundColor: themeColors.mainPurpleLightest,
};

export const buttonSecondaryHover: CSSProperties = {
    backgroundColor: themeColors.mainPurpleLight,
};

export const buttonDestructive: CSSProperties = {
    ...buttonSmall,
    backgroundColor: themeColors.red,
};

export const buttonDestructiveHover: CSSProperties = {
    backgroundColor: themeColors.redHover,
};

export const buttonSecondaryDarkMode: CSSProperties = {
    ...buttonSecondary,
    backgroundColor: themeColors.white,
};
