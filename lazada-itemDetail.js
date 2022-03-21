const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // loading page
    await page.goto('https://www.lazada.co.id/', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    });
    await page.goto('https://www.lazada.co.id/');

    // ===== click item to the page
    await autoScroll(page);
    await page.waitForSelector('#hp-just-for-you > div.hp-mod-card-content.J_JFYCard > div.card-jfy-grid.J_JFYItems > div > div.card-jfy-row.J_Row1 > div:nth-child(1) > a');
    await page.click('#hp-just-for-you > div.hp-mod-card-content.J_JFYCard > div.card-jfy-grid.J_JFYItems > div > div.card-jfy-row.J_Row1 > div:nth-child(1) > a');
    await page.waitFor(10000);
    // ===== End

    await autoScroll(page);
    await page.waitFor(6000);

    // Scrape
    const result = await page.evaluate(()=> {
      // let image = document.querySelector('#main > div > div._193wCc._3cVWns > div.home-page > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1) > a > div > div > div._25_r8I.ggJllv > img').getAttribute('src');

      // let link = "https://shopee.co.id/"+document.querySelector('#main > div > div._193wCc._3cVWns > div.home-page > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1) > a').getAttribute('href');

      let title = document.querySelector('#module_product_title_1 > div > div > h1').innerText;

      let normalPrice = document.querySelector('#module_product_price_1 > div > div > div > span.pdp-price.pdp-price_type_deleted.pdp-price_color_lightgray.pdp-price_size_xs').innerText;

      let discountPrice = document.querySelector('#module_product_price_1 > div > div > span').innerText;

    //   let favorite = document.querySelector('#main > div > div:nth-child(3) > div._3A8xof > div > div.page-product > div.container > div.product-briefing.flex.card._1j7uGn > div._11Y_VZ > div.flex.justify-center.items-center > div.flex.items-center._3oXgUo > button > div').innerText;

      let shop = document.querySelector('#module_seller_info > div > div.seller-name-retail > div.seller-name__wrapper > div.seller-name__detail > a').innertText;

      let rating = document.querySelector('#module_product_review > div > div > div:nth-child(1) > div.mod-rating > div > div > div.summary > div.score > span.score-average').innerText;
      
      return {
        title,
        normalPrice,
        discountPrice,
        shop,
        rating
      }
  });
    browser.close();
    return result;
};

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

scrape().then((value) => {
    console.log(value); // Success!
})