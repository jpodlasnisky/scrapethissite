const pup = require('puppeteer');
const cheerio = require('cheerio');

const url = "https://www.scrapethissite.com/pages/advanced/?gotcha=login"
const email = 'john_snow@test.com'
const password = 'myWatchHasEnded'

async function login(){

    // Open browser and show it then create a new page
    const browser = await pup.launch({headless: false});
    const page = await browser.newPage();

    // Go to the url and wait for the selector to be loaded
    await page.goto(url);
    await page.waitForSelector('.form');

    // fill the form with the login data
    await page.type('input[name="user"]', email);
    await page.type('input[name="pass"]', password);

    // click the button and navigate to the next page
    await Promise.all([
        page.waitForNavigation(),
        page.click('.btn.btn-primary')
    ]);

    // wait 3 seconds then close the browser
    await page.waitForTimeout(3000);
    await browser.close();
}
login();