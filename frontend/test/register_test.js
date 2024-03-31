const { Builder, By, Key, until } = require('selenium-webdriver');


describe("register test", function() {
    it("register test", async function() {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://localhost:3000/');
            await driver.findElement(By.linkText('register')).click();
            await driver.findElement(By.id('email')).sendKeys('s@gmail.com');
            await driver.findElement(By.id('password')).sendKeys('123123');
            await driver.findElement(By.name('cnfrm-password')).sendKeys('123123');
            await driver.findElement(By.className('btn')).click();

            await driver.wait(until.urlIs('http://localhost:3000/login'), 3000);

            const currentUrl = await driver.getCurrentUrl();
            assert.equal(currentUrl, 'http://localhost:3000/login', 'Expected URL does not match actual URL');
        } finally {
            await driver.quit();
        }
    });
});