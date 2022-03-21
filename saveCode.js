// Require puppeteer
const puppeteer = require('puppeteer');

(async () => {
    // Create an instance of the chrome browser
    // But disable headless mode !
    const browser = await puppeteer.launch({
        headless: false
    });

    // Create a new page
    const page = await browser.newPage();

    // Configure the navigation timeout
    await page.goto('https://ourcodeworld.com', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    });

    // Navigate to some website e.g Our Code World
    await page.goto('http://ourcodeworld.com');
})();

// const xPathRandom = '/html[1]/body[1]';
    // const element = (await page.$x(xPathRandom))[0];
    // element.click();
    // await page.waitForXPath(xPathRandom);

    // home-popup__close-button
    // await page.waitForSelector('.home-popup')
    // await page.click('.shopee-popup__close-btn');

    // we find the Login btn using the innerText comparison because the selector used for the btn might be unstable
await page.evaluate(() => {
    const btns = [...document.querySelector('.HmktE').querySelectorAll('button')]
    btns.forEach(function (btn) {
     if (btn.innerText === 'Log In') { btn.click() }
    })
   })

//    get page title and url
const puppeteer = require('puppeteer')

describe("Home Page TestSuite",()=>{
     it("Handle Input and buuton in puppeteer",async()=>{
    const browser = await puppeteer.launch({
      headless:false,
      slowMo:100
    })
    const page = await browser.newPage()
    await page.goto("https://devexpress.github.io/testcafe/example/");
    const title = await page.title();
    const url = await page.url(); 
    
    console.log("Page Title : "+title);
    console.log("Page URL : "+url);
    
    await page.waitFor(5000);
    await page.close();

  });

    });