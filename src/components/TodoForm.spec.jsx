import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe("TodoForm Component", () => {
    let mockAddTodo;

    beforeEach(() => {
        mockAddTodo = jest.fn();
    });

    test("renders input and button", () => {
        const { getByTestId } = render(<TodoForm onAddTodo={mockAddTodo} />);

        expect(getByTestId("todo-input")).toBeInTheDocument();
        expect(getByTestId("add-button")).toBeInTheDocument();
    });

    test("updates input value on change", () => {
        const { getByTestId } = render(<TodoForm onAddTodo={mockAddTodo} />);
        const input = getByTestId("todo-input");

        fireEvent.change(input, { target: { value: "Test Task" } });
        expect(input.value).toBe("Test Task");
    });

    test("calls onAddTodo with correct data and clears input", () => {
        const { getByTestId } = render(<TodoForm onAddTodo={mockAddTodo} />);
        const input = getByTestId("todo-input");
        const button = getByTestId("add-button");

        fireEvent.change(input, { target: { value: "New Task" } });
        fireEvent.click(button);

        expect(mockAddTodo).toHaveBeenCalledTimes(1);
        expect(mockAddTodo.mock.calls[0][0]).toMatchObject({
            title: "New Task",
            completed: false,
        });
        expect(input.value).toBe("");
    });

    test("does not call onAddTodo when input is empty or only spaces", () => {
        const { getByTestId } = render(<TodoForm onAddTodo={mockAddTodo} />);
        const input = getByTestId("todo-input");
        const button = getByTestId("add-button");

        fireEvent.change(input, { target: { value: "   " } });
        fireEvent.click(button);

        expect(mockAddTodo).not.toHaveBeenCalled();
    });
});