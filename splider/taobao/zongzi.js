// 网易云音乐爬虫，爬取网易云音乐播放量超过100万的热门歌单
// 使用 puppeteer 处理
const puppeteer = require('puppeteer');
const fs = require('fs');
const { getOnePageData } = require('./utils.js');

const LOGIN_URL = 'https://login.taobao.com/member/login.jhtml';

(async () => {
    const browser = await puppeteer.launch({headless: false});
    // 定于数组存储数据
    let zongziList = [];
    const page = await browser.newPage();
    // 打开登录界面
    await page.goto(LOGIN_URL);
    // 设置页面大小
    await page.setViewport({ 
        width: 1366, 
        height: 2000
    });
    // 切换到扫码登录
    page.evaluate(() => {
        const qrcodeIcon = document.querySelector('#login .icon-qrcode');
        qrcodeIcon.click();
    });
    // 等待10秒，扫码登录
    await page.waitFor(15000);
    for (let i = 0; i < 100; i++) {
        const item = await getOnePageData(page, i, '粽子');
        console.log(`获取到数据${item.length}条。`);
        zongziList = zongziList.concat(item);
    }

    // // 保存之前去重
    // let hash = {};
    // zongziList = zongziList.reduce((item, next) => {
    //     hash[next.address] ? '' : hash[next.address] = true && item.push(next);
    //     return item
    // }, []);
    
    // 保存数据
    fs.writeFile(`${__dirname}/json/zongzi.json`, JSON.stringify(zongziList), 'utf-8', (err) => {
        if (err) throw err;
    });

    await browser.close();
})();
