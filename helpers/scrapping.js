const puppeteer = require("puppeteer");

const searchWeb = async (web, tipo) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const arrayProductos = [];

    await page.goto(web);

    //Cookies
    await page.click("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    await page.type('#zipcode', '20013'), { delay: 100 };
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    console.log('Entrando en la web');

    // await page.type('#search', searchItem, { delay: 100 });
    // await page.click('#search_mini_form > div > div.header__main-input-buttons > button');
    // await autoScroll(page);
    // await page.waitForNavigation();


    console.log('Buscando ' + tipo);

    const selImg = '.product-image-photo';
    const urlImg = await page.$$eval(selImg, urlImg => urlImg.map(img => img.src));
    console.log('Almacenando');

    const selDesc = 'div.card--product-listing__content > h2';
    const descripciones = await page.$$eval(selDesc, descripciones =>
        descripciones.map(descripcion => descripcion.innerText)
    );

    const selPrecio = 'span.price-container-brico.price-container.price-final_price.tax.weee > p > span';
    const precios = await page.$$eval(selPrecio, precios => precios.map(precio => precio.textContent));

    console.log('Exportando');

    urlImg.forEach((img, ind) => {
        if (precios[ind]) arrayProductos.push({
            descripcion: descripciones[ind],
            imagen: img,
            precio: precios[ind].replace('€', '').trim(),
            tipo
        })
    })

    await browser.close();
    return arrayProductos;
}

module.exports = searchWeb;