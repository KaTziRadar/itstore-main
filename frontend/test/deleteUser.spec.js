const assert = require('assert');
const { Builder, By, until, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe("Delete user test", function() {
    this.timeout(100000); // Increase timeout to 60 seconds

    let driver;

    beforeEach(async function() {
        let options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');

        driver = await new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeOptions(options)
            .build();
    });

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it("delete user successfully", async function() {
        await driver.get('https://itstore-main-fe-omj2.onrender.com/');
    
        await driver.findElement(By.linkText('Register')).click();
        await driver.findElement(By.id('email')).sendKeys('test@test.test');
        await driver.findElement(By.id('password')).sendKeys('test123');
        await driver.findElement(By.id('cnfrm-password')).sendKeys('test123');
    
        const registerButton = await driver.wait(until.elementLocated(By.className('btn')));
        await registerButton.click();
    
        // Wait for the alert to appear
        await driver.wait(until.alertIsPresent());
        let alert = await driver.switchTo().alert();
        await alert.accept();
    
        // Login for the user we want to delete 
        await driver.findElement(By.id('email')).sendKeys('test@test.test');
        await driver.findElement(By.id('password')).sendKeys('test123');
        await driver.findElement(By.css('.btn')).click();
    
        // Wait for the alert to appear
        await driver.wait(until.alertIsPresent());
        alert = await driver.switchTo().alert();
        await alert.accept();
    
        // Press the delete user button 
        await driver.findElement(By.linkText('Delete User')).click();
    
        // Wait for the alert to appear
        const msg = await driver.wait(until.alertIsPresent()).then(async () => {
            alert = await driver.switchTo().alert();
            const alertText = await alert.getText();
            await alert.accept();
            return alertText;
        });
    
        assert.equal(msg, 'User deleted successfully!', 'Expected error does not match actual error');
    });
    

});
