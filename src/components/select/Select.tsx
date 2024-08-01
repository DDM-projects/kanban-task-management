import { themeColors } from "../../theme";
import { StyledSelect } from "./select.style";
import { FormikContext } from "formik";
import { useContext, useEffect, useState } from "react";

interface SelectProps {
    name?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    options?: { value: string; label: string }[];
    value?: string;
}

const Select = ({ name, defaultValue, onChange, options, value }: SelectProps) => {
    const formikContext = useContext(FormikContext);
    const values = formikContext && formikContext.values;
    const formikValue = values && name && values[name];
    const [selectValue, setSelectValue] = useState(defaultValue || "");

    const optionSelect = options?.map((option) => {
        return {
            value: option.value,
            label: option.label,
            style: {
                fontFamily: "Plus Jakarta Sans, sans-serif",
                color: `${themeColors.grey}`,
                fontSize: "13px",
                lineHeight: "23px",
                fontWeight: "500",
            },
        };
    });

    const handleChange = (value: any) => {
        if (formikContext && name) {
            formikContext.setFieldValue(name, value);
            return;
        }
        onChange && onChange(value);
        setSelectValue(value);
    };

    useEffect(() => {
        if (formikValue === undefined) {
            return;
        }
        setSelectValue(formikValue || "");
    }, [formikValue]);

    useEffect(() => {
        if (value === undefined) {
            return;
        }
        setSelectValue(value || "");
    }, [value]);

    // TODO: handle dark mode

    return (
        <StyledSelect onChange={handleChange} options={optionSelect} value={selectValue} defaultValue={defaultValue} />
    );
};

export default Select;
