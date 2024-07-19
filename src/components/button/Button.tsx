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
}

const Button = ({ buttonFunction, category, children }: ButtonProps) => {
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
        <ButtonComponent onClick={buttonFunction}>
            {children}
        </ButtonComponent>
    );
};

export default Button;
