import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggleComplete, onDeleteTodo }) {
  if (!todos.length) return <p data-testid="empty-message">No tasks found.</p>;

  return (
    <div
      style={{
        maxHeight: "300px",
        overflowY: "auto",
        paddingRight: "6px"
      }}
    >
      <ul data-testid="todo-list" style={{ margin: 0, paddingLeft: "1rem" }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
