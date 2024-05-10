const { Builder, By, until, Browser } = require('selenium-webdriver');
const assert = require('assert');

describe("register eror test", function() {
  let driver;

  // Hook to setup WebDriver instance before tests
  beforeEach(async function() {
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  });

  // Hook to close WebDriver instance after tests
  afterEach(async function() {
    if (driver) {
      await driver.quit();
  }
  });

  it("Email already exsit alert", async function() {
      this.timeout(50000);
      await driver.get('http://localhost:3000/');
      await driver.sleep(1000); // Add delay to observe page loading
  
      const registerLink = await driver.wait(until.elementLocated(By.linkText('Register')));
      await registerLink.click();
  
      const emailInput = await driver.wait(until.elementLocated(By.id('email')));
      await emailInput.sendKeys('a@gmail.com');
  
      const passwordInput = await driver.wait(until.elementLocated(By.id('password')));
      await passwordInput.sendKeys('123123');
  
      const confirmPasswordInput = await driver.wait(until.elementLocated(By.id('cnfrm-password')));
      await confirmPasswordInput.sendKeys('123123');
      await driver.sleep(1000);
  
      const registerButton = await driver.wait(until.elementLocated(By.className('btn')));
      await registerButton.click();
      await driver.sleep(1000);
  
      const erorMsg = await driver.findElement((By.id('message')));
      const msgValue = await erorMsg.getText();
      assert.equal(msgValue, 'Email already exists', 'Expected error does not match actual error');
  });

  it("Test 2: Emtpy fileds alert", async function() {
    console.log('Test 2: Start');
    this.timeout(50000);
      await driver.get('http://localhost:3000/');
      await driver.sleep(1000); // Add delay to observe page loading

      await driver.findElement(By.linkText("Register")).click();
      const registerButton = await driver.wait(until.elementLocated(By.className('btn')));
      await registerButton.click();
      await driver.sleep(1000);
  
      const erorMsg = await driver.findElement((By.id('message')));
      const msgValue = await erorMsg.getText();
      assert.equal(msgValue, "Error! fields can't be empty", 'Expected error does not match actual error');
    console.log('Test 2: End');
  });

  it("Test 3: Password does not match", async function() {
    this.timeout(50000)
    await driver.get('http://localhost:3000/');
      await driver.sleep(1000); // Add delay to observe page loading
  
       await driver.findElement(By.linkText('Register')).click();    
  
      await driver.findElement(By.id('email')).sendKeys('abcns@gmail.com');

      await driver.findElement(By.id('password')).sendKeys('123123')
     
      await driver.findElement(By.id('cnfrm-password')).sendKeys('12312344');
  
      await driver.findElement((By.className('btn'))).click();
      await driver.sleep(2000);
  
      const erorMsg = await driver.findElement((By.id('message')));
      const msgValue = await erorMsg.getText();
      assert.equal(msgValue, 'Error! passwords not match', 'Expected error does not match actual error');
  });

  it("Test 4: Email is invaild", async function() {
    this.timeout(50000)
    await driver.get('http://localhost:3000/');
      await driver.sleep(1000); // Add delay to observe page loading
  
       await driver.findElement(By.linkText('Register')).click();    
  
      await driver.findElement(By.id('email')).sendKeys('test.test');

      await driver.findElement(By.id('password')).sendKeys('123123')
     
      await driver.findElement(By.id('cnfrm-password')).sendKeys('123123');
  
      await driver.findElement((By.className('btn'))).click();
      
      const erorMsg = await driver.findElement((By.id('message')));
      const msgValue = await erorMsg.getText();
      assert.equal(msgValue, 'Error! email is invalid', 'Expected error does not match actual error');
  });

});
