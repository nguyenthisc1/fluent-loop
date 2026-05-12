import { expect, test } from "@playwright/test";

test.describe("Sign up", () => {
  test("creates an account and redirects to onboarding", async ({ page }) => {
    await page.goto("/sign-up");

    await page.getByLabel("Email").fill(`new-user-${Date.now()}@fluentloop.dev`);
    await page.getByLabel("Password").fill("password123");
    await page.getByLabel("Confirm password").fill("password123");

    await page.getByRole("button", { name: /create account|sign up/i }).click();

    await expect(page).toHaveURL(/\/onboarding/);
  });

  test("shows validation error when passwords do not match", async ({ page }) => {
    await page.goto("/sign-up");

    await page.getByLabel("Email").fill("new-user@fluentloop.dev");
    await page.getByLabel("Password").fill("password123");
    await page.getByLabel("Confirm password").fill("different-password");

    await page.getByRole("button", { name: /create account|sign up/i }).click();

    await expect(page.getByText(/passwords do not match/i)).toBeVisible();
  });

  test("has a link back to sign in", async ({ page }) => {
    await page.goto("/sign-up");

    await page.getByRole("link", { name: /sign in|already have/i }).click();

    await expect(page).toHaveURL(/\/sign-in/);
  });
});
