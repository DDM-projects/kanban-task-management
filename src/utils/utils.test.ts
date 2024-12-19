import { getValueFromPath } from "./utils";

const testObject = {
    board: {
        name: "Board 1",
        tasks: [
            {
                id: 1,
                name: "Task 1",
                completed: false,
            },
            {
                id: 2,
                name: "Task 2",
                completed: true,
            },
        ],
        status: ["active", "inactive"],
        body: {
            title: "title",
            content: {
                text: "content",
            },
        },
    },
};

describe("getValueFromPath", () => {
    it("should return the correct value for a simple path", () => {
        const simplePath = "board.name";
        const result = getValueFromPath(testObject, simplePath);

        expect(result).toEqual("Board 1");
    });

    it("should return the correct value for a simple path 2", () => {
        const simplePath = "board.body.content.text";
        const result = getValueFromPath(testObject, simplePath);

        expect(result).toEqual("content");
    });

    it("should return the correct value for a simple path with [] notation", () => {
        const simplePath = "board.body.content[text]";
        const result = getValueFromPath(testObject, simplePath);

        expect(result).toEqual("content");
    });

    it("should return the correct value for an array path", () => {
        const simplePath = "board.tasks[1].name";
        const result = getValueFromPath(testObject, simplePath);

        expect(result).toEqual("Task 2");
    });
});
