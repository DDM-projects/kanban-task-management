import { useState } from "react";
import { StyledTask, StyledTitle, StyledSubtaskStatus } from "./task.style";
import { Task as TaskType } from "../../../../types";
import { countCompletedSubtasks } from "../../../utils/viewsUtils";
import ViewTaskModal from "../../../modals/viewTaskModal/ViewTaskModal";
import AddNewOrEditTaskModal from "../../../modals/addNewOrEditTaskModal/AddNewOrEditTaskModal";

interface TaskProps {
    task: TaskType;
    statusOptions: string[];
    deleteModalOpen: (task: TaskType) => void;
    editTask: (updatedTask: TaskType, previousStatus?: string) => void;
    changeTaskStatus: (updatedTask: TaskType) => void;
}

const Task = ({ task, statusOptions, deleteModalOpen, editTask, changeTaskStatus }: TaskProps) => {
    const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [updatedTask, setUpdatedTask] = useState<TaskType | null>(null);
    const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(isEditTaskModalOpen);
    const transformedStatusOptions = statusOptions.map((option) => ({ value: option, label: option }));

    const handleViewTaskModalOpen = () => {
        setIsViewTaskModalOpen(true);
    };

    const handleViewTaskModalCancel = () => {
        if (updatedTask && updatedTask !== null) {
            changeTaskStatus(updatedTask);
        }
        setIsViewTaskModalOpen(false);
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

    const handleEditTakModalAfterClose = () => {
        setIsEditTaskModalVisible(false);
    };

    const handleChangeCheckbox = (id: string, isCompleted: boolean) => {
        const updatedSubtasks = task.subtasks.map((subtask) =>
            subtask.id === id ? { ...subtask, isCompleted: isCompleted } : subtask
        );
        const updatedTask = { ...task, subtasks: updatedSubtasks };
        editTask(updatedTask);
    };

    const handleChangeSelect = (status: string) => {
        const updatedTask = { ...task, status: status };
        setUpdatedTask(updatedTask);
    };

    const handleEditTask = (updatedTask: TaskType, previousStatus?: string) => {
        editTask(updatedTask, previousStatus);
        handleEditTaskModalCancel();
    };

    //TODO: handle dark mode

    return (
        <>
            <StyledTask onClick={handleViewTaskModalOpen}>
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
                statusOptions={transformedStatusOptions}
                task={task}
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
                    statusOptions={transformedStatusOptions}
                    afterClose={handleEditTakModalAfterClose}
                />
            )}
        </>
    );
};

export default Task;
