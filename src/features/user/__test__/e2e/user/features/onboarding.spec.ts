import { expect, test } from "@playwright/test";

test.describe("Onboarding", () => {
  test("redirects unauthenticated users to sign in", async ({ page }) => {
    await page.goto("/onboarding");

    await expect(page).toHaveURL(/\/sign-in/);
  });

  test("allows a newly signed up user to complete onboarding", async ({ page }) => {
    await page.goto("/sign-up");

    await page.getByLabel("Email").fill(`onboarding-${Date.now()}@fluentloop.dev`);
    await page.getByLabel("Password").fill("password123");
    await page.getByLabel("Confirm password").fill("password123");
    await page.getByRole("button", { name: /create account|sign up/i }).click();

    await expect(page).toHaveURL(/\/onboarding/);

    await page.getByLabel("Display name").fill("Thi Nguyen");

    await page.getByRole("button", { name: /b1/i }).click();

    await page.getByLabel("Main learning goal").click();
    await page.getByRole("option", { name: /job interview/i }).click();

    await page.getByLabel("Speaking fluency").check();
    await page.getByLabel("Interview confidence").check();

    await page.getByLabel("Native language").click();
    await page.getByRole("option", { name: /vietnamese/i }).click();

    await page.getByRole("button", { name: /start practicing|continue/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
  });
});
