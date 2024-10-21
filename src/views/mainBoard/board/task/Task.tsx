import { useState } from "react";
import { StyledTask, StyledTitle, StyledSubtaskStatus } from "./task.style";
import { deleteModalTitle, getDeleteModalText } from "./task.data";
import { Task as TaskType } from "../../../../types";
import { countCompletedSubtasks } from "../../../utils/viewsUtils";
import ViewTaskModal from "../../../modals/viewTaskModal/ViewTaskModal";
import DeleteModal from "../../../modals/deleteBoardOrTaskModal/DeleteModal";
import AddNewOrEditTaskModal from "../../../modals/addNewOrEditTaskModal/AddNewOrEditTaskModal";

interface TaskProps {
    task: TaskType;
    statusOptions: string[];
}

const Task = ({ task, statusOptions }: TaskProps) => {
    const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);
    const [isDeleteModalopen, setIsDeleteModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const deleteModalText = getDeleteModalText(task.title);
    const transformedStatusOptions = statusOptions.map((option) => ({ value: option, label: option }));

    const handleViewTaskModalOpen = () => {
        setIsViewTaskModalOpen(true);
    };

    const handleViewTaskModalCancel = () => {
        setIsViewTaskModalOpen(false);
    };

    const handleDeleteModalOpen = () => {
        setIsDeleteModalOpen(true);
        setIsViewTaskModalOpen(false);
    };

    const handleDeleteModalCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const handleEditTaskModalOpen = () => {
        setIsEditTaskModalOpen(true);
        setIsViewTaskModalOpen(false);
    };

    const handleEditTaskModalCancel = () => {
        setIsEditTaskModalOpen(false);
    };

    const handleChangeCheckbox = (id: string, isCompleted: boolean) => {
        //TODO: create function
    };

    const handleChangeSelect = (id: string, status: string) => {
        //TODO: create function
    };

    const handleDeleteTask = () => {
        //TODO: create function
    };

    const handleEditTask = (values: TaskType) => {
        //TODO: create function
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

            <DeleteModal
                open={isDeleteModalopen}
                onCancel={handleDeleteModalCancel}
                onDelete={handleDeleteTask}
                title={deleteModalTitle}
                text={deleteModalText}
            />

            <AddNewOrEditTaskModal
                open={isEditTaskModalOpen}
                onCancel={handleEditTaskModalCancel}
                type="edit"
                initialValues={task}
                onSubmit={handleEditTask}
                statusOptions={transformedStatusOptions}
            />
        </>
    );
};

export default Task;
