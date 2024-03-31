const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe("register test", function() {
    this.timeout(20000); // Set a longer timeout, e.g., 20 seconds

    it("register test", function() { // No need for async function declaration
        return new Promise(async (resolve, reject) => { // Return a Promise
            let driver;
            try {
                driver = await new Builder().forBrowser('chrome').build();

                await driver.get('http://localhost:3000/');

                const registerLink = await driver.wait(until.elementLocated(By.linkText('Register')));
                await registerLink.click();

                const emailInput = await driver.wait(until.elementLocated(By.id('email')));
                await emailInput.sendKeys('abcd@gmail.com');

                const passwordInput = await driver.wait(until.elementLocated(By.id('password')));
                await passwordInput.sendKeys('123123');

                const confirmPasswordInput = await driver.wait(until.elementLocated(By.id('cnfrm-password')));
                await confirmPasswordInput.sendKeys('123123');

                const registerButton = await driver.wait(until.elementLocated(By.className('btn')));
                await registerButton.click();

                // Wait for the alert to appear
                await driver.wait(until.alertIsPresent());

                // Switch to the alert and accept it
                const alert = await driver.switchTo().alert();
                await alert.accept();

                await driver.wait(until.urlIs('http://localhost:3000/login'));

                const currentUrl = await driver.getCurrentUrl();
                assert.equal(currentUrl, 'http://localhost:3000/login', 'Expected URL does not match actual URL');

                resolve(); // Resolve the Promise to indicate the test is complete
            } catch (error) {
                reject(error); // Reject the Promise with the error
            } finally {
                if (driver) {
                    await driver.quit();
                }
            }
        });
    });
});
