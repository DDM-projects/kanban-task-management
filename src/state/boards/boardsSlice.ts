import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardInfo } from "../../types";
import { RootState } from "../store";

interface BoardsState {
    boards: BoardInfo[];
}

const initialState: BoardsState = {
    boards: [],
};

const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {
        setBoards(state, action: PayloadAction<BoardsState["boards"]>) {
            state.boards = action.payload;
        },

        addBoard(state, action: PayloadAction<BoardInfo>) {
            state.boards.push(action.payload);
        },

        deleteBoard(state, action: PayloadAction<BoardInfo>) {
            state.boards = state.boards.filter((board) => board.id !== action.payload.id);
        },
    },
});

export const selectBoards = (state: RootState) => state.boards.boards;
export const { setBoards, addBoard, deleteBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
