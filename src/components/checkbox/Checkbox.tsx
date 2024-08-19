import { CheckboxChangeEvent } from "antd/es/checkbox";
import { StyledCheckbox, StyledCheckboxDarkMode } from "./checkbox.style";
import { FormikContext } from "formik";
import { useContext, useEffect, useState } from "react";

interface CheckboxProps {
    children?: React.ReactNode;
    name: string;
    value?: boolean;
    onChange?: (e: CheckboxChangeEvent) => void;
    lineThrough?: boolean;
}

const Checkbox = ({ children, name, value, onChange, lineThrough = true }: CheckboxProps) => {
    const formikContext = useContext(FormikContext);
    const values = formikContext && formikContext.values;
    const formikValue = values && values[name];
    const [checkboxValue, setCheckboxValue] = useState(false);

    const handleChange = (e: CheckboxChangeEvent) => {
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
        setCheckboxValue(formikValue || false);
    }, [formikValue]);

    useEffect(() => {
        if (value === undefined) {
            return;
        }
        setCheckboxValue(value || false);
    }, [value]);

    //TODO: handle dark mode
    return (
        <>
            <StyledCheckbox lineThrough={lineThrough} name={name} checked={checkboxValue} onChange={handleChange}>
                {children}
            </StyledCheckbox>
        </>
    );
};

export default Checkbox;
