const { Builder, By, until, Browser } = require('selenium-webdriver');
const assert = require('assert');

describe("NavBar test", function () {
    this.timeout(100000);
    it("NavBar", async function () {

        let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

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