const login = require('./login');
const scrapeData = require('./scrapeData');

const urlLogin = "https://www.scrapethissite.com/pages/advanced/?gotcha=login"
const urlFetchData = "https://www.scrapethissite.com/pages/forms/"
const searchTerm = "New York Rangers"
const email = 'john_snow@test.com'
const password = 'myWatchHasEnded'

async function main() {
    console.log("Starting Login...");
    let success = await login.login(urlLogin, email, password);
    console.log("Login status: ", success)
    console.log("Starting Scrap Data...");
}

main();