const {Builder, By, Key, until} = require('selenium-webdriver');

(async function addToCart() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    // Navigate to the shopping website
    await driver.get('http://localhost:3000/');

    // Wait for the button to be clickable
    await driver.wait(until.elementLocated(By.css('bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md')), 10000);

    // Click on the button to add the item to the cart
    await driver.findElement(By.css('bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md')).click();

    // You can add further verification steps here if needed, like verifying the item is added to the cart

    console.log("Item added to cart successfully!");
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    await driver.quit();
  }
})();
