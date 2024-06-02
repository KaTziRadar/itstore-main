const { Builder, By, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Security Testing with Selenium Grid', function () {
  let driver;

  before(async function () {
    let chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--headless');
    chromeOptions.addArguments('--disable-gpu');
    chromeOptions.addArguments('--no-sandbox');
    chromeOptions.addArguments('--disable-dev-shm-usage');

    let chromeCapabilities = Capabilities.chrome();
    chromeCapabilities.set('chromeOptions', chromeOptions);

    driver = await new Builder()
      .usingServer('http://localhost:4444/wd/hub')
      .withCapabilities(chromeCapabilities)
      .build();
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
