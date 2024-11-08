import { Column as ColumnType, Task as TaskType } from "../../../../types";
import {
    StyledMainContainer,
    StyledContainer,
    StyledColumnIcon,
    StyledTitle,
    StyledTasksContainer,
} from "./column.style";
import { deleteModalTitle, getDeleteModalText } from "./column.data";
import Task from "../task/Task";
import { ColorPicker } from "antd";
import { Color } from "antd/es/color-picker";
import DeleteModal from "../../../modals/deleteBoardOrTaskModal/DeleteModal";
import { useState } from "react";

interface ColumnProps {
    column: ColumnType;
    statusOptions: string[];
    updateColumn: (column: ColumnType) => void;
    updateColumnsAfterTaskStatusChange: (task: TaskType, columnId: string) => void;
}

const Column = ({ column, statusOptions, updateColumn, updateColumnsAfterTaskStatusChange }: ColumnProps) => {
    const [isDeleteModalopen, setIsDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<TaskType | null>(null);
    const numberOfTasks = column.tasks?.length;
    const deleteModalText = taskToDelete ? getDeleteModalText(taskToDelete.title) : "";

    const handleColumnColorChange = (color: Color) => {
        const updatedColumn = { ...column, color: color.toHexString() };
        updateColumn(updatedColumn);
    };

    const handleDeleteModalOpen = (task: TaskType) => {
        setTaskToDelete(task);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteTask = () => {
        const updatedTasks = column.tasks.filter((task) => task.id !== taskToDelete?.id);
        const updatedColumn = { ...column, tasks: updatedTasks };
        updateColumn(updatedColumn);
        setTaskToDelete(null);
        handleDeleteModalCancel();
    };

    const handleEditTask = (updatedTask: TaskType, previousStatus?: string) => {
        if (previousStatus && previousStatus !== updatedTask.status) {
            updateColumnsAfterTaskStatusChange(updatedTask, column.id);
        } else {
            const updatedTasks = column.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
            const updatedColumn = { ...column, tasks: updatedTasks };
            updateColumn(updatedColumn);
        }
    };

    const handleChangeTaskStatus = (updatedTask: TaskType) => {
        updateColumnsAfterTaskStatusChange(updatedTask, column.id);
    };

    //TODO: handle dark mode

    return (
        <>
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
                        <Task
                            key={task.id}
                            task={task}
                            statusOptions={statusOptions}
                            editTask={handleEditTask}
                            deleteModalOpen={handleDeleteModalOpen}
                            changeTaskStatus={handleChangeTaskStatus}
                        />
                    ))}
                </StyledTasksContainer>
            </StyledMainContainer>

            <DeleteModal
                open={isDeleteModalopen}
                onCancel={handleDeleteModalCancel}
                onDelete={handleDeleteTask}
                title={deleteModalTitle}
                text={deleteModalText}
            />
        </>
    );
};

export default Column;
