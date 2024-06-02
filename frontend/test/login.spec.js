const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe("Login test", function () {
    this.timeout(30000); // Set a longer timeout

    it("should login successfully", async function () {
        let driver;
        try {
            let options = new chrome.Options();
            options.addArguments('--headless'); // Run in headless mode
            options.addArguments('--no-sandbox'); // Needed if running as root
            options.addArguments('--disable-dev-shm-usage'); // Overcome limited resource problems

            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build();

            await driver.get("https://itstore-main-fe-omj2.onrender.com/");
            await driver.findElement(By.linkText('Login')).click();
            let pageURL = await driver.getCurrentUrl();
            console.log("URL_Page he:", pageURL);

            await driver.findElement(By.id('email')).sendKeys('test@test.test');
            await driver.findElement(By.id('password')).sendKeys('test123');
            await driver.findElement(By.css('.btn')).click();

            // Wait for the alert to appear
            await driver.wait(until.alertIsPresent(), 2000);

            // Switch to the alert and accept it
            const alert = await driver.switchTo().alert();
            await alert.accept();
            console.log('Handled unexpected alert: "Login successfully!"');

            // Wait for the URL to change
            await driver.wait(until.urlIs('https://itstore-main-fe-omj2.onrender.com/'), 2000);

            const currentUrl = await driver.getCurrentUrl();
            assert.strictEqual(currentUrl, 'https://itstore-main-fe-omj2.onrender.com/', 'Expected URL does not match actual URL');
        } finally {
            if (driver) {
                await driver.quit();
            }
        }
    });
});
