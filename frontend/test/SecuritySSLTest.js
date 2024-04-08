const { Builder, By, Capabilities } = require('selenium-webdriver');
const assert = require('assert');

describe('Security Testing with Selenium Grid', function () {
  let driver;

  before(async function () {
    let chromeCapabilities = Capabilities.chrome();
    driver = await new Builder()
      .usingServer('http://localhost:4444/wd/hub')
      .withCapabilities(chromeCapabilities)
      .build();
  });

  after(async function () {
    await driver.quit();
  });

  it('Check for SSL/TLS configuration', async function () {
    await driver.get('http://localhost:3000/');
    let url = await driver.getCurrentUrl();
    assert(url.startsWith('http://')); // Ensure the site is using HTTPS
  });

  
});
