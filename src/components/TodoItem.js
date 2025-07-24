import React from "react";

function TodoItem({ todo, onToggleComplete, onDeleteTodo }) {
  return (
    <li
      data-testid="todo-item"
      className={`todo-item ${todo.completed ? "completed" : null}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        data-testid="todo-checkbox"
        onChange={() => onToggleComplete(todo.id)}
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        data-testid="todo-title"
      >
        {todo.title}
      </span>
      <button
        data-testid="delete-button"
        onClick={() => onDeleteTodo(todo.id)}
        style={{ marginLeft: "10px" }}
      >
        ❌
      </button>
    </li>
  );
}

export default TodoItem;
