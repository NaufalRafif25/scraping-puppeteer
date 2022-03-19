const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    // Configure the navigation timeout
    await page.goto('https://www.lazada.co.id/', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    });

    await page.goto('https://www.lazada.co.id/');
    await autoScroll(page);
    await page.waitFor('div.card-jfy-item-wrapper');
    
    //  ===== Scrape
    const result = await page.evaluate(()=> {
        let data = [];
        let elements = document.querySelectorAll('div.card-jfy-item-wrapper');

        for (var element of elements) {
            let image = element.querySelector('.card-jfy-image > img').getAttribute('src');
            let title = element.querySelector('.card-jfy-title').innerText;
            let price = element.querySelector('.hp-mod-price-first-line > .price').innerText;
            let link = element.querySelector('.card-jfy-li-content').getAttribute('href');
            data.push({image,title, price, link});
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