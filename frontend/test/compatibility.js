const { Builder ,Capabilities } = require('selenium-webdriver');
const assert = require('assert');

let compatibilities = [];
let drivers = [];

// all browsers (more browsers can be added easily)
let chromeCapabilities = Capabilities.chrome();
compatibilities.push(chromeCapabilities);

let safariCapabilities = Capabilities.safari();
compatibilities.push(safariCapabilities);

let firefoxCapabilities = Capabilities.firefox();
compatibilities.push(firefoxCapabilities);

let edgeCapabilities = Capabilities.edge();
compatibilities.push(edgeCapabilities);



describe('Compatibility test with Selenium Grid', function () {
  

  beforeAll(async function () { // create drivers with all the different browsers
    let driver;
    for(let i = 0; i<compatibilities.length;++i)
    {
     driver = await new Builder()
      .usingServer('http://localhost:4444/wd/hub')
      .withCapabilities(compatibilities(i))
      .build();
    drivers.push(driver);
    }
  });

  afterAll(async function () { //close all drivers after test
    await Promise.all(drivers.map(async (driver) => {
      await driver.quit();
    }));
  });

  test('Compatibility testing', async function () {
    for (let i = 0; i < drivers.length; i++) { // testing all browsers
      await drivers[i].get('http://localhost:3000/');
      let title = await drivers[i].getTitle();
      assert(title.includes('IT store')); // Should throw an error if the header doesn't match
    }
  });
});