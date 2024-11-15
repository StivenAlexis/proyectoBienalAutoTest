import { test, expect } from '@playwright/test';

test.describe('Compartir en redes sociales - Escultura', () => {
  test('Debería permitir compartir el enlace en WhatsApp, Instagram, Twitter y copiar el enlace', async ({ page }) => {
    const id = '1'; // ID de la escultura (ajustar según el ID que estás probando)
    const urlEscultura = `https://bienal-front-end-viuu.vercel.app/ver-escultura-public/${id}`; // Cambia esta URL si es necesario

    // Navegar a la página de la escultura
    await page.goto(urlEscultura);

    // Verificar que los botones de redes sociales están presentes
    const whatsappButton = page.locator('button[aria-label="WhatsApp"]');
    const instagramButton = page.locator('button[aria-label="Instagram"]');
    const twitterButton = page.locator('button[aria-label="Twitter"]');
    const linkButton = page.locator('button[aria-label="Copiar enlace"]');

    await expect(whatsappButton).toBeVisible();
    await expect(instagramButton).toBeVisible();
    await expect(twitterButton).toBeVisible();
    await expect(linkButton).toBeVisible();

    // Simular clic en el botón de WhatsApp
    await whatsappButton.click();
    // Verificar que la URL de WhatsApp se abre con el enlace correcto
    const [whatsapp] = await Promise.all([
      page.waitForEvent('popup'), // Esperar la ventana emergente
      whatsappButton.click(), // Clic en el botón
    ]);
    await expect(whatsapp.url()).toContain('wa.me');
    await expect(whatsapp.url()).toContain(encodeURIComponent(urlEscultura));

    // Simular clic en el botón de Instagram
    await instagramButton.click();
    // Verificar que la URL de Instagram se abre
    const [instagram] = await Promise.all([
      page.waitForEvent('popup'),
      instagramButton.click(),
    ]);
    await expect(instagram.url()).toContain('instagram.com');

    // Simular clic en el botón de Twitter
    await twitterButton.click();
    // Verificar que la URL de Twitter se abre con el enlace correcto
    const [twitter] = await Promise.all([
      page.waitForEvent('popup'),
      twitterButton.click(),
    ]);
    await expect(twitter.url()).toContain('twitter.com');
    await expect(twitter.url()).toContain(encodeURIComponent(urlEscultura));

    // Simular clic en el botón de copiar enlace
    await linkButton.click();
    // Verificar que el enlace ha sido copiado al portapapeles
    const copiedText = await page.evaluate(() => navigator.clipboard.readText());
    expect(copiedText).toBe(urlEscultura);
  });
});
