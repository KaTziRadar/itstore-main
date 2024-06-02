const { Builder, By, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Security Testing with Selenium Grid', function () {
  this.timeout(5000);
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

  it('Test for XSS vulnerability', async function () {
    await driver.get('https://itstore-main-fe-omj2.onrender.com/Login'); 
    await driver.findElement(By.id('email')).sendKeys('<script>alert("XSS Attack!")</script>');
    await driver.findElement(By.id('password')).sendKeys('asd');

    await driver.findElement(By.css('.btn')).click();
    await driver.sleep(2000); 

    let errorMessage = await driver.findElement(By.id('message')).getText();
    assert(errorMessage.includes('Error! email is invalid'), 'Error message not displayed');
  });
});