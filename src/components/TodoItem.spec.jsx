import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";

describe("TodoItem Component", () => {
    const mockTodo = {
        id: 1,
        title: "Test Task",
        completed: false,
    };

    let mockToggleComplete, mockDeleteTodo;

    beforeEach(() => {
        mockToggleComplete = jest.fn();
        mockDeleteTodo = jest.fn();
    });

    test("renders todo item with title", () => {
        const { getByTestId } = render(
            <TodoItem
                todo={mockTodo}
                onToggleComplete={mockToggleComplete}
                onDeleteTodo={mockDeleteTodo}
            />
        );

        expect(getByTestId("todo-title").textContent).toBe("Test Task");
        expect(getByTestId("todo-checkbox")).not.toBeChecked();
    });

    test("shows strikethrough when todo is completed", () => {
        const completedTodo = { ...mockTodo, completed: true };

        const { getByTestId } = render(
            <TodoItem
                todo={completedTodo}
                onToggleComplete={mockToggleComplete}
                onDeleteTodo={mockDeleteTodo}
            />
        );

        expect(getByTestId("todo-checkbox")).toBeChecked();
        expect(getByTestId("todo-title")).toHaveStyle(
            "text-decoration: line-through"
        );
    });

    test("calls onToggleComplete when checkbox is clicked", () => {
        const { getByTestId } = render(
            <TodoItem
                todo={mockTodo}
                onToggleComplete={mockToggleComplete}
                onDeleteTodo={mockDeleteTodo}
            />
        );

        fireEvent.click(getByTestId("todo-checkbox"));
        expect(mockToggleComplete).toHaveBeenCalledWith(mockTodo.id);
    });

    test("calls onDeleteTodo when delete button is clicked", () => {
        const { getByTestId } = render(
            <TodoItem
                todo={mockTodo}
                onToggleComplete={mockToggleComplete}
                onDeleteTodo={mockDeleteTodo}
            />
        );

        fireEvent.click(getByTestId("delete-button"));
        expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
    });
});