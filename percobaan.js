const puppeteer = require('puppeteer');

let scrape = async () => {
    // return 'test';
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    await page.goto('https://www.tokopedia.com/');
    await autoScroll(page);
    await page.waitFor(3000);
    // Scrape
    
    const result = await page.evaluate(()=> {
        let title = document.querySelector('[data-testid="lblHomeProductNameRecom"]').innerText;
        let price = document.querySelector('[data-testid="lblHomeProductPriceRecom"]').innerText;
        
        return {
            title,
            price
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