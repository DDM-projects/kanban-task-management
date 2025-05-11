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
import { useDispatch } from "react-redux";
import { deleteTask, updateColumn } from "../../../../state/selectedBoard/selectedBoardSlice";
import { AppDispatch } from "../../../../state/store";
import { deleteTaskById, postNewColumnColor } from "../../../../service/services";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
    column: ColumnType;
}

const Column = ({ column }: ColumnProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<TaskType | null>(null);
    const numberOfTasks = column.tasks?.length;
    const deleteModalText = taskToDelete ? getDeleteModalText(taskToDelete.title) : "";

    const {setNodeRef} = useDroppable({
        id: column.id,
    })

    const handleColumnColorChange = async (color: Color) => {
        const response = await postNewColumnColor({ id: column.id, color: color.toHexString() });

        if (response.status !== "success") {
            console.error("error");
            return;
        }

        dispatch(updateColumn(response.data));
    };

    const handleDeleteModalOpen = (task: TaskType) => {
        setTaskToDelete(task);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteTask = async () => {
        if (!taskToDelete) {
            return;
        }

        const response = await deleteTaskById(taskToDelete.id);

        if (response !== "success") {
            console.error("error");
            return;
        }

        dispatch(deleteTask({ task: taskToDelete, columnId: column.id }));
        setTaskToDelete(null);
        handleDeleteModalCancel();
    };

    //TODO: handle dark mode

    return (
        <>
            <StyledMainContainer>
                <StyledContainer>
                    <ColorPicker onChangeComplete={handleColumnColorChange} value={column.color}>
                        <StyledColumnIcon style={{ backgroundColor: column.color }} />
                    </ColorPicker>
                    <StyledTitle>
                        {column.name} ({numberOfTasks})
                    </StyledTitle>
                </StyledContainer>
                <StyledTasksContainer ref={setNodeRef}>
                    {column.tasks?.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            deleteModalOpen={handleDeleteModalOpen}
                            updatedColumnId={column.id}
                        />
                    ))}
                </StyledTasksContainer>
            </StyledMainContainer>

            <DeleteModal
                open={isDeleteModalOpen}
                onCancel={handleDeleteModalCancel}
                onDelete={handleDeleteTask}
                title={deleteModalTitle}
                text={deleteModalText}
            />
        </>
    );
};

export default Column;
