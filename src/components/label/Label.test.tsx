import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Label from "./Label";

describe("Label component", () => {
    it("renders label with text and margin bottom", () => {
        render(<Label label="Test label" marginBottom={30} />);

        const label = screen.getByText("Test label");

        expect(label).toBeInTheDocument();
        expect(label).toHaveStyle("margin-bottom: 30px");
    });
});
