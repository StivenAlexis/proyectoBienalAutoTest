import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Navegar a la página de login
  await page.goto('https://bienal-front-end-viuu.vercel.app/');
  
  // Iniciar autenticación con GitHub
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Continuar con Github' }).click();
  
  const page1 = await page1Promise;
  
  // Ingresar credenciales
  await page1.waitForSelector('input[name="login"]'); // Esperar que el campo de usuario esté disponible
  await page1.getByLabel('Username or email address').fill('GONZ4LINHO');
  await page1.getByLabel('Password').fill('Regatas1010');
  
  // Iniciar sesión
  await page1.getByRole('button', { name: 'Sign in', exact: true }).click();
  
  // Asegurar que la redirección finalice
  await page.waitForNavigation({ url: 'https://bienal-front-end-viuu.vercel.app/adminPanel' });
  
  // Navegar al panel de administración
  test.setTimeout(600000);
  await page.getByRole('button').click();
  await page.getByRole('heading', { name: 'Gestionar Esculturas' }).click();
  
  
  // Crear 20 nuevas esculturas
  for (let i = 1; i <= 10; i++) {
    await page.getByRole('button', { name: 'Crear Escultura' }).click();
    await page.getByLabel('Nombre *').fill(`Escultura ${i}`);
    await page.getByLabel('Descripción de la Temática *').fill(`Descripción de la escultura ${i}`);
    await page.getByLabel('Fecha de Creación *').fill('2022-12-18');
    await page.getByRole('button', { name: 'Crear Escultura' }).click();
  }
});
