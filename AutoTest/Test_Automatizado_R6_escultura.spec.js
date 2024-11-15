import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bienal-front-end-viuu.vercel.app/');
  await page.getByPlaceholder('Buscar esculturas, escultores').click();
  await page.getByPlaceholder('Buscar esculturas, escultores').fill('gonzalo');
  await page.getByRole('link', { name: 'Gonzaloooo Escultor:' }).click();
});