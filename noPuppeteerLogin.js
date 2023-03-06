const request = require("request-promise").defaults({ jar: true });
const cheerio = require("cheerio");



const urlLogin = "https://www.scrapethissite.com/pages/advanced/?gotcha=login"
const email = 'john_snow@test.com'
const password = 'myWatchHasEnded'

async function login() {
    const loginResult = await request.post(
        urlLogin,
        {
            form: {
                user: email,
                pass: password,
                csrf: ""
            },
            followAllRedirects: true
        }
    );
    const $ = cheerio.load(loginResult);
    const success = $("body").text().includes("Successfully logged in! Nice job :)");
    

    return success;

}

login()
