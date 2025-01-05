import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";

describe("Button component", () => {
    it("renders button with primaryLarge category", () => {
        render(<Button category="primaryLarge">Primary large button</Button>);

        const button = screen.getByText("Primary large button");

        expect(button).toHaveStyle("height: 48px");
    });

    it("renders button with primarySmall category", () => {
        render(<Button category="primarySmall">Primary small button</Button>);

        const button = screen.getByText("Primary small button");

        expect(button).toHaveStyle({ height: "40px", backgroundColor: "themeColors.mainPurple" });
    });

    it("renders button with secondary category", () => {
        render(<Button category="secondary">Secondary button</Button>);

        const button = screen.getByText("Secondary button");

        expect(button).toHaveStyle("backgroundColor: themeColors.mainPurpleLightest");
    });

    it("renders button with destructive category", () => {
        render(<Button category="destructive">Destructive button</Button>);

        const button = screen.getByText("Destructive button");

        expect(button).toHaveStyle("backgroundColor: themeColors.red");
    });

    it("renders button with secondaryDarkMode category", () => {
        render(<Button category="secondaryDarkMode">Secondary dark mode button</Button>);

        const button = screen.getByText("Secondary dark mode button");

        expect(button).toHaveStyle("backgroundColor: themeColors.white");
    });

    it("renders button as disabled with custom width", () => {
        render(
            <Button category="secondary" disabled width={200}>
                Secondary button
            </Button>
        );
        const button = screen.getByText("Secondary button");

        expect(button).toBeDisabled();
        expect(button).toHaveStyle("width: 200px");
    });

    it("handles button click", () => {
        const handleClick = jest.fn();

        render(
            <Button category="secondary" buttonFunction={handleClick}>
                Secondary button
            </Button>
        );

        const button = screen.getByText("Secondary button");

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders button with custom className", () => {
        render(
            <Button category="secondary" className="custom-class">
                Secondary button
            </Button>
        );

        const button = screen.getByText("Secondary button");

        expect(button).toHaveClass("custom-class");
    });

    it("renders button with submit type", () => {
        const handleSubmit = jest.fn((e) => e.preventDefault());

        render(
            <form onSubmit={handleSubmit}>
                <Button category="secondary" type="submit">
                    Secondary button
                </Button>
            </form>
        );

        const button = screen.getByText("Secondary button");

        fireEvent.click(button);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it("should not submit form when button has type button", () => {
        const handleSubmit = jest.fn();

        render(
            <form onSubmit={handleSubmit}>
                <Button category="secondary" type="button">
                    Secondary button
                </Button>
            </form>
        );

        const button = screen.getByText("Secondary button");

        fireEvent.click(button);

        expect(handleSubmit).not.toHaveBeenCalled();
    });
});
