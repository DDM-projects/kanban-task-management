import {
    StyledMainContainer,
    StyledNewColumnContainer,
    StyledNewColumnButton,
    StyledContainer,
    StyledAddColummnButton,
    StyledText,
} from "./board.style";
import Column from "./column/Column";
import { Board as BoardType, Task, Column as ColumnType } from "../../../types";
import AddOrEditBoardModal from "../../modals/addOrEditBoardModal/AddOrEditBoardModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBoard, setSelectedBoard } from "../../../state/selectedBoard/selectedBoardSlice";
import { AppDispatch } from "../../../state/store";
import { moveTasks, updateBoard } from "../../../service/services";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import _ from "lodash";

const Board = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedBoard = useSelector(selectBoard);
    const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
    const [isEditBoardModalVisible, setIsEditBoardModalVisible] = useState(isEditBoardModalOpen);
    const columnExists = !!selectedBoard?.statuses?.length;
    const boardExists = !!selectedBoard;

    const handleEditBoardModalOpen = () => {
        setIsEditBoardModalOpen(true);
        setIsEditBoardModalVisible(true);
    };

    const handleEditBoardModalCancel = () => {
        setIsEditBoardModalOpen(false);
    };

    const handleEditBoardModalAfterClose = () => {
        setIsEditBoardModalVisible(false);
    };

    const handleSubmit = async (updatedBoard: BoardType) => {
        const response = await updateBoard(updatedBoard);

        if (response.status !== "success") {
            console.error("error");
            return;
        }

        dispatch(setSelectedBoard(response.data));
        setIsEditBoardModalOpen(false);
    };

    const getEmptyBoardView = () => {
        if (boardExists && !columnExists) {
            return (
                <StyledContainer>
                    <StyledText>This board is empty. Create a new column to get started.</StyledText>
                    <StyledAddColummnButton
                        width={174}
                        buttonFunction={handleEditBoardModalOpen}
                        category="primaryLarge"
                    >
                        + Add New Column
                    </StyledAddColummnButton>
                </StyledContainer>
            );
        }
        return <></>;
    };

    const emptyBoardView = getEmptyBoardView();

    const getBoardWithColumnsView = () => {
        if (columnExists) {
            return (
                <StyledNewColumnContainer>
                    <StyledNewColumnButton onClick={handleEditBoardModalOpen}>+ New Column</StyledNewColumnButton>
                </StyledNewColumnContainer>
            );
        }
        return <></>;
    };

    const boardWithColumnsView = getBoardWithColumnsView();

    const reindexTasks = (tasks: Task[]) => {
        return tasks.map((task, index) => ({ ...task, index }));
    };

    const updateColumnTasks = (column: ColumnType, tasks: Task[]) => {
        return { ...column, tasks: reindexTasks(tasks) };
    };

    const findTaskIndex = (tasks: Task[], elementId: string) => {
        return tasks.findIndex((task) => task.id === elementId);
    };

    const findColumnByTaskId = (board: BoardType, taskId: string) => {
        return board.statuses.find((column) => column.tasks.some((task) => task.id === taskId));
    };

    const updateSelectedBoard = async (previousSelectedBoard: BoardType, updatedBoard: BoardType) => {
        if (_.isEqual(updatedBoard, previousSelectedBoard)) {
            return true;
        }

        dispatch(setSelectedBoard(updatedBoard));
        const response = await moveTasks(updatedBoard);

        if (response.status !== "success") {
            dispatch(setSelectedBoard(previousSelectedBoard));
            console.error("error");
            return false;
        }
        return true;
    };

    const moveTaskWithinColumn = (sourceColumn: ColumnType, taskId: Task["id"], newIndex: number) => {
        const sourceTasks = [...sourceColumn.tasks];
        const activeIndex = findTaskIndex(sourceTasks, taskId);
        const [movedTask] = sourceTasks.splice(activeIndex, 1);
        sourceTasks.splice(newIndex, 0, movedTask);

        return updateColumnTasks(sourceColumn, sourceTasks);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            console.error("No drop target");
            return;
        }

        const taskId = active.id as Task["id"];
        const overId = over.id as string;

        if (!selectedBoard) {
            console.error("No selected board");
            return;
        }

        const previousSelectedBoard = { ...selectedBoard };
        const sourceColumn = findColumnByTaskId(selectedBoard, taskId);

        if (!sourceColumn) {
            console.error("Source column not found");
            return;
        }

        const activeTask = sourceColumn.tasks.find((task) => task.id === taskId);

        if (!activeTask) {
            console.error("Task not found");
            return;
        }

        const destinationColumn =
            selectedBoard.statuses.find((column) => column.id === overId) || findColumnByTaskId(selectedBoard, overId);

        if (!destinationColumn) {
            console.error("Destination column not found");
            return;
        }

        const overTaskIndex = findTaskIndex(destinationColumn.tasks, overId);
        const newIndex = overTaskIndex < 0 ? destinationColumn.tasks.length : overTaskIndex;

        if (sourceColumn.id === destinationColumn.id) {
            const updatedColumn = moveTaskWithinColumn(sourceColumn, taskId, newIndex);
            const updatedStatuses = selectedBoard.statuses.map((column) =>
                column.id === sourceColumn.id ? updatedColumn : column
            );
            const updatedBoard = { ...selectedBoard, statuses: updatedStatuses };
            const isMoveTasksSuccess = await updateSelectedBoard(previousSelectedBoard, updatedBoard);

            if (!isMoveTasksSuccess) {
                console.error("Failed to update board state");
            }
        } else {
            const updatedSourceTasks = sourceColumn.tasks.filter((task) => task.id !== taskId);
            const updatedSourceColumn = updateColumnTasks(sourceColumn, updatedSourceTasks);
            const updatedDestinationTasks = [...destinationColumn.tasks];
            updatedDestinationTasks.splice(newIndex, 0, activeTask);
            const updatedDestinationColumn = updateColumnTasks(destinationColumn, updatedDestinationTasks);
            const currentStatuses = selectedBoard.statuses.map((column) => {
                if (column.id === sourceColumn.id) {
                    return updatedSourceColumn;
                }

                if (column.id === destinationColumn.id) {
                    return updatedDestinationColumn;
                } else {
                    return column;
                }
            });

            const updatedBoard = { ...selectedBoard, statuses: currentStatuses };
            const isMoveTasksSuccess = await updateSelectedBoard(previousSelectedBoard, updatedBoard);

            if (!isMoveTasksSuccess) {
                console.error("Failed to update board state");
            }
        }
    };

    //TODO: handle dark mode

    return (
        <StyledMainContainer $isAddColumnButtonVisible={!columnExists}>
            <DndContext onDragEnd={handleDragEnd}>
                {selectedBoard?.statuses?.map((column) => (
                    <Column key={column.id} column={column} />
                ))}
            </DndContext>
            {emptyBoardView}
            {boardWithColumnsView}

            {isEditBoardModalVisible && (
                <AddOrEditBoardModal
                    open={isEditBoardModalOpen}
                    onCancel={handleEditBoardModalCancel}
                    type="edit"
                    onSubmit={handleSubmit}
                    initialValues={selectedBoard}
                    afterClose={handleEditBoardModalAfterClose}
                />
            )}
        </StyledMainContainer>
    );
};

export default Board;
