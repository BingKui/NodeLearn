const puppeteer = require('puppeteer');
const fs = require('fs');
const url = 'https://hanyu.baidu.com/s?wd=%E5%B0%8F%E5%AD%A6%E7%94%9F%E6%88%90%E8%AF%AD%E5%A4%A7%E5%85%A8&query=%E5%B0%8F%E5%AD%A6%E7%94%9F%E6%88%90%E8%AF%AD%E5%A4%A7%E5%85%A8';

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({
        width: 1300,
        height: 2500,
    });
    
    let isRun = true;
    let pageNum = 1;
    while(isRun && pageNum < 100) {
        await page.waitFor(500);
        const returnResult = await page.evaluate(() => {
            const poem_list = document.querySelectorAll('#data-container .poem-list-item');
            let result = [];
            for (let ele of poem_list) {
                const item = ele.querySelector('div a');
                const idiom = item.innerText;
                const link = `https://hanyu.baidu.com${item.getAttribute('href')}`;
                console.log(idiom);
                result.push({
                    idiom,
                    link,
                });
            }
            let nextBtn = document.querySelector('.paginationjs-next.J-paginationjs-next');
            let flag = false;
            if (nextBtn) {
                nextBtn.click();
                flag = true;
            } else {
                flag = false;
            }
            return {
                data: result,
                flag,
            };
        });
        console.log(returnResult, pageNum);
        // 保存临时数据
        fs.writeFile(`${__dirname}/temp/${pageNum}.json`, JSON.stringify(returnResult.data), 'utf-8', (err) => {
            if (err) throw err;
        });
        isRun = returnResult.flag;
        pageNum++;
    };
    await browser.close();
})();