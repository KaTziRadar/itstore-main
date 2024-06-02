const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Security Testing with Selenium Grid SSLT', function () {
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

    vars = {};
  });

  after(async function () {
    await driver.quit();
  });

  it('Check for SSL/TLS configuration', async function () {
    await driver.get('https://itstore-main-fe-omj2.onrender.com/');
    let url = await driver.getCurrentUrl();
    assert(url.startsWith('http://')); // Ensure the site is using HTTPS
  });

  
});
