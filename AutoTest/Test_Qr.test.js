import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bienal-front-end-viuu.vercel.app/');
  await page.getByRole('button').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Continuar con Github' }).click();
  const page1 = await page1Promise;
  await page1.getByLabel('Username or email address').fill('DeuxExDoge@gmail.com');
  await page1.getByLabel('Username or email address').press('Tab');
  await page1.getByLabel('Password').fill('PedroPedro55');
  await page1.getByRole('button', { name: 'Sign in', exact: true }).click();
  test.setTimeout(6000);
  await page.goto('https://bienal-front-end-viuu.vercel.app/adminPanel');
  await page.getByRole('heading', { name: 'Gestionar Eventos' }).click();
  await page.getByLabel('Ver evento').first().click();
  await page.getByRole('button', { name: 'Escultores' }).click();
  await page.locator('li').filter({ hasText: 'AquinoplaQR' }).getByRole('button').click();
  await page.getByRole('heading', { name: 'Código QR para el Escultor' }).click();
  await page.getByRole('img', { name: 'QR Code' }).click();
});