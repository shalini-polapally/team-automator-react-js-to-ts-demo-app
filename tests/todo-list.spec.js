import { test, expect } from "@playwright/test";

test("should display app title", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-testid="login-page-title"]')).toHaveText(
    "Login to Todo App"
  );
});

test("should log in successfully", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("username").fill("Test User");
  await page.getByTestId("password").fill("securepassword");
  await page.getByTestId("login-btn").click();

  // ✅ Check for post-login element
  await expect(page.getByText("Welcome ")).toBeVisible();
  await expect(page.getByTestId("app-title")).toContainText("Welcome");
});

test("should have input and Add button", async ({ page }) => {
  await authenticate(page);
  await expect(page.locator('[data-testid="todo-input"]')).toBeVisible();
  await expect(
    page.locator('[data-testid="add-button"]', { hasText: "Add" })
  ).toBeVisible();
});

test("should show filter buttons", async ({ page }) => {
  await authenticate(page);
  const filters = ["All", "Active", "Completed"];
  for (const label of filters) {
    await expect(
      page.locator(`[data-testid="filter-${label.toLowerCase()}"]`)
    ).toBeVisible();
  }
});

test('should show "No tasks found." when list is empty', async ({ page }) => {
  await authenticate(page);
  await expect(page.locator('[data-testid="empty-message"]')).toBeVisible();
});

test("should add a new todo item", async ({ page }) => {
  await authenticate(page);
  await page.fill('[data-testid="todo-input"]', "Write Playwright tests");
  await page.click('[data-testid="add-button"]');
  await expect(page.locator("li")).toContainText("Write Playwright tests");
});

test("should filter completed tasks", async ({ page }) => {
  await authenticate(page);

  // Add and complete a task
  await page.fill('[data-testid="todo-input"]', "Test filter logic");
  await page.click('[data-testid="add-button"]');
  await page.click('[data-testid="todo-checkbox"]'); // assumes checkbox completes the task

  // Click 'Completed' filter
  await page.click('[data-testid="filter-completed"]');
  await expect(page.locator("li")).toContainText("Test filter logic");
});

async function authenticate(page) {
  await page.goto("/");
  await page.getByTestId("username").fill("user@example.com");
  await page.getByTestId("password").fill("securepassword");
  await page.getByTestId("login-btn").click();
}
