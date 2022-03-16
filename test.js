const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    await page.goto('https://shopee.co.id/');

    await page.waitForSelector('div.home-popup');            // wait object load
    const link = await page.$('.home-popup__close-button');             // declare object

    const newPagePromise = new Promise(x => page.once('popup', x));

    await link.click();                        // click, a new tab  opens
    const newPage = await newPagePromise; 
    await newPage.close();             // close it, for example

    // const xPathRandom = '/html[1]/body[1]';
    // const element = (await page.$x(xPathRandom))[0];
    // element.click();
    // await page.waitForXPath(xPathRandom);

    // home-popup__close-button
    // await page.waitForSelector('.home-popup')
    // await page.click('.shopee-popup__close-btn');
    await autoScroll(page);
    await page.waitFor(6000);
    // Scrape
    
    const result = await page.evaluate(()=> {
        let data = [];
        let elements = document.querySelectorAll('._2x8AVA');

        for (var element of elements) {
            let picture = element.querySelector('._25_r8I ggJllv > img').getAttribute('src');
            let title = element.querySelector('._10Wbs- _3IqNCf').innerText;
            let price = element.querySelector('._19hRcI').innerText;
            let link = element.querySelector('._2x8AVA > a').getAttribute('href');
            data.push({picture, title, price, link});
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