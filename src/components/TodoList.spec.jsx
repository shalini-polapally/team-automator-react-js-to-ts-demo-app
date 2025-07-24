import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";

// Mock the child component (TodoItem)
jest.mock("./TodoItem", () => ({ todo }) => (
    <li data-testid="mock-todo-item">{todo.title}</li>
));

describe("TodoList Component", () => {
    const mockToggleComplete = jest.fn();
    const mockDeleteTodo = jest.fn();

    test("displays message when there are no todos", () => {
        render(
            <TodoList
                todos={[]}
                onToggleComplete={mockToggleComplete}
                onDeleteTodo={mockDeleteTodo}
            />
        );

        expect(screen.getByTestId("empty-message")).toHaveTextContent(
            "No tasks found."
        );
    });

    test("renders list of todos", () => {
        const sampleTodos = [
            { id: 1, title: "Buy milk", completed: false },
            { id: 2, title: "Write code", completed: true },
        ];

        render(
            <TodoList
                todos={sampleTodos}
                onToggleComplete={mockToggleComplete}
                onDeleteTodo={mockDeleteTodo}
            />
        );

        const list = screen.getByTestId("todo-list");
        expect(list).toBeInTheDocument();

        const todoItems = screen.getAllByTestId("mock-todo-item");
        expect(todoItems.length).toBe(2);
        expect(todoItems[0]).toHaveTextContent("Buy milk");
        expect(todoItems[1]).toHaveTextContent("Write code");
    });
});