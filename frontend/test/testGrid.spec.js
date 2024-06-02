// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('00_Navbar', function() {
  this.timeout(700000); // Set specific timeout for the entire test suite
  let driver;
  let vars;

  before(async function() {
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

  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  beforeEach(async function() {
    this.timeout(100000); // Set specific timeout for each test
  });

  it('00_NavbarGRID', async function() {
    await driver.get('https://itstore-main-fe-omj2.onrender.com/');
    vars["userID"] = await driver.executeScript("return localStorage.getItem(\"userID\")");
    if (!!vars["userID"]) {
      console.log(vars["userID"]);
      await driver.findElement(By.linkText("Logout")).click();
      vars["userID"] = await driver.executeScript("return localStorage.getItem(\"userID\")");
      await driver.get('https://itstore-main-fe-omj2.onrender.com/');
      console.log(vars["userID"]);
    }

    await driver.wait(until.elementLocated(By.linkText("Home")), 10000);
    await driver.findElement(By.linkText("Home")).click();
    vars["url"] = await driver.executeScript("return window.location.href;");
    assert(vars["url"].toString() == "https://itstore-main-fe-omj2.onrender.com/");

    await driver.findElement(By.linkText("About")).click();
    vars["url"] = await driver.executeScript("return window.location.href;");
    assert(vars["url"].toString() == "https://itstore-main-fe-omj2.onrender.com/about");

    await driver.findElement(By.linkText("Product")).click();
    vars["url"] = await driver.executeScript("return window.location.href;");
    assert(vars["url"].toString() == "https://itstore-main-fe-omj2.onrender.com/product");

    await driver.findElement(By.linkText("Login")).click();
    vars["url"] = await driver.executeScript("return window.location.href;");
    assert(vars["url"].toString() == "https://itstore-main-fe-omj2.onrender.com/login");

    await driver.findElement(By.linkText("Register")).click();
    vars["url"] = await driver.executeScript("return window.location.href;");
    assert(vars["url"].toString() == "https://itstore-main-fe-omj2.onrender.com/register");

    await driver.findElement(By.linkText("Stav")).click();
    vars["url"] = await driver.executeScript("return window.location.href;");
    assert(vars["url"].toString() == "https://itstore-main-fe-omj2.onrender.com/stav");

    await driver.findElement(By.linkText("Adar")).click();
    vars["url"] = await driver.executeScript("return window.location.href;");
    assert(vars["url"].toString() == "https://itstore-main-fe-omj2.onrender.com/adar");

    await driver.findElement(By.linkText("Ido")).click();
    vars["url"] = await driver.executeScript("return window.location.href;");
    assert(vars["url"].toString() == "https://itstore-main-fe-omj2.onrender.com/Ido");

    await driver.findElement(By.css("path")).click();
    vars["url"] = await driver.executeScript("return window.location.href;");
    assert(vars["url"].toString() == "https://itstore-main-fe-omj2.onrender.com/cart");
  });
});
