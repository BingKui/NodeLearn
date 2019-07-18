const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://juejin.im/');
    const result = await page.evaluate(() => {
        return {
            ss: localStorage,
        };
    });
    console.log('页面的localStorage是：', result);
    browser.close();
})();