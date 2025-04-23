import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Board } from "../../../../types";
import "@testing-library/jest-dom";
import { store } from "../../../../state/store";
import { setSelectedBoard } from "../../../../state/selectedBoard/selectedBoardSlice";
import { setBoards } from "../../../../state/boards/boardsSlice";
import Task from "./Task";

jest.mock("../../../../components/select/select.style", () => {
    const MockComponent = (props: any) => {
        return <></>;
    };

    return { StyledSelect: MockComponent };
});

const selectedBoard: Board = {
    id: "1",
    name: "Test Board",
    statuses: [
        {
            id: "column-1",
            name: "To Do",
            color: "blue",
            index: 0,
            tasks: [
                {
                    id: "1",
                    title: "Test Task",
                    description: "Test Description",
                    statusName: "To Do",
                    statusId: "column-1",
                    index: 0,
                    subtasks: [
                        { id: "1", title: "Subtask 1", completed: false, taskId: "1", index: 0 },
                        { id: "2", title: "Subtask 2", completed: true, taskId: "1", index: 1 },
                    ],
                },
            ],
        },
        {
            id: "column-2",
            name: "In Progress",
            color: "green",
            index: 1,
            tasks: [],
        },
    ],
};

const boards = [selectedBoard];

describe("Task Component", () => {
    let deleteModalOpen: jest.Mock;
    let updatedColumnId: string;

    const getRenderedComponent = () => {
        return render(
            <Provider store={store}>
                <Task
                    task={selectedBoard.statuses[0].tasks[0]}
                    deleteModalOpen={deleteModalOpen}
                    updatedColumnId={updatedColumnId}
                />
            </Provider>
        );
    };

    const openTaskMenu = () => {
        getRenderedComponent();

        const task = screen.getByTestId("task");
        fireEvent.click(task);
        fireEvent.click(screen.getByAltText("menu"));
    };

    beforeEach(() => {
        deleteModalOpen = jest.fn();
        updatedColumnId = "column-1";
        store.dispatch(setSelectedBoard(selectedBoard));
        store.dispatch(setBoards(boards));
    });

    it("renders task title and subtasks status", () => {
        getRenderedComponent();

        expect(screen.getByText("Test Task")).toBeInTheDocument();
        expect(screen.getByText("1 of 2 subtasks")).toBeInTheDocument();
    });

    it("opens ViewTaskModal on task click", () => {
        getRenderedComponent();

        const task = screen.getByTestId("task");

        fireEvent.click(task);

        expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("opens DeleteModal when 'Delete Task' button is clicked", () => {
        openTaskMenu();

        fireEvent.click(screen.getByText("Delete Task"));

        expect(deleteModalOpen).toHaveBeenCalledTimes(1);
    });

    it("opens EditTaskModal when 'Edit Task' button is clicked", () => {
        openTaskMenu();

        fireEvent.click(screen.getByText("Edit Task"));

        expect(screen.getByTestId("add-or-edit-task-modal")).toBeInTheDocument();
    });
});
