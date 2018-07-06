const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://uiseed.cn');

    // 获取尺寸
    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            derviceScaleFactor: window.derviceScaleFactor,
        };
    });

    console.log('尺寸：', dimensions);
    await browser.close();
})();