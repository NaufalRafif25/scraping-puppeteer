const puppeteer = require('puppeteer');

async function getPic() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
    });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    const result = await page.screenshot({path: 'google.png'});
    await page.setViewport({width: 1000, height: 500})

    await page.evaluate(() => {});
    // await page.evaluate(()  => alert('this message is inside an alert box'))

    // const jsdom = require('jsdom');
    // const pageContent = await page.content();
    // const dom = new jsdom.JSDOM(pageContent);
    // const divs = dom.window.document.querySelectorAll('div');

    await browser.close();
}   

getPic();