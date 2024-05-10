const { Builder, By, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/firefox');
const assert = require('assert');

describe("add product from categories test", function() {
    this.timeout(100000); // Set a longer timeout

    let driver;

    beforeEach(async function() {
        let options = new Options();
        options.addArguments("--headless");

        driver = await new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();
    });


    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it("add product from categories test", async function() {
        await driver.get('http://localhost:3000/');
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
