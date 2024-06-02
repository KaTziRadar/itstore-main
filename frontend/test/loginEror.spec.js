const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe("Login Error test", function () {
    let driver;

    // Hook to setup WebDriver instance before tests
    beforeEach(async function () {
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
    afterEach(async function () {
        await driver.quit();
    });

    it("Empty fields", async function () {
        this.timeout(5000);
        await driver.get("https://itstore-main-fe-omj2.onrender.com/");
        await driver.findElement(By.linkText('Login')).click();
        await driver.findElement(By.css('.btn')).click();
        await driver.sleep(1000);

        const errorMsg = await driver.findElement(By.id('message'));
        const msgValue = await errorMsg.getText();

        assert.strictEqual(msgValue, "Error! fields can't be empty", 'Expected Error does not match actual Error');
    });

    it("Email not valid", async function () {
        this.timeout(5000);
        await driver.get("https://itstore-main-fe-omj2.onrender.com/");
        await driver.findElement(By.linkText('Login')).click();
        await driver.findElement(By.id('email')).sendKeys('test@.test');
        await driver.findElement(By.id('password')).sendKeys('test123');
        await driver.findElement(By.css('.btn')).click();
        await driver.sleep(1000);

        const errorMsg = await driver.findElement(By.id('message'));
        const msgValue = await errorMsg.getText();

        assert.strictEqual(msgValue, "Error! email is invalid", 'Expected Error does not match actual Error');
    });

    it("Password not correct", async function () {
        this.timeout(5000);
        await driver.get("https://itstore-main-fe-omj2.onrender.com/");
        await driver.findElement(By.linkText('Login')).click();

        await driver.findElement(By.id('email')).sendKeys('a@gmail.com');
        await driver.findElement(By.id('password')).sendKeys('test123');
        await driver.findElement(By.css('.btn')).click();
        await driver.sleep(1000);

        const erorMsg = await driver.findElement((By.id('message')));
        const msgValue = await erorMsg.getText();

        assert.equal(msgValue, "Password is incorrect", 'Expected Eror does not match actual Eror');
    });
});
