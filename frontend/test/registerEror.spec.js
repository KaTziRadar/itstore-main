const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe("register error test", function() {
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
        await driver.quit();
    });

    it("Email already exists alert", async function() {
        this.timeout(5000);
        await driver.get('https://itstore-main-fe-omj2.onrender.com/');
        await driver.sleep(1000); // Add delay to observe page loading

        const registerLink = await driver.wait(until.elementLocated(By.linkText('Register')));
        await registerLink.click();

        const emailInput = await driver.wait(until.elementLocated(By.id('email')));
        await emailInput.sendKeys('a@gmail.com');

        const passwordInput = await driver.wait(until.elementLocated(By.id('password')));
        await passwordInput.sendKeys('123123');

        const confirmPasswordInput = await driver.wait(until.elementLocated(By.id('cnfrm-password')));
        await confirmPasswordInput.sendKeys('123123');
        await driver.sleep(1000);

        const registerButton = await driver.wait(until.elementLocated(By.className('btn')));
        await registerButton.click();
        await driver.sleep(1000);

        const errorMsg = await driver.findElement(By.id('message'));
        const msgValue = await errorMsg.getText();
        assert.strictEqual(msgValue, 'Email already exists', 'Expected error does not match actual error');
    });

    it("Empty fields alert", async function() {
        this.timeout(5000);
        await driver.get('https://itstore-main-fe-omj2.onrender.com/');
        await driver.sleep(1000); // Add delay to observe page loading

        await driver.findElement(By.linkText("Register")).click();
        const registerButton = await driver.wait(until.elementLocated(By.className('btn')));
        await registerButton.click();
        await driver.sleep(1000);

        const errorMsg = await driver.findElement(By.id('message'));
        const msgValue = await errorMsg.getText();
        assert.strictEqual(msgValue, "Error! fields can't be empty", 'Expected error does not match actual error');
    });

    it("Password does not match alert", async function() {
        this.timeout(5000);
        await driver.get('https://itstore-main-fe-omj2.onrender.com/');
        await driver.sleep(1000); // Add delay to observe page loading

        await driver.findElement(By.linkText('Register')).click();

        await driver.findElement(By.id('email')).sendKeys('abcns@gmail.com');
        await driver.findElement(By.id('password')).sendKeys('123123');
        await driver.findElement(By.id('cnfrm-password')).sendKeys('12312344');
        await driver.findElement(By.className('btn')).click();
        await driver.sleep(2000);

        const errorMsg = await driver.findElement(By.id('message'));
        const msgValue = await errorMsg.getText();
        assert.strictEqual(msgValue, 'Error! passwords not match', 'Expected error does not match actual error');
    });

    it("Email is invalid alert", async function() {
        this.timeout(5000);
        await driver.get('https://itstore-main-fe-omj2.onrender.com/');
        await driver.sleep(1000); // Add delay to observe page loading

        await driver.findElement(By.linkText('Register')).click();

        await driver.findElement(By.id('email')).sendKeys('test.test');
        await driver.findElement(By.id('password')).sendKeys('123123');
        await driver.findElement(By.id('cnfrm-password')).sendKeys('123123');
        await driver.findElement(By.className('btn')).click();

        const errorMsg = await driver.findElement(By.id('message'));
        const msgValue = await errorMsg.getText();
        assert.strictEqual(msgValue, 'Error! email is invalid', 'Expected error does not match actual error');
    });
});
