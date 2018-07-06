const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://uiseed.cn');
    // 截图
    await page.screenshot({path: 'uiseed.png'});

    await browser.close();
})();