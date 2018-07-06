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
    for (let i = 1; i < 220; i++) {
        const item = await getOnePageData(page, i);
        console.log(`获取到数据${item.length}条。`);
        musicPlayList = musicPlayList.concat(item);
    }

    // 保存之前去重
    let hash = {};
    musicPlayList = musicPlayList.reduce((item, next) => {
        hash[next.address] ? '' : hash[next.address] = true && item.push(next);
        return item
    }, []);
    
    // 保存数据
    fs.writeFile(`./json/qq-play-list(${dayjs().format('YYYY-MM-DD HH:mm:ss')}).json`, JSON.stringify(musicPlayList), 'utf-8', (err) => {
        if (err) throw err;
    });

    await browser.close();
})();

const getOnePageData = async (page, pageNumber) => {
    const url = `https://y.qq.com/portal/playlist.html#t3=${pageNumber}&`;
    // 定于数组存储数据
    await page.goto(url);
    // 设置页面大小
    await page.setViewport({ 
        width: 1300, 
        height: 3227,
    });
    // 截图，想要截取完整的图片就要等待，所以关闭
    // await page.waitFor(1000);
    // await page.screenshot({
    //     path: `./img/QQ音乐-${pageNumber}.jpg`,
    //     quality: 100,
    //     type: 'jpeg',
    //     fullPage: true,
    // });
    // 获取歌单
    const result = await page.evaluate(() => {
        const elements = document.querySelectorAll('#playlist_box > li');
        let res = [];
        for (let ele of elements) {
            const _n = ele.querySelector('.js_playlist');
            let img = 'https' + ele.querySelector('.playlist__pic').getAttribute('src');
            let name = _n.getAttribute('title');
            let count = ele.querySelector('.playlist__other').innerText.split('：')[1].replace(/\s+/g, '');
            let author = ele.querySelector('.playlist__author').innerText.replace(/\s+/g, '');
            let address = `https://y.qq.com/n/yqq/playsquare/${_n.getAttribute('data-disstid')}.html#stat=${_n.getAttribute('data-stat')}`;
            const flag = (count.indexOf('万') > -1) && (parseInt(count.split('万')[0]) > 100);
            if (flag) {
                res.push({
                    img,
                    name,
                    count,
                    author,
                    address,
                });
            }
        }
        return res;
    });
    return result;
}
