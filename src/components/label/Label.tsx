import { StyledTextLabel } from "./label.style";

interface LabelProps {
    label: string;
    marginBottom?: number;
}

const Label = ({ label, marginBottom }: LabelProps) => {
    return <StyledTextLabel $marginBottom={marginBottom}>{label}</StyledTextLabel>;
};

export default Label;
