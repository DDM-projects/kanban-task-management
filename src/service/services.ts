import { Board, Task } from "../types";

const host = "http://192.168.1.25:8080";

const boardsGetAllURL = `${host}/api/boards/get-all`;
const boardGetById = `${host}/api/boards/get-by-id`;
const boardsPostURL = `${host}/api/boards/create`;
const boardsPutURL = `${host}/api/boards/update`;
const boardsDeleteURL = `${host}/api/boards/delete-by-id`;

const tasksPostURL = `${host}/api/tasks/create`;
const tasksPutURL = `${host}/api/tasks/update`;
const tasksDeleteURL = `${host}/api/tasks/delete-by-id`;

const getFetch = async (url: string) => {
    try {
        const response = await fetch(url, {
            method: "GET",
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
            data: null,
        };
    }
};

type Response<T> =
    | {
          status: "success";
          data: T;
      }
    | {
          status: "error";
      };

const postFetch = async <T>(url: string, data: any): Promise<Response<T>> => {
    try {
        const response = await fetch(url, {
            method: "POST",
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
        return { status: "error" };
    }
};

const deleteFetch = async (url: string, id: string) => {
    try {
        await fetch(url, {
            method: "DELETE",
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
        return { status: "error" };
    }
};

export const getAllBoards = async () => await getFetch(boardsGetAllURL);
export const getBoardById = async (id: string) => await getFetch(`${boardGetById}?id=${id}`);

export const postNewBoard = async (data: Board) => await postFetch<Board>(boardsPostURL, data);
export const postNewTask = async (data: Task) => await postFetch<Task>(tasksPostURL, data);

export const deleteBoardById = async (id: string) => await deleteFetch(boardsDeleteURL, id);
export const deleteTaskById = async (id: string) => await deleteFetch(tasksDeleteURL, id);

export const updateBoard = async (data: Board) => await updateFetch<Board>(boardsPutURL, data);
export const updateTask = async (data: Task) => await updateFetch<Task>(tasksPutURL, data);
