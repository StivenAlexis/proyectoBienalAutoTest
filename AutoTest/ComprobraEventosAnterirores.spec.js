import { test, expect } from '@playwright/test';



  test('verificar que los valores no son nulos', async ({ page }) => {
    // Navegar a la página principal
    await page.goto('https://bienal-front-end-viuu.vercel.app/');
  
    // Navegar a "Esculturas" y luego a "Eventos"
    await page.getByRole('link', { name: 'Eventos' }).click();
  
    // Seleccionar el primer evento
    await page.locator('.MuiGrid-root > .MuiPaper-root').first().click();
    
    const tituloEvento = await page.locator('.MuiTypography-root.MuiTypography-h4.css-ruomge');
  
    // Obtener el texto del contenedor
    const textoTitulo = await tituloEvento.textContent();
     

    
    // Verificar que el texto no es nulo ni vacío
    expect(textoTitulo).not.toBeNull();
    expect(textoTitulo.trim().length).toBeGreaterThan(0);
  
    console.log('El título del evento es:', textoTitulo);

  
    // Cerrar la página
    await page.close();
  });
  


