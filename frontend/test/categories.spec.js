const { Builder, By, until, Browser } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe("Product categories test", function() {
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

    it("product categories", async function() {
        await driver.get('https://itstore-main-fe-omj2.onrender.com/');
        await driver.sleep(1000); // Add delay to observe page loading

        await driver.findElement(By.linkText('Product')).click();
        await driver.sleep(2000);

        await driver.findElement(By.id("smartphone")).click();
        await driver.sleep(2000);

        await driver.findElement(By.id("laptop")).click();
        await driver.sleep(2000);

        await driver.findElement(By.id("smartwatch")).click();
        await driver.sleep(2000);

        await driver.findElement(By.id("earbuds")).click();
        await driver.sleep(2000);

        await driver.findElement(By.id("Keyboard")).click();
        await driver.sleep(2000);

        await driver.findElement(By.id("graphics card")).click();
        await driver.sleep(2000);




        const currentCategorie = await driver.findElement(By.id('currentCategorie'));
        const initialCategorie = await currentCategorie.getText();
        assert.equal(initialCategorie, "graphics card", 'Expected Categorie does not match actual categorie');



    });

});