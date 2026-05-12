import { expect, test } from "@playwright/test";

test.describe("Sign in", () => {
  test("allows an existing user to sign in", async ({ page }) => {
    await page.goto("/sign-in");

    await page.getByLabel("Email").fill("demo@fluentloop.dev");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page).toHaveURL(/\/dashboard|\/onboarding/);
  });

  test("shows validation errors for empty form", async ({ page }) => {
    await page.goto("/sign-in");

    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page.getByText(/valid email|required/i)).toBeVisible();
  });

  test("has a link to sign up", async ({ page }) => {
    await page.goto("/sign-in");

    await page.getByRole("link", { name: /sign up|create account/i }).click();

    await expect(page).toHaveURL(/\/sign-up/);
  });
});
