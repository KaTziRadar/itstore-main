const { Builder, By, until, Browser ,Capabilities } = require('selenium-webdriver');
const assert = require('assert');


describe('Load test with Selenium Grid', function () {
  let drivers = [];

  before(async function () {
    this.timeout(10000);
    let chromeCapabilities = Capabilities.chrome();
    let driver = await new Builder()
      .usingServer('http://localhost:4444/wd/hub')
      .withCapabilities(chromeCapabilities)
      .build();
    drivers.push(driver);
  });

  after(async function () {
    await Promise.all(drivers.map(async (driver) => {
      await driver.quit();
    }));
  });

  it('Site load test', async function () {
    for (let i = 0; i < 5; i++) { // Testing with 5 browser managers
      await drivers[0].get('http://localhost:3000/');
      let title = await drivers[0].getTitle();
      assert(title.includes('IT store')); // Should throw an error if the header doesn't match
    }
  });
});
