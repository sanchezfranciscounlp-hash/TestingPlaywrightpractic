from playwright.sync_api import Page, expect


def test_get_started_opens_installation_guide(page: Page):
    page.goto("https://playwright.dev/")
    page.get_by_role("link", name="Get started").click()

    heading = page.get_by_role("heading", name="Installation", exact=True)
    expect(heading).to_be_visible()


def test_new_todo_is_listed(page: Page):
    page.goto("https://demo.playwright.dev/todomvc/?utm_source=chatgpt.com#/active")

    new_todo = page.get_by_placeholder("What needs to be done?")
    new_todo.fill("practice playwright")
    new_todo.press("Enter")

    todo_items = page.get_by_test_id("todo-item")
    expect(todo_items).to_have_count(1)
    expect(todo_items).to_have_text("practice playwright")
