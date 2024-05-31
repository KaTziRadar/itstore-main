const { Builder, By, until, Browser } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe("Decrease from cart test", function() {
    this.timeout(30000); // Set a longer timeout

    let driver;

    beforeEach(async function() {
        let options = new chrome.Options();
        options.addArguments('--headless'); // Run in headless mode
        options.addArguments('--no-sandbox'); // Needed if running as root
        options.addArguments('--disable-dev-shm-usage'); // Overcome limited resource problems

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

    it("should decrease item in cart", async function() {
        await driver.get('https://itstore-main-fe-omj2.onrender.com/');
        await driver.sleep(1000); // Add delay to observe page loading

        const productLink = await driver.wait(until.elementLocated(By.linkText('Product')), 10000);
        await productLink.click();

        const addToCartButton = await driver.wait(until.elementLocated(By.className('bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md')), 5000);
        await addToCartButton.click();

        const cartLink = await driver.wait(until.elementLocated(By.className('cart')), 10000);
        await cartLink.click();

        await driver.sleep(1000); // Add delay to observe navigation to cart page

        const cartIcon = await driver.findElement(By.className('cart'));
        const initialCartCount = await cartIcon.getText();

        const decreaseButton = await driver.wait(until.elementLocated(By.className('decrease')), 10000);
        await decreaseButton.click();

        await driver.sleep(1000); // Add delay to ensure cart count is updated

        const finalCartCount = await cartIcon.getText();
        assert.strictEqual(parseInt(finalCartCount), parseInt(initialCartCount) - 1, 'Item was not removed from cart successfully');
    });
});
