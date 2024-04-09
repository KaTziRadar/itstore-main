// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('04_Logout', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('04_Logout', async function() {
    await driver.get("http://localhost:3000/")
    vars["userID"] = await driver.executeScript("return localStorage.getItem(\"userID\")")
    if (!!await driver.executeScript("return (arguments[0] == null)", vars["userID"])) {
      await driver.get("http://localhost:3000/login")
      await driver.findElement(By.id("email")).sendKeys("test@test.test")
      await driver.findElement(By.id("password")).sendKeys("test123")
      await driver.findElement(By.css(".btn")).click()
      assert(await driver.switchTo().alert().getText() == "Login successfully!")
      vars["url"] = await driver.executeScript("return window.location.href;")
      assert(vars["url"].toString() == "http://localhost:3000/")
      console.log(vars["userID"])
    }
    await driver.findElement(By.linkText("Logout")).click()
    vars["userID"] = await driver.executeScript("return localStorage.getItem(\"userID\")")
    assert(vars["userID"].toString() == "null")
    vars["url"] = await driver.executeScript("return window.location.href;")
    assert(vars["url"].toString() == "http://localhost:3000/login")
  })
})
