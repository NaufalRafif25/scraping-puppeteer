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
        /// Jangan gunakan selector yang mengandung div._193wCc._3cVWns ( element class acak )
        /// Ubah dengan div:nth-child(i), dimana i adalah posisi element yang ingin di scrape
        let elements = document.querySelectorAll('#main > div > div:nth-child(3) > div.home-page > div.container > div.section-below-the-fold > div.section-recommend-products-wrapper > div > div > div.stardust-tabs-panels > section:nth-child(1) > div > div');
        
        for (var element of elements) {
            let image = element.querySelector('a > div > div > div > img');

            /// Cek kondisi jika image tidak ada
            /// kemarin error disini, image nya null tapi kamu masih mau akses
            if(image == null) continue;
            let imageUrl = image.getAttribute('src');
            
            data.push({imageUrl});
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