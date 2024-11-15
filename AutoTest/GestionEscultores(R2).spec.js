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
    await page.getByRole('heading', { name: 'Gestionar Escultores' }).click();
    await page.getByRole('button', { name: 'Crear Escultor' }).click();
    await page.getByLabel('Nombre *').click();
    await page.getByLabel('Nombre *').fill('Lautaro');
    await page.getByLabel('Biografía *').click();
    await page.getByLabel('Biografía *').fill('El mas grande tester');
    await page.getByLabel('País *').click();
    await page.getByLabel('País *').fill('Argentina');
    await page.getByLabel('Correo Electrónico *').click();
    await page.getByLabel('Correo Electrónico *').fill('lautaroagsalina15@gmail.com');
    await page.getByLabel('Teléfono').click();
    await page.getByLabel('Teléfono').fill('3794044985');
    await page.locator('input[type="file"]').setInputFiles('ImagenesTest/imagenGoku.jpg');
    await page.getByRole('button', { name: 'Crear Escultor' }).click();
});