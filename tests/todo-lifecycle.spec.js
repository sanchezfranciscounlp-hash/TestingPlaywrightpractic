const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
});

test('an edited todo keeps its new title after reload', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('Practice locators');
  await newTodo.press('Enter');

  const todo = page.getByTestId('todo-item');
  await todo.getByText('Practice locators', { exact: true }).dblclick();

  const editor = todo.getByRole('textbox');
  await editor.fill('Practice editing a todo');
  await editor.press('Enter');

  await expect(todo).toHaveText('Practice editing a todo');
  await page.reload();
  await expect(todo).toHaveText('Practice editing a todo');
});

test('clear completed removes only the finished todo', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  for (const title of ['Read Playwright docs', 'Write another test']) {
    await newTodo.fill(title);
    await newTodo.press('Enter');
  }

  const todos = page.getByTestId('todo-item');
  const finishedTodo = todos.filter({ hasText: 'Read Playwright docs' });
  await finishedTodo.getByRole('checkbox').check();

  const clearCompleted = page.getByRole('button', { name: 'Clear completed' });
  await clearCompleted.click();

  await expect(todos).toHaveText(['Write another test']);
  await expect(todos.getByRole('checkbox')).not.toBeChecked();
  await expect(clearCompleted).toBeHidden();
});
