import Select from "./Select";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import { Form, Formik } from "formik";

describe("Select component", () => {
    const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
    ];

    it("renders Select with label, options and default value", () => {
        render(<Select label="Select label" options={options} defaultValue={options[1].label} />);

        expect(screen.getByText("Select label")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("renders Select in Formik after value change", async () => {
        let setFieldValueFn: (field: string, value: any) => void = () => {};

        render(
            <Formik initialValues={{ select: options[0].label }} onSubmit={jest.fn()}>
                {({ setFieldValue }) => {
                    setFieldValueFn = setFieldValue;
                    return (
                        <Form>
                            <Select name="select" options={options} />
                        </Form>
                    );
                }}
            </Formik>
        );

        expect(screen.getByText("Option 1")).toBeInTheDocument();

        await act(() => setFieldValueFn("select", options[1].label));

        expect(screen.getByText("Option 2")).toBeInTheDocument();
    });
});
