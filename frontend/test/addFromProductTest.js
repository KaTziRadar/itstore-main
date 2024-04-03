const { Builder, By, until, Browser } = require('selenium-webdriver');
const assert = require('assert');

describe("add from product details test", async function() {
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

        await driver.findElement(By.linkText('More Info')).click();
        
        const addToCartButton = await driver.wait(until.elementLocated(By.id('add')), 10000);
        await addToCartButton.click();

        const finalCartCount = await cartIcon.getText();
        await driver.sleep(3000);
        assert.strictEqual(parseInt(finalCartCount), parseInt(initialCartCount) + 1, 'Item was not added to cart successfully');
    });
});
