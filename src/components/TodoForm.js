import React, { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = input.trim();
    if (!title) return;

    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    onAddTodo(newTodo);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        name="title"
        data-testid="todo-input"
        placeholder="What needs to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" data-testid="add-button">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
