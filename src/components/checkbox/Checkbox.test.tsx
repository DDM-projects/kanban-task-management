import Checkbox from "./Checkbox";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Checkbox component", () => {
    it("renders Checbox with label and name", () => {
        render(
            <Checkbox label="Checkbox label" name="checkbox">
                Test Checkbox
            </Checkbox>
        );

        expect(screen.getByText("Checkbox label")).toBeInTheDocument();
        expect(screen.getByText("Test Checkbox")).toBeInTheDocument();
    });

    it("renders Checbox with custom styles", () => {
        render(
            <Checkbox name="checkbox" width={200} lineThrough={true} value={true}>
                Test Checkbox
            </Checkbox>
        );

        const checkbox = screen.getByText("Test Checkbox");

        expect(checkbox).toHaveStyle({ width: "200", textDecoration: "line-through" });
    });

    it("calls onChange function when checkbox is clicked", () => {
        const handleChange = jest.fn();

        render(
            <Checkbox name="checkbox" onChange={handleChange}>
                Test Checkbox
            </Checkbox>
        );

        const checkbox = screen.getByText("Test Checkbox");
        fireEvent.click(checkbox);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    checked: true,
                }),
            })
        );
    });
});