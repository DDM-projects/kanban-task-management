import { configureStore } from "@reduxjs/toolkit";
import selectedBoardReducers from "./selectedBoard/selectedBoardSlice";
import boardsReducers from "./boards/boardsSlice";

export const store = configureStore({
    reducer: {
        selectedBoard: selectedBoardReducers,
        boards: boardsReducers,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
