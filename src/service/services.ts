import { Board, BoardInfo, Column, Task } from "../types";

const boardsGetAllURL = "/api/boards/get-all";
const boardGetById = "/api/boards/get-by-id";
const boardsPostURL = "/api/boards/create";
const boardsPutURL = "/api/boards/update";
const boardsDeleteURL = "/api/boards/delete-by-id";

const tasksPostURL = "/api/tasks/create";
const tasksPutURL = "/api/tasks/update";
const tasksDeleteURL = "/api/tasks/delete-by-id";

const columnsColorPostURL = "/api/status/update-by-color";

type Response<T> =
    | {
          status: "success";
          data: T;
      }
    | {
          status: "error";
      };

const getFetch = async <T>(url: string): Promise<Response<T>> => {
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const fetchedData = await response.json();

        return {
            status: "success",
            data: fetchedData,
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
        };
    }
};

const postFetch = async <T>(url: string, data: any): Promise<Response<T>> => {
    try {
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        return {
            status: "success",
            data: responseData,
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
        };
    }
};

const deleteFetch = async (url: string, id: string) => {
    try {
        await fetch(url, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: id,
        });

        return "success";
    } catch (error) {
        console.log(error);
        return "error";
    }
};

const updateFetch = async <T>(url: string, data: any): Promise<Response<T>> => {
    try {
        const response = await fetch(url, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        return {
            status: "success",
            data: responseData,
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
        };
    }
};

export const getAllBoards = async () => await getFetch<BoardInfo[]>(boardsGetAllURL);
export const getBoardById = async (id: string) => await getFetch<Board>(`${boardGetById}?id=${id}`);

export const postNewBoard = async (data: Board) => await postFetch<Board>(boardsPostURL, data);
export const postNewTask = async (data: Task) => await postFetch<Task>(tasksPostURL, data);
export const postNewColumnColor = async (data: { id: string; color: string }) =>
    await postFetch<Column>(columnsColorPostURL, data);

export const deleteBoardById = async (id: string) => await deleteFetch(boardsDeleteURL, id);
export const deleteTaskById = async (id: string) => await deleteFetch(tasksDeleteURL, id);

export const updateBoard = async (data: Board) => await updateFetch<Board>(boardsPutURL, data);
export const updateTask = async (data: Task) => await updateFetch<Task>(tasksPutURL, data);
