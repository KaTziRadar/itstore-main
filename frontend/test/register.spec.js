const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe("register test", function() {
    let driver;

    // Hook to setup WebDriver instance before tests
    beforeEach(async function() {
        let options = new chrome.Options();
        options.addArguments('--headless'); // Run in headless mode
        options.addArguments('--no-sandbox'); // Needed if running as root
        options.addArguments('--disable-dev-shm-usage'); // Overcome limited resource problems

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    // Hook to close WebDriver instance after tests
    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it("register test", async function() {
        await driver.get('https://itstore-main-fe-omj2.onrender.com/');

        const registerLink = await driver.wait(until.elementLocated(By.linkText('Register')));
        await registerLink.click();

        const emailInput = await driver.wait(until.elementLocated(By.id('email')));
        await emailInput.sendKeys('test@test.test');

        const passwordInput = await driver.wait(until.elementLocated(By.id('password')));
        await passwordInput.sendKeys('test123');

        const confirmPasswordInput = await driver.wait(until.elementLocated(By.id('cnfrm-password')));
        await confirmPasswordInput.sendKeys('test123');

        const registerButton = await driver.wait(until.elementLocated(By.className('btn')));
        await registerButton.click();

        // Wait for the alert to appear
        await driver.wait(until.alertIsPresent());

        // Switch to the alert and accept it
        const alert = await driver.switchTo().alert();
        await alert.accept();
        
        // Delete the user for the next test
        await driver.findElement(By.id('email')).sendKeys('test@test.test');
        await driver.findElement(By.id('password')).sendKeys('test123');
        await driver.findElement(By.css('.btn')).click();
      
        // Wait for the alert to appear
        await driver.wait(until.alertIsPresent());

        // Switch to the alert and accept it
        const alert2 = await driver.switchTo().alert();
        await alert2.accept();
        
        await driver.sleep(1000)
        await driver.findElement(By.linkText('Delete User')).click();
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'https://itstore-main-fe-omj2.onrender.com/login', 'Expected URL does not match actual URL');
    });
});
