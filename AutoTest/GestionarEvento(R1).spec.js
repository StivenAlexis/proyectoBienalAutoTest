import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://bienal-front-end-viuu.vercel.app/');
    await page.getByRole('button').click();
const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Continuar con Github' }).click();
const page1 = await page1Promise;
    await page1.getByLabel('Username or email address').click();
    await page1.getByLabel('Username or email address').fill('BienalTesting');
    await page1.getByLabel('Password').click();
    await page1.getByLabel('Password').fill('bienal2024');
    await page1.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.locator('div').filter({ hasText: /^Gestionar Eventos$/ }).nth(1).click();
    await page.getByRole('button', { name: 'Crear Eventos' }).click();
    await page.getByLabel('Nombre del Evento *').click();
    await page.getByLabel('Nombre del Evento *').fill('Ameri');
    await page.getByLabel('Fecha de inicio *').fill('2024-11-15');
    await page.getByLabel('Fecha de fin *').fill('2024-11-17');
    await page.getByLabel('Lugar *').click();
    await page.getByLabel('Lugar *').fill('Buenos Aires');
    await page.getByLabel('Descripción *').click();
    await page.getByLabel('Descripción *').fill('El mejor recital del mundo');
    await page.getByLabel('Tema').click();
    await page.getByLabel('Tema').fill('Trap ');
    await page.locator('input[type="file"]').setInputFiles('ImagenesTest/imagenTopSecret.jpg');
    await page.getByRole('button', { name: 'Crear Evento' }).click();
});