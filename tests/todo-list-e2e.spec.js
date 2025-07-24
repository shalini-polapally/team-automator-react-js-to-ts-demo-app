import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("username").fill("Test User");
  await page.getByTestId("password").fill("securepassword");
  await page.getByTestId("login-btn").click();
});

const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
];

test.describe("New Todo", () => {
  test("should allow me to add todo items", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    // Make sure the list only has one todo item.
    await expect(page.getByTestId("todo-title")).toHaveText([TODO_ITEMS[0]]);

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");

    // Make sure the list now has two todo items.
    await expect(page.getByTestId("todo-title")).toHaveText([
      TODO_ITEMS[1],
      TODO_ITEMS[0],
    ]);
  });

  test("should clear text input field when an item is added", async ({
    page,
  }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create one todo item.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    // Check that input is empty.
    await expect(newTodo).toBeEmpty();
  });

  test("should append new items to the bottom of the list", async ({
    page,
  }) => {
    // Create 3 items.
    await createDefaultTodos(page);

    // create a todo count locator
    const todoCount = page.getByTestId("todo-count");

    // Check test using different methods.
    await expect(page.getByText("3 items left")).toBeVisible();
    await expect(page.getByTestId("todo-count")).toHaveText("3 items left");
    await expect(todoCount).toContainText("3");
    await expect(todoCount).toHaveText(/3/);

    // Check all items in one call.
    await expect(page.getByTestId("todo-title")).toHaveText(
      [...TODO_ITEMS].reverse()
    );
  });
});

test.describe("Item", () => {
  test("should allow me to mark items as complete", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press("Enter");
    }

    // Check first item.
    const firstTodo = page.getByTestId("todo-item").nth(0);
    await firstTodo.getByRole("checkbox").check();
    await expect(firstTodo).toHaveClass(/completed/);

    // Check second item.
    const secondTodo = page.getByTestId("todo-item").nth(1);
    await expect(secondTodo).not.toHaveClass(/completed/);
    await secondTodo.getByRole("checkbox").check();

    // Assert completed class.
    await expect(firstTodo).toHaveClass(/completed/);
    await expect(secondTodo).toHaveClass(/completed/);
  });

  test("should allow me to un-mark items as complete", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press("Enter");
    }

    const firstTodo = page.getByTestId("todo-item").nth(0);
    const secondTodo = page.getByTestId("todo-item").nth(1);
    const firstTodoCheckbox = firstTodo.getByRole("checkbox");

    await firstTodoCheckbox.check();
    await expect(firstTodo).toHaveClass(/completed/);
    await expect(secondTodo).not.toHaveClass(/completed/);

    await firstTodoCheckbox.uncheck();
    await expect(firstTodo).not.toHaveClass(/completed/);
    await expect(secondTodo).not.toHaveClass(/completed/);
  });
});

test.describe("Counter", () => {
  test("should display the current number of todo items", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // create a todo count locator
    const todoCount = page.getByTestId("todo-count");

    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");
    await expect(todoCount).toContainText("1");

    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");
    await expect(todoCount).toContainText("2");
  });
});

async function createDefaultTodos(page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder("What needs to be done?");

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press("Enter");
  }
}
