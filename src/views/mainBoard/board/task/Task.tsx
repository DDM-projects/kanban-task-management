import { useState } from "react";
import { StyledTask, StyledTitle, StyledSubtaskStatus } from "./task.style";
import { Task as TaskType } from "../../../../types";
import { countCompletedSubtasks } from "../../../utils/viewsUtils";
import ViewTaskModal from "../../../modals/viewTaskModal/ViewTaskModal";
import AddNewOrEditTaskModal from "../../../modals/addNewOrEditTaskModal/AddNewOrEditTaskModal";
import { useDispatch } from "react-redux";
import { updateTask } from "../../../../state/selectedBoard/selectedBoardSlice";
import { AppDispatch } from "../../../../state/store";
import { updateTask as updateTaskService } from "../../../../service/services";

interface TaskProps {
    task: TaskType;
    deleteModalOpen: (task: TaskType) => void;
    updatedColumnId: string;
}

const Task = ({ task, deleteModalOpen, updatedColumnId }: TaskProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [updatedTask, setUpdatedTask] = useState<TaskType>(task);
    const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(isEditTaskModalOpen);

    const handleViewTaskModalOpen = () => {
        setIsViewTaskModalOpen(true);
    };

    const handleDeleteModalOpen = () => {
        setIsViewTaskModalOpen(false);
        deleteModalOpen(task);
    };

    const handleEditTaskModalOpen = () => {
        setIsEditTaskModalOpen(true);
        setIsViewTaskModalOpen(false);
        setIsEditTaskModalVisible(true);
    };

    const handleEditTaskModalCancel = () => {
        setIsEditTaskModalOpen(false);
    };

    const handleEditTaskModalAfterClose = () => {
        setIsEditTaskModalVisible(false);
    };

    const handleChangeCheckbox = (id: string, isCompleted: boolean) => {
        const updatedSubtasks = updatedTask.subtasks.map((subtask) =>
            subtask.id === id ? { ...subtask, completed: isCompleted } : subtask
        );

        const _updatedTask = { ...updatedTask, subtasks: updatedSubtasks };
        setUpdatedTask(_updatedTask);
    };

    const handleChangeSelect = (status: { label: string; value: string }) => {
        const _updatedTask = { ...updatedTask, statusName: status.label, statusId: status.value };
        setUpdatedTask(_updatedTask);
    };

    const handleEditTask = async (updatedTask: TaskType) => {
        const response = await updateTaskService(updatedTask);

        if (response.status !== "success") {
            console.log("error");
            return;
        }

        dispatch(updateTask({ updatedTask: response.data, columnId: updatedColumnId }));
        setUpdatedTask(response.data);
        handleEditTaskModalCancel();
    };

    const handleViewTaskModalCancel = async () => {
        if (!updatedTask || updatedTask === null) {
            return;
        }

        const response = await updateTaskService(updatedTask);

        if (response.status !== "success") {
            console.log("error");
            return;
        }

        dispatch(updateTask({ updatedTask: response.data, columnId: updatedColumnId }));
        setIsViewTaskModalOpen(false);
    };

    //TODO: handle dark mode

    return (
        <>
            <StyledTask data-testid="task" onClick={handleViewTaskModalOpen}>
                <StyledTitle>{task.title}</StyledTitle>
                <StyledSubtaskStatus>{`${countCompletedSubtasks(task.subtasks)} of ${
                    task.subtasks?.length
                } subtasks`}</StyledSubtaskStatus>
            </StyledTask>

            <ViewTaskModal
                open={isViewTaskModalOpen}
                onCancel={handleViewTaskModalCancel}
                onDelete={handleDeleteModalOpen}
                onEdit={handleEditTaskModalOpen}
                task={updatedTask}
                onChangeCheckbox={handleChangeCheckbox}
                onChangeSelect={handleChangeSelect}
            />

            {isEditTaskModalVisible && (
                <AddNewOrEditTaskModal
                    open={isEditTaskModalOpen}
                    onCancel={handleEditTaskModalCancel}
                    type="edit"
                    initialValues={task}
                    onSubmit={handleEditTask}
                    afterClose={handleEditTaskModalAfterClose}
                />
            )}
        </>
    );
};

export default Task;
