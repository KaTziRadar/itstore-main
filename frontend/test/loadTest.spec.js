const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Load test with Selenium Grid', function () {
  this.timeout(5000);
  let driver;

  beforeEach(async function () {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--headless');
    chromeOptions.addArguments('--disable-gpu');
    chromeOptions.addArguments('--no-sandbox');
    chromeOptions.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .usingServer('http://localhost:4444/wd/hub')
      .build();
  });

  afterEach(async function () {
    await Promise.all(driver.map(async (driver) => {
      await driver.quit();
    }));
  });

  it('Site load test', async function () {
    for (let i = 0; i < 5; i++) { // Testing with 5 browser managers
      await driver[0].get('https://itstore-main-fe-omj2.onrender.com/');
      let title = await driver.getTitle();
      assert(title.includes('IT store')); // Should throw an error if the header doesn't match
    }
  });
});
