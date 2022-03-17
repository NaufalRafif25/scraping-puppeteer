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