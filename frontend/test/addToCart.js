const { Builder, By, until, Browser } = require('selenium-webdriver');
const assert = require('assert');

describe("register test", async function() {
    this.timeout(20000); // Set a longer timeout

    let driver;

    beforeEach(async function() {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
    });

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it("should add item to cart", async function() {
        await driver.get('http://localhost:3000/');
        await driver.sleep(1000); // Add delay to observe page loading

        const productLink = await driver.wait(until.elementLocated(By.linkText('Product')));
        await productLink.click();

        await driver.sleep(1000); // Add delay to observe navigation to product page

        const cartIcon = await driver.findElement(By.className('cart'));
        const initialCartCount = await cartIcon.getText();

        const addToCartButton = await driver.wait(until.elementLocated(By.className('bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md')), 10000);
        await addToCartButton.click();

        await driver.wait(async function() {
            const currentCartCount = await cartIcon.getText();
            return currentCartCount !== initialCartCount;
        }, 5000);

        const finalCartCount = await cartIcon.getText();
        assert.strictEqual(parseInt(finalCartCount), parseInt(initialCartCount) + 1, 'Item was not added to cart successfully');
    });
});
