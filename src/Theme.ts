import { CSSProperties } from "react";

export const ThemeColors = {
    mainPurple: "#635F7C",
    mainPurpleHover: "#A8A4FF",
    mainPurpleLightest: "rgba(99, 95, 199, 0.1)",
    mainPurpleLight: "rgba(99, 95, 199, 0.25)",
    black: "#000112",
    darkestGrey: "#20212C",
    darkGrey: "#2B2C37",
    mediumGrey: "#3E3F4E",
    grey: "#828FA3",
    lightGrey: "#E4EBFA",
    lightestGrey: "#F4F7FD",
    white: "#FFFFFF",
    red: "#EA5555",
    redHover: "#FF9898",
};

export type ThemeColors = keyof typeof ThemeColors;

export const ThemeFontMain: CSSProperties = {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "bold",
    color: ThemeColors.black,
};

export const FontHeadingXl: CSSProperties = {
    ...ThemeFontMain,
    fontSize: "24px",
    lineHeight: "30px",
};

export const FontHeadingLarge: CSSProperties = {
    ...ThemeFontMain,
    fontSize: "18px",
    lineHeight: "23px",
};

export const FontHeadingMedium: CSSProperties = {
    ...ThemeFontMain,
    fontSize: "15px",
    lineHeight: "19px",
};

export const FontHeadingSmall: CSSProperties = {
    ...ThemeFontMain,
    fontSize: "12px",
    lineHeight: "15px",
    letterSpacing: "2.4px",
};

export const FontBodyLarge: CSSProperties = {
    ...ThemeFontMain,
    fontSize: "13px",
    lineHeight: "23px",
};

export const FontBodyMedium: CSSProperties = {
    ...ThemeFontMain,
    fontSize: "12px",
    lineHeight: "15px",
};

export const ButtonPrimaryLarge: CSSProperties = {
    ...FontHeadingLarge,
    height: "48px",
    borderRadius: "24px",
    backgroundColor: ThemeColors.mainPurple,
    color: ThemeColors.white,
};

export const ButtonSmall: CSSProperties = {
    ...FontBodyLarge,
    height: "40px",
    borderRadius: "20px",
    color: ThemeColors.white,
};

export const ButtonPrimarySmall: CSSProperties = {
    ...ButtonSmall,
    backgroundColor: ThemeColors.mainPurple,
};

export const ButtonSecondary: CSSProperties = {
    ...ButtonSmall,
    color: ThemeColors.mainPurple,
    backgroundColor: ThemeColors.mainPurpleLight,
};

export const ButtonDesctructive: CSSProperties = {
    ...ButtonSmall,
    backgroundColor: ThemeColors.red,
};

export const ButtonSecondaryDarkMode: CSSProperties = {
    ...ButtonSecondary,
    backgroundColor: ThemeColors.white,
};
