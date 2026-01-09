const { test, expect } = require('@playwright/test');

test('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:5000');
  await expect(page.locator('text=Pokémon')).toBeVisible();
});

test('pokemon page can be opened', async ({ page }) => {
  await page.goto('http://localhost:5000');
  const firstPokemon = page.locator('a').first();
  await firstPokemon.click();
  await expect(page.locator('h1')).toBeVisible();
});
