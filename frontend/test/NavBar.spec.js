const { Builder, By, until, Browser } = require('selenium-webdriver');
const assert = require('assert');

describe("NavBar test", function () {
    this.timeout(100000);
    it("NavBar", async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        await driver.get('http://localhost:3000/');
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
        assert.equal(currentUrl, 'http://localhost:3000/', 'Expected URL does not match actual URL');
        await driver.quit();

    });

});