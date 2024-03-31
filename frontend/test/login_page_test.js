const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');


describe("Login test", function() {
    it("should login successfully", async function(done) { 
        let driver = await new Builder().forBrowser('chrome').build();

        try {
            await driver.get("http://localhost:3000/");
            await driver.findElement(By.linkText('Login')).click();
            let pageURL = await driver.getCurrentUrl();
            console.log("URL_Page he:", pageURL);

            await driver.findElement(By.id('email')).sendKeys('asd@asd.asd');
            await driver.findElement(By.id('password')).sendKeys('asd');
            await driver.findElement(By.css('.btn')).click();

            await driver.wait(until.urlIs('http://localhost:3000/'), 5000);

            const currentUrl = await driver.getCurrentUrl();
            assert.equal(currentUrl, 'http://localhost:3000/', 'Expected URL does not match actual URL');

            try {
                

            } catch (error) {
                if (error.name === 'UnexpectedAlertOpenError') {
                    await driver.switchTo().alert().dismiss(); 
                    console.log('Got unexpected alert, dismissed it.');
                } else {
                    console.error('Error:', error);
                }
            }
        } finally {
            await driver.quit();
        }

        setTimeout(done, 100); 
    });
});
