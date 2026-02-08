import { test, expect } from "@playwright/test";

test("loading finishes and displays grid results", async ({ page }) => {
    await page.goto("/explore");
    await expect(page.getByText('Loading filtered Pokémon...')).toBeHidden();
    await page.waitForSelector('[data-testid="pokemon-grid"]');
    await expect(page.getByText(/bulbasaur/i)).toBeVisible();
});
