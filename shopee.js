const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://shopee.co.id/', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    });

    
    await page.goto('https://shopee.co.id/');
    await page.waitFor(1000);

    await page.evaluate(() => {
        document.querySelector("#main > div > div:nth-child(3) > div.home-page > shopee-banner-popup-stateful").shadowRoot.querySelector("div > div > div > div > div").click();
       })

    await autoScroll(page);
    await page.waitFor(6000);
    // Scrape
    
    const result = await page.evaluate(()=> {
        let data = [];
        // 
        let elements = document.querySelectorAll('#main > div > div._193wCc._3cVWns > div.home-page > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1)');

        for (var element of elements) {
            // let picture = element.querySelector('._25_r8I ggJllv > img').getAttribute('src');
            // let title = element.querySelector('._10Wbs- _3IqNCf').innerText;
            // let price = element.querySelector('._19hRcI').innerText;
            // let link = element.querySelector('._2x8AVA > a').getAttribute('href');

            // let image = element.querySelector('#main > div > div._193wCc._3cVWns > div.home-page > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1) > a > div > div > div._25_r8I.ggJllv > img').getAttribute('src');

            let link = element.querySelector('#main > div > div._193wCc._3cVWns > div.home-page > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1) > a').getAttribute("https://shopee.co.id/"+'href');

            // let title = element.querySelector('#main > div > div._193wCc._3cVWns > div.home-page > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1) > a > div > div > div._2x8wqR > div._3GAFiR > div > div').innerText;

            // let price = element.querySelector('#main > div > div._193wCc._3cVWns > div.home-page > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div:nth-child(1) > a > div > div > div._2x8wqR > div._7rV1tW._3_FVSo > div.zp9xm9._2Dfuwn > span._19hRcI').innerText;

            data.push({link});
        }
        return data;
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