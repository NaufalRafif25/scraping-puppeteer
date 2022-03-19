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
    await page.waitForSelector("#main > div > div:nth-child(3) > div.home-page > shopee-banner-popup-stateful");

    // ===== Close popup
    await page.evaluate(() => {
        document.querySelector("#main > div > div:nth-child(3) > div.home-page > shopee-banner-popup-stateful").shadowRoot.querySelector("div > div > div > div > div").click();
       })
    //  ===== End popup

    await autoScroll(page);
    await page.waitFor(6000);
    
    // ===== Scrape
    const result = await page.evaluate(()=> {
        let data = [];
        let elements = document.querySelectorAll('div._2x8AVA');

        for (var element of elements) {
            let image = element.querySelector('._25_r8I.ggJllv > img').getAttribute('src');
            let link = "https://shopee.co.id/"+element.querySelector('._2x8AVA').getAttribute('href');
            // let title = element.querySelector('._10Wbs-_3IqNCf').innerText;
            // let price = element.querySelector('span._19hRcI').innerText;

            data.push({image, link});
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