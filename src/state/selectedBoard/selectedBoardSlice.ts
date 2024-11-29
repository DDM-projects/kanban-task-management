import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, Column, Task } from "../../types";
import { RootState } from "../store";

interface SelectedBoardState {
    board: Board;
}

const initialState: SelectedBoardState = {
    board: undefined as unknown as Board,
};

const selectedBoardSlice = createSlice({
    name: "selectedBoard",
    initialState,
    reducers: {
        setSelectedBoard(state, action: PayloadAction<Board>) {
            state.board = action.payload;
        },

        updateColumn(state, action: PayloadAction<Column>) {
            const columnIndex = state.board.columns.findIndex((col) => col.id === action.payload.id);

            if (columnIndex !== -1) {
                state.board.columns[columnIndex] = action.payload;
            }
        },

        addTask(state, action: PayloadAction<Task>) {
            const column = state.board.columns?.find((col) => col.name === action.payload.status);
            column?.tasks.push(action.payload);
        },

        updateTask(state, action: PayloadAction<{ updatedTask: Task; columnId: string }>) {
            const { updatedTask, columnId } = action.payload;
            const columnIndex = state.board.columns.findIndex((column) => column.id === columnId);

            if (columnIndex < 0) {
                return;
            }

            const task = state.board.columns[columnIndex].tasks.find((task) => task.id === updatedTask.id);

            if (task?.status === updatedTask.status) {
                state.board.columns[columnIndex].tasks = state.board.columns[columnIndex].tasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                );
                return;
            }

            state.board.columns = state.board.columns.map((column) => {
                if (column.name === updatedTask.status) {
                    return {
                        ...column,
                        tasks: [...column.tasks, updatedTask],
                    };
                }

                if (column.id === columnId) {
                    const updatedTasks = column.tasks.filter((task) => task.id !== updatedTask.id);
                    return { ...column, tasks: updatedTasks };
                }

                return column;
            });
        },

        deleteTask(state, action: PayloadAction<{ task: Task; columnId: string }>) {
            const { task, columnId } = action.payload;
            const columnIndex = state.board.columns.findIndex((col) => col.id === columnId);

            if (columnIndex !== -1) {
                state.board.columns[columnIndex].tasks = state.board.columns[columnIndex].tasks.filter(
                    (item) => item.id !== task.id
                );
            }
        },
    },
});

export const selectBoard = (state: RootState) => state.selectedBoard.board;
export const { setSelectedBoard, addTask, updateColumn, updateTask, deleteTask } = selectedBoardSlice.actions;
export default selectedBoardSlice.reducer;
