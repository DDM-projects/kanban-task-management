import { FormikContext } from "formik";
import {
    StyledTextInput,
    StyledTextInputContainer,
    StyledTextInputErrorMessage,
    StyledTextInputErrorContainer,
    StyledTextAreaInput,
} from "./input.style";
import { useContext, useEffect, useState } from "react";
import Label from "../label/Label";
import { getValueFromPath } from "../../utils/utils";

interface InputProps {
    type: "text" | "password" | "textarea";
    id?: string;
    name: string;
    placeholder: string;
    value?: string;
    label?: string;
    width?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Input = ({ type, id, name, placeholder, value, label, width = 416, onChange }: InputProps) => {
    const formikContext = useContext(FormikContext);
    const values = formikContext && formikContext.values;
    const formikValue = values && getValueFromPath(values, name);
    const errors = formikContext && formikContext.errors;
    const inputError = errors && getValueFromPath(errors, name) ? (getValueFromPath(errors, name) as string) : "";
    const touchedObject = formikContext && formikContext.touched;
    const touchedInput = touchedObject && getValueFromPath(touchedObject, name);
    const isError = inputError && touchedInput;
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (formikContext) {
            formikContext.setFieldValue(name, e.target.value);
            return;
        }

        onChange?.(e);
    };

    const chooseInputComponent = () => {
        switch (type) {
            case "textarea":
                return (
                    <StyledTextAreaInput
                        style={{ width }}
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={handleChange}
                    />
                );
            case "text":
                return (
                    <StyledTextInputContainer>
                        <StyledTextInput
                            $isError={isError}
                            style={{ width }}
                            type={type}
                            id={id}
                            name={name}
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={handleChange}
                        />
                        {isError && (
                            <StyledTextInputErrorContainer>
                                <StyledTextInputErrorMessage>{inputError}</StyledTextInputErrorMessage>
                            </StyledTextInputErrorContainer>
                        )}
                    </StyledTextInputContainer>
                );
            default:
                return StyledTextInput;
        }
    };

    useEffect(() => {
        if (formikValue === undefined) {
            return;
        }

        setInputValue(formikValue || "");
    }, [formikValue]);

    useEffect(() => {
        if (value === undefined) {
            return;
        }

        setInputValue(value || "");
    }, [value]);

    return (
        <div>
            {label && <Label label={label} />}
            {chooseInputComponent()}
        </div>
    );
};

export default Input;
