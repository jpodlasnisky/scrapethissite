const pup = require('puppeteer')
const cheerio = require('cheerio')
const fs = require('fs')

const data = [];
const list = [];

async function scrapeData(url, searchFor) {
     // Open browser and show it then create a new page
     const browser = await pup.launch({headless: false});
     const page = await browser.newPage();

     // Go to the url and wait for the selector to be loaded
    await page.goto(url);

    try{
        await page.waitForSelector('#q.form-control');

        // fill the form with the search term
        await page.type('#q.form-control', searchFor);

        // wait for the search button to be loaded and click it
        await Promise.all([
            page.waitForNavigation(),
            page.click('.btn.btn-primary')
        ]);
    } catch (error) {
        console.error('Unable to find the search form - verify url and selectors');
        browser.close();
        return false;
    }

    // load table to cheerio
    const $ = cheerio.load(await page.content());
    const table = $('.table');

    // loop through the table and push the data to the data array
    $('.team', table).each((i, row) => {
        const rowData = [];
        $('td', row).each((j, cell) => {
            
            rowData.push($(cell).text().trim());
        });
        data.push(rowData);
    });

    // loop through the data array and push the data to the list array
    data.forEach(function(info) {
        const obj = {};
        obj.team = info[0];
        obj.year = info[1];
        obj.wins = info[2];
        list.push(obj);
    })

    const json = JSON.stringify(list);
    fs.writeFile('data.json', json, 'utf8', (err) => {
        if(err) {
            console.log("Error to save file: ",err);
        }
    });


    // wait 3 seconds and close the browser
    await page.waitForTimeout(3000);
    await browser.close();

    return true;
}

module.exports = {scrapeData};