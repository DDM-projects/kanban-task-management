import { ReactNode } from "react";
import {
    StyledPrimaryLargeBtn,
    StyledPrimarySmallBtn,
    StyledSecondaryBtn,
    StyledDestructiveBtn,
    StyledSecondaryDarkModeBtn,
} from "./button.style";

interface ButtonProps {
    buttonFunction?: () => void;
    category: "primaryLarge" | "primarySmall" | "secondary" | "destructive" | "secondaryDarkMode";
    children: ReactNode;
    width?: number;
    type?: "button" | "reset" | "submit";
    disabled?: boolean;
}

const Button = ({ buttonFunction, category, children, width = 416, type = "button", disabled }: ButtonProps) => {
    const getButtonComponent = () => {
        switch (category) {
            case "primaryLarge":
                return StyledPrimaryLargeBtn;
            case "primarySmall":
                return StyledPrimarySmallBtn;
            case "secondary":
                return StyledSecondaryBtn;
            case "destructive":
                return StyledDestructiveBtn;
            case "secondaryDarkMode":
                return StyledSecondaryDarkModeBtn;
            default:
                return StyledPrimaryLargeBtn;
        }
    };

    const ButtonComponent = getButtonComponent();

    return (
        <ButtonComponent type={type} onClick={buttonFunction} style={{ width }} disabled={disabled}>
            {children}
        </ButtonComponent>
    );
};

export default Button;
