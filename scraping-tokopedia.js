const puppeteer = require('puppeteer');

let scrape = async () => {
    // return 'test';
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    await page.goto('https://www.tokopedia.com/');
    // Scrape
    
    const result = await page.evaluate(()=> {
        let data = [];
        let elements = document.querySelectorAll('div > section > div > div > div > div > div > div > div:nth-childe(2)');

        for (var element of elements) {
            // let gambar = element.querySelector('.success fade').innerText;
            // let nama = element.querySelector('.css-1b6t4dn').innerText;
            let nama = element.childNodes[7].children[0].innerText;
            // let harga= element.querySelector('.css-1ksb19c').innerText;
            // let link = element.querySelector('.pcv3__info-content css-gwkf0u').innerText;
            // data.push({gambar, nama, harga, link});
            data.push({nama});
        }
        
        return data;
    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); // Success!
})