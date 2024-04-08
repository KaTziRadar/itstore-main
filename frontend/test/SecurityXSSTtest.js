const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

describe('Security Testing with Selenium Grid', function () {
  this.timeout(5000);
  let driver;

  before(async function () {
    driver = await new Builder()
      .usingServer('http://localhost:4444/wd/hub')
      .forBrowser('chrome')
      .build();
  });

  after(async function () {
    await driver.quit();
  });

  it('Test for XSS vulnerability', async function () {
    await driver.get('http://localhost:3000/Login'); 
    await driver.findElement(By.id('email')).sendKeys('<script>alert("XSS Attack!")</script>');
    await driver.findElement(By.id('password')).sendKeys('asd');

    await driver.findElement(By.css('.btn')).click();
    await driver.sleep(2000); 

    let errorMessage = await driver.findElement(By.id('message')).getText();
    assert(errorMessage.includes('Error! email is invalid'), 'Error message not displayed');
  });
});
