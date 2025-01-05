import Input from "./Input";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

describe("Input component", () => {
    const getInputComponent = () => {
        return <Input name="input" placeholder="Input placeholder" type="text" />;
    };

    const getInput = () => {
        const input = screen.getByDisplayValue("test value");
        return input;
    };

    const getNewInput = () => {
        const newInput = screen.getByDisplayValue("new test value");
        return newInput;
    };

    it("renders Input with label, name, type, id and placeholder", () => {
        render(<Input label="Input label" name="input" id="1" placeholder="Input placeholder" type="password" />);

        const input = screen.getByPlaceholderText("Input placeholder");

        expect(input).toHaveAttribute("type", "password");
        expect(input).toHaveAttribute("name", "input");
        expect(input).toHaveAttribute("id", "1");
    });

    it("renders Input with type textarea and custom styles", () => {
        render(<Input name="texarea" type="textarea" width={200} placeholder="Textarea placeholder" />);

        const textarea = screen.getByPlaceholderText("Textarea placeholder");

        expect(window.getComputedStyle(textarea).height).toBe("112px");
        expect(textarea).toHaveStyle("width: 200px");
    });

    it("renders Input in Formik after value change", async () => {
        let setFieldValueFn: (field: string, value: any) => void = () => {};

        render(
            <Formik initialValues={{ input: "test value" }} onSubmit={jest.fn()}>
                {({ setFieldValue }) => {
                    setFieldValueFn = setFieldValue;
                    return <Form>{getInputComponent()}</Form>;
                }}
            </Formik>
        );

        expect(getInput()).toBeInTheDocument();

        await act(() => setFieldValueFn("input", "new test value"));

        expect(getNewInput()).toBeInTheDocument();
    });

    it("calls onChange function when Inputs value change", () => {
        const TestInput = () => {
            const [value, setValue] = useState("test value");

            const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setValue(e.target.value);
            };

            return (
                <Input name="input" placeholder="Input placeholder" type="text" onChange={handleChange} value={value} />
            );
        };

        render(<TestInput />);

        fireEvent.change(getInput(), { target: { value: "new test value" } });

        expect(getNewInput()).toBeInTheDocument();
    });

    it("render Input with proper styles when error occurs", async () => {
        const validationSchema = Yup.object().shape({
            input: Yup.string().required("Input is required"),
        });

        render(
            <Formik initialValues={{ input: "" }} validationSchema={validationSchema} onSubmit={jest.fn()}>
                <Form>
                    {getInputComponent()}
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        );

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(() => fireEvent.click(screen.getByText("Submit")));

        expect(screen.getByText("Input is required")).toBeInTheDocument();
    });
});
