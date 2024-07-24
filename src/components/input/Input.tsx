import { FormikContext } from "formik";
import {
    StyledTextInput,
    StyledTextInputError,
    StyledTextInputContainer,
    StyledTextInputErrorMessage,
    StyledTextInputErrorContainer,
} from "./input.style";
import { useContext, useEffect, useState } from "react";

interface InputProps {
    type: string;
    id: string;
    name: string;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ type, id, name, placeholder, value, onChange }: InputProps) => {
    const formikContext = useContext(FormikContext);
    const values = formikContext && formikContext.values;
    const formikValue = values && values[name];
    const errors = formikContext && formikContext.errors;
    const inputError = errors && errors[name] ? (errors[name] as string) : "";
    const touchedObject = formikContext && formikContext.touched;
    const touchedInput = touchedObject && touchedObject[name];
    const isError = inputError && touchedInput;
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formikContext) {
            formikContext.handleChange(e);
            return;
        }
        onChange && onChange(e);
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
            {!isError ? (
                <StyledTextInput
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleChange}
                />
            ) : (
                <StyledTextInputContainer>
                    <StyledTextInputError
                        type={type}
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={handleChange}
                    />
                    <StyledTextInputErrorContainer>
                        <StyledTextInputErrorMessage>{inputError}</StyledTextInputErrorMessage>
                    </StyledTextInputErrorContainer>
                </StyledTextInputContainer>
            )}
        </div>
    );
};
