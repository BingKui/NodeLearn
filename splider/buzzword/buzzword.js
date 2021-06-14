// QQ音乐热门歌单爬虫，爬取QQ音乐播放量超过100万的热门歌单
// 使用 puppeteer 处理
const puppeteer = require('puppeteer');
const fs = require('fs');
const dayjs = require('dayjs');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    // 定于数组存储数据
    let musicPlayList = [];
    const page = await browser.newPage();
    for (let i = 0; i < 100; i++) {
        const item = await getOnePageData(page, i);
        console.log(`获取到数据${item.length}条。`, item);
        musicPlayList = musicPlayList.concat(item);
    }

    // // 保存之前去重
    // let hash = {};
    // musicPlayList = musicPlayList.reduce((item, next) => {
    //     hash[next.address] ? '' : hash[next.address] = true && item.push(next);
    //     return item
    // }, []);
    
    // 保存数据
    fs.writeFile(`${__dirname}/json/buzzword(${dayjs().format('YYYY-MM-DD HH:mm:ss')}).json`, JSON.stringify(musicPlayList), 'utf-8', (err) => {
        if (err) throw err;
    });

    await browser.close();
})();



const getOnePageData = async (page, pageNumber) => {
    const url = `https://jikipedia.com/`;
    // 定于数组存储数据
    await page.goto(url);
    // 设置页面大小
    await page.setViewport({ 
        width: 1300, 
        height: 3227,
    });
    await page.waitFor(2000);
    // 页面第一条是否是当前搜索的
    const result = await page.evaluate(() => {
        const elements = document.querySelectorAll('.feed-stream .tile');
        // console.log(elements.length);
        let res = [];
        for (let ele of elements) {
            const _n = ele.querySelector('.card-middle');
            const href = ele.querySelector('.card-content').getAttribute('href');
            const name = _n.querySelector('.title').innerText;
            const desc = _n.querySelector('.brax-render').innerText;
            res.push({
                name,
                href,
                desc,
            });
        }
        return res;
    });
    return result;
}
