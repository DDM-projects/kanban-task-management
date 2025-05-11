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
import _ from "lodash";
import { useDraggable, useDroppable } from "@dnd-kit/core";

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

    const {
        attributes,
        listeners,
        transform,
        setNodeRef: setDraggableRef,
    } = useDraggable({
        id: task.id,
    });

    const { setNodeRef: setDroppableRef } = useDroppable({
        id: task.id,
    });

    const setNodeRef = (node: HTMLElement | null) => {
        setDraggableRef(node);
        setDroppableRef(node);
    };

    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
          }
        : undefined;

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

    const handleChangeSelect = (status: { label: string; value: string }, index: number) => {
        const _updatedTask = { ...updatedTask, statusName: status.label, statusId: status.value, index: index };
        setUpdatedTask(_updatedTask);
    };

    const handleEditTask = async (updatedTask: TaskType) => {
        const response = await updateTaskService(updatedTask);

        if (response.status !== "success") {
            console.error("error");
            return;
        }

        dispatch(updateTask({ updatedTask: response.data, columnId: updatedColumnId }));
        setUpdatedTask(response.data);
        handleEditTaskModalCancel();
    };

    const handleViewTaskModalCancel = async () => {
        if (_.isEqual(task, updatedTask)) {
            setIsViewTaskModalOpen(false);
            return;
        }

        if (!updatedTask || updatedTask === null) {
            return;
        }

        const response = await updateTaskService(updatedTask);

        if (response.status !== "success") {
            console.error("error");
            return;
        }

        dispatch(updateTask({ updatedTask: response.data, columnId: updatedColumnId }));
        setUpdatedTask(response.data);
        setIsViewTaskModalOpen(false);
    };

    //TODO: handle dark mode

    return (
        <>
            <StyledTask
                style={style}
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                data-testid="task"
                onDoubleClick={handleViewTaskModalOpen}
            >
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
