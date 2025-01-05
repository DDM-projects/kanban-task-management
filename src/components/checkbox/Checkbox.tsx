import { CheckboxChangeEvent } from "antd/es/checkbox";
import { StyledCheckbox } from "./checkbox.style";
import { FormikContext } from "formik";
import { useContext, useEffect, useState } from "react";
import Label from "../label/Label";

interface CheckboxProps {
    children?: React.ReactNode;
    name: string;
    value?: boolean;
    onChange?: (e: CheckboxChangeEvent) => void;
    lineThrough?: boolean;
    width?: number;
    label?: string;
}

const Checkbox = ({ children, name, value, onChange, lineThrough = true, width = 416, label }: CheckboxProps) => {
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
        setCheckboxValue(e.target.checked);
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
        <div>
            {label && <Label label={label} />}
            <StyledCheckbox
                style={{ width }}
                $lineThrough={lineThrough}
                name={name}
                checked={checkboxValue}
                onChange={handleChange}
            >
                {children}
            </StyledCheckbox>
        </div>
    );
};

export default Checkbox;
