const assert = require('assert');
const { Builder, By, until,Browser } = require('selenium-webdriver');

describe("Delete user test", function() {
    this.timeout(100000);
    let driver

    beforeEach(async function() {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    });

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it("delete user successfully", async function() {
        
        await driver.get('http://localhost:3000/');
        // Create user that we will delete after 

         await driver.findElement(By.linkText('Register')).click();
         await driver.findElement((By.id('email'))).sendKeys('test@test.test');
         await driver.findElement((By.id('password'))).sendKeys('test123');
         await driver.findElement((By.id('cnfrm-password'))).sendKeys('test123');
        

        const registerButton = await driver.wait(until.elementLocated(By.className('btn')));
        await registerButton.click();

         // Wait for the alert to appear
         await driver.wait(until.alertIsPresent());

         // Switch to the alert and accept it
         let alert = await driver.switchTo().alert();
         await alert.accept();
         ///////////////////////////////////////////////////

         //Login for the user we want to delete 
         await driver.findElement(By.id('email')).sendKeys('test@test.test');
         await driver.findElement(By.id('password')).sendKeys('test123');
         await driver.findElement(By.css('.btn')).click();       
         // Wait for the alert to appear
         await driver.wait(until.alertIsPresent());
         // Switch to the alert and accept it
          alert = await driver.switchTo().alert();
         await alert.accept();
         //////////////////////////////////////////////////////////////


         //Press the delete user button 
         await driver.sleep(1000)
         await driver.findElement(By.linkText('Delete User')).click();
         await driver.sleep(1000);
         
          // Wait for the alert to appear
         await driver.wait(until.alertIsPresent());
         alert = await driver.switchTo().alert();
         const msg = await alert.getText();
         await alert.accept();
         assert.equal(msg, 'User deleted successfully!', 'Expected error does not match actual error');

    });

});
