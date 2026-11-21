const { test, expect } = require('@playwright/test');

test('one todo stays active while another is completed', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/?utm_source=chatgpt.com#/active');

  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('practice playwright');
  await newTodo.press('Enter');

  const todoItems = page.getByTestId('todo-item');
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems).toHaveText('practice playwright');

  await newTodo.fill('complete another task');
  await newTodo.press('Enter');
  await expect(todoItems).toHaveText([
    'practice playwright',
    'complete another task',
  ]);

  const secondTodo = todoItems.filter({ hasText: 'complete another task' });
  await secondTodo.getByRole('checkbox').click();

  await expect(todoItems).toHaveCount(1);
  await expect(todoItems).toHaveText('practice playwright');
  await expect(todoItems.getByRole('checkbox')).not.toBeChecked();

  await page.getByRole('link', { name: 'Completed', exact: true }).click();
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems).toHaveText('complete another task');
  await expect(todoItems.getByRole('checkbox')).toBeChecked();

  await page.getByRole('link', { name: 'Active', exact: true }).click();
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems).toHaveText('practice playwright');
  await expect(todoItems.getByRole('checkbox')).not.toBeChecked();
});
