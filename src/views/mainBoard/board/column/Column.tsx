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
    updateColumn: (column: ColumnType) => void;
}

const Column = ({ column, statusOptions, updateColumn }: ColumnProps) => {
    const numberOfTasks = column.tasks?.length;

    const handleColumnColorChange = (color: Color) => {
        const updatedColumn = { ...column, color: color.toHexString() };
        updateColumn(updatedColumn);
    };

    //TODO: handle dark mode

    return (
        <StyledMainContainer>
            <StyledContainer>
                <ColorPicker onChangeComplete={handleColumnColorChange} defaultValue={column.color}>
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
