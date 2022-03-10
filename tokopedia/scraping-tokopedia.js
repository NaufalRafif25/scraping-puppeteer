const puppeteer = require('puppeteer');

let scrape = async () => {
    // return 'test';
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    await page.goto('https://www.tokopedia.com/');
    await autoScroll(page);
    await page.waitFor(6000);
    // unique id button btnHomeRecomLoadMore
    // Scrape
    
    const result = await page.evaluate(()=> {
        let data = [];
        let elements = document.querySelectorAll('[data-testid="divProduct"]');

        for (var element of elements) {
            let picture = element.querySelector('[data-testid="imgHomeProductRecom"] > img').getAttribute('src');
            let title = element.querySelector('[data-testid="lblHomeProductNameRecom"]').innerText;
            let price = element.querySelector('[data-testid="lblHomeProductPriceRecom"]').innerText;
            let link = element.querySelector('.css-zimbi > a').getAttribute('href');
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