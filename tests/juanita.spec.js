// Import Playwright's test runner function and assertion helper.
const { test, expect } = require('@playwright/test');

// Define an async test that receives a browser page from Playwright.
test('adds Juanita es un descanso to the todo list', async ({ page }) => {
  // Open the TodoMVC demo with the Active filter selected and wait for navigation.
  await page.goto('https://demo.playwright.dev/todomvc/?utm_source=chatgpt.com#/active');

  // Create a locator for the new todo input using its placeholder text.
  const newTodo = page.getByPlaceholder('What needs to be done?');
  // Fill the input with the text for the new todo.
  await newTodo.fill('Juanita es un descanso');
  // Press Enter in the input to add the todo to the list.
  await newTodo.press('Enter');

  // Wait for the todo item identified by its test ID to display the expected text.
  await expect(page.getByTestId('todo-item')).toHaveText('Juanita es un descanso');
  // End the test callback and close the call to test().
});
