const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // loading page
    await page.goto('https://shopee.co.id/', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    });
    // await page.goto('https://shopee.co.id/');
    // await page.waitForSelector("#main > div > div:nth-child(3) > div.home-page > shopee-banner-popup-stateful");
    await page.waitFor(5000);

    // ===== Close popup
    await page.evaluate(() => {
        document.querySelector("#main > div > div:nth-child(4) > div > div > shopee-banner-popup-stateful").shadowRoot.querySelector("div > div > div > div > div").click();
       });
       await page.waitFor(5000);
    //  ===== End popup

    await autoScroll(page);

    // ===== click item to the page
    // await page.focus('#main > div > div:nth-child(4) > div > div > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1) > a');
    await page.waitFor(3000);
    await page.waitForSelector('#main > div > div:nth-child(4) > div > div > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1)');
    await page.click('#main > div > div:nth-child(4) > div > div > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1) > a');
    await page.waitFor(10000);
    // ===== End

    await autoScroll(page);
    await page.waitFor(5000);

    // Scrape
    const result = await page.evaluate(()=> {
      let title = document.querySelector('#main > div > div:nth-child(3) > div._3A8xof > div > div.page-product > div.container > div.product-briefing.flex.card._1j7uGn > div.flex.flex-auto._3qq4y7 > div > div._3g8My- > span').innerText;

      let normalPrice = document.querySelector('#main > div > div:nth-child(3) > div._3A8xof > div > div.page-product > div.container > div.product-briefing.flex.card._1j7uGn > div.flex.flex-auto._3qq4y7 > div > div:nth-child(3) > div > div > div > div > div._2Csw3W').innerText;

    // let normalPrice = document.querySelector('#main > div > div:nth-child(3) > div._3A8xof > div > div.page-product > div.container > div.product-briefing.flex.card._1j7uGn > div.flex.flex-auto._3qq4y7 > div > div:nth-child(3) > div > div > div > div > div > div._2v0Hgx').innerText;

      let discountPrice = document.querySelector('#main > div > div:nth-child(3) > div._3A8xof > div > div.page-product > div.container > div.product-briefing.flex.card._1j7uGn > div.flex.flex-auto._3qq4y7 > div > div:nth-child(3) > div > div > div > div > div.flex.items-center > div._2v0Hgx').innerText;

      let favorite = document.querySelector('#main > div > div:nth-child(3) > div._3A8xof > div > div.page-product > div.container > div.product-briefing.flex.card._1j7uGn > div._11Y_VZ > div.flex.justify-center.items-center > div.flex.items-center._3oXgUo > button > div').innerText;

      let shop = document.querySelector('#main > div > div:nth-child(3) > div._3A8xof > div > div.page-product > div.container > div.S_agbT > div.X-Jp7y.page-product__shop > div._3PlYLN > div > div._1wVLAc').innertText;

      let rating = "Penilaian "+document.querySelector('#main > div > div:nth-child(3) > div._3A8xof > div > div.page-product > div.container > div.S_agbT > div.X-Jp7y.page-product__shop > div._3n5HPy > div:nth-child(1) > button > span').innerText;
      
      return {
        title,
        normalPrice,
        discountPrice,
        favorite,
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