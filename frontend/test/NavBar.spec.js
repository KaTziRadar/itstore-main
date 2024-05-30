const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let options = new chrome.Options();
options.setChromeBinaryPath('/path/to/google-chrome');

let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

describe("NavBar test", function () {
    this.timeout(100000);
    it("NavBar", async function () {

        let options = new chrome.Options();
        options.addArguments('headless');

        await driver.get('https://itstore-main-fe-omj2.onrender.com/');
        await driver.sleep(1000); // Add delay to observe page loading

        await driver.findElement(By.linkText('About')).click();
        await driver.sleep(1000);
        await driver.findElement(By.linkText('Product')).click();
        await driver.sleep(1000);
        await driver.findElement(By.linkText('Login')).click();
        await driver.sleep(1000)
        await driver.findElement(By.linkText('Register')).click();
        await driver.sleep(1000);
        await driver.findElement(By.linkText('Stav')).click();
        await driver.sleep(1000);
        await driver.findElement(By.linkText('Adar')).click();
        await driver.sleep(1000);
        await driver.findElement(By.linkText('Ido')).click();
        await driver.sleep(1000);
        await driver.findElement(By.className('cart')).click();
        await driver.sleep(1000);
        await driver.findElement(By.linkText('Home')).click();
        await driver.sleep(1000);

        const currentUrl = await driver.getCurrentUrl();
        assert.equal(currentUrl, 'https://itstore-main-fe-omj2.onrender.com/', 'Expected URL does not match actual URL');
        await driver.quit();

    });

});