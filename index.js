const pup = require('puppeteer')
const cheerio = require('cheerio')

const url = "https://www.scrapethissite.com/pages/forms/"
const searchFor = "New York Rangers"

async function scrapeData() {
     // Open browser and show it then create a new page
     const browser = await pup.launch({headless: false});
     const page = await browser.newPage();

     // Go to the url and wait for the selector to be loaded
    await page.goto(url);
    await page.waitForSelector('#q.form-control');

    // fill the form with the search term
    await page.type('#q.form-control', searchFor);

    // wait for the search button to be loaded and click it
    await Promise.all([
        page.waitForNavigation(),
        page.click('.btn.btn-primary')
    ]);

    // load table to cheerio
    const $ = cheerio.load(await page.content());
    const table = $('.table');
    console.log(table.html());


    // wait 3 seconds and close the browser
    await page.waitForTimeout(3000);
    await browser.close();
}

scrapeData()