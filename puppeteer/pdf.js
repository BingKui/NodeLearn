const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://uiseed.cn');
    // 生成 PDF 文件
    await page.pdf({path: 'uiseed.pdf', format: 'A4'});

    await browser.close();
})();