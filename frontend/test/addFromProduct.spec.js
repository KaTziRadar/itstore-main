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
        
        await driver.sleep(1000); // Add delay to observe page loading

        await driver.findElement(By.linkText('Product')).click();

        //get the number of the cart items 
        const cartIcon = await driver.findElement(By.className('cart'));
        const initialCartCount = await cartIcon.getText();

        await driver.sleep(1000);
        await driver.findElement(By.className('text-sky-400 px-2 py-1 border border-sky-400 rounded-md hover:bg-sky-400 hover:text-sky-50 duration-300')).click();
        await driver.findElement(By.className("bg-sky-500 text-sky-50 px-2 py-1 mt-4")).click();
        await driver.sleep(1500);

        const finalCartCount = await cartIcon.getText();
        assert.strictEqual(parseInt(finalCartCount), parseInt(initialCartCount) + 1, 'Item was not added to cart successfully');

    });
});