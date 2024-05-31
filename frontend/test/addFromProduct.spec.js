const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe("Add product from categories test", function() {
    this.timeout(30000); // Set a longer timeout

    let driver;

    beforeEach(async function() {
        let options = new chrome.Options();
        options.addArguments('--headless'); // Run in headless mode
        options.addArguments('--no-sandbox'); // Needed if running as root
        options.addArguments('--disable-dev-shm-usage'); // Overcome limited resource problems

        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it("should add a product from categories", async function() {
        await driver.get('https://itstore-main-fe-omj2.onrender.com/');
        
        // Wait for the page to load and the element to be present
        await driver.wait(until.elementLocated(By.linkText('Product')), 10000);
        await driver.findElement(By.linkText('Product')).click();

        // Wait for the cart icon to be present and visible
        const cartIcon = await driver.wait(until.elementLocated(By.className('cart')), 10000);
        const initialCartCount = await cartIcon.getText();

        // Add delay to observe page loading (could be replaced with better waits if necessary)
        await driver.sleep(1000);
        await driver.findElement(By.className('text-sky-400 px-2 py-1 border border-sky-400 rounded-md hover:bg-sky-400 hover:text-sky-50 duration-300')).click();
        await driver.findElement(By.className("bg-sky-500 text-sky-50 px-2 py-1 mt-4")).click();

        // Wait for the cart count to update
        await driver.sleep(1500);
        const finalCartCount = await cartIcon.getText();

        // Validate the cart count
        assert.strictEqual(parseInt(finalCartCount), parseInt(initialCartCount) + 1, 'Item was not added to cart successfully');
    });
});
