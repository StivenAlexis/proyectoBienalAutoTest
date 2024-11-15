import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bienal-front-end-viuu.vercel.app/');
  await page.getByPlaceholder('Buscar esculturas, escultores').click();
  await page.getByPlaceholder('Buscar esculturas, escultores').fill('Juan');
  await page.getByRole('link', { name: 'Juan Obras: Ninguna' }).click();
});