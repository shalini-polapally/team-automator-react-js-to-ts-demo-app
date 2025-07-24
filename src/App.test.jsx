import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
];

const renderWithAuth = () => {
  return render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

const loginUser = async () => {
  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'vxe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'validpass123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });

  // Wait for the welcome message
  await screen.findByText(/welcome, vxe/i);
};

test('renders app title after login', async () => {
  renderWithAuth();
  await loginUser();
  expect(screen.getByText(/welcome, vxe/i)).toBeInTheDocument();
});

test('adds a new todo item', async () => {
  renderWithAuth();
  await loginUser();

  fireEvent.change(screen.getByTestId('todo-input'), {
    target: { value: TODO_ITEMS[0] },
  });
  fireEvent.click(screen.getByTestId('add-button'));

  expect(screen.getByText(TODO_ITEMS[0])).toBeInTheDocument();
});

test('marks a todo as completed', async () => {
  renderWithAuth();
  await loginUser();

  fireEvent.change(screen.getByTestId('todo-input'), {
    target: { value: TODO_ITEMS[1] },
  });
  fireEvent.click(screen.getByTestId('add-button'));
  fireEvent.click(screen.getByTestId('todo-checkbox'));

  expect(screen.getByText(TODO_ITEMS[1])).toHaveStyle('text-decoration: line-through');
  expect(screen.getByTestId('todo-item')).toHaveClass('completed');
});

test('deletes a todo item', async () => {
  renderWithAuth();
  await loginUser();

  fireEvent.change(screen.getByTestId('todo-input'), {
    target: { value: TODO_ITEMS[2] },
  });
  fireEvent.click(screen.getByTestId('add-button'));
  fireEvent.click(screen.getByTestId('delete-button'));

  expect(screen.queryByText(TODO_ITEMS[2])).not.toBeInTheDocument();
});

test('filters completed tasks', async () => {
  renderWithAuth();
  await loginUser();

  fireEvent.change(screen.getByTestId('todo-input'), {
    target: { value: 'feed the cat' },
  });
  fireEvent.click(screen.getByTestId('add-button'));
  fireEvent.click(screen.getByTestId('todo-checkbox'));

  fireEvent.click(screen.getByTestId('filter-completed'));

  expect(screen.getByText('feed the cat')).toBeInTheDocument();
});


