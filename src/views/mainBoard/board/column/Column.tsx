import { Column as ColumnType } from "../../../../types";
import {
    StyledMainContainer,
    StyledContainer,
    StyledColumnIcon,
    StyledTitle,
    StyledTasksContainer,
} from "./column.style";
import Task from "../task/Task";
import { ColorPicker } from "antd";
import { Color } from "antd/es/color-picker";

interface ColumnProps {
    column: ColumnType;
    statusOptions: string[];
    changeColumnColor: (color: string) => void;
}

const Column = ({ column, statusOptions, changeColumnColor }: ColumnProps) => {
    const numberOfTasks = column.tasks?.length;

    const handleColumnColorChange = (color: Color) => {
        changeColumnColor(color.toHexString());
    };

    //TODO: handle dark mode

    return (
        <StyledMainContainer>
            <StyledContainer>
                <ColorPicker onChangeComplete={handleColumnColorChange}>
                    <StyledColumnIcon style={{ backgroundColor: column.color }} />
                </ColorPicker>
                <StyledTitle>
                    {column.name} ({numberOfTasks})
                </StyledTitle>
            </StyledContainer>
            <StyledTasksContainer>
                {column.tasks?.map((task) => (
                    <Task key={task.id} task={task} statusOptions={statusOptions} />
                ))}
            </StyledTasksContainer>
        </StyledMainContainer>
    );
};

export default Column;
