// 网易云音乐爬虫，爬取网易云音乐播放量超过100万的热门歌单
// 使用 puppeteer 处理
const puppeteer = require('puppeteer');
const fs = require('fs');
const dayjs = require('dayjs');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    // 定于数组存储数据
    let musicPlayList = [];
    const page = await browser.newPage();
    for (let i = 0; i < 1191; i += 35) {
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
    fs.writeFile(`./json/netease-play-list(${dayjs().format('YYYY-MM-DD HH:mm:ss')}).json`, JSON.stringify(musicPlayList), 'utf-8', (err) => {
        if (err) throw err;
    });

    await browser.close();
})();

const getOnePageData = async (page, offset) => {
    const url = `https://music.163.com/#/discover/playlist/?order=hot&cat=%E5%85%A8%E9%83%A8&limit=35&offset=${offset}`;
    // 定于数组存储数据
    await page.goto(url);
    // 设置页面大小
    await page.setViewport({ 
        width: 1100, 
        height: 2000
    });
    // 截图，关闭截提高效率
    // await page.screenshot({
    //     path: `./img/网易云音乐-${offset}-${offset + 35}.jpg`,
    //     quality: 100,
    //     type: 'jpeg',
    //     fullPage: true,
    // });
    
    // 获取歌单的iframe
    let iframe = await page.frames().find(f => f.name() === 'contentFrame');
    // console.log('当前的Iframe：', iframe);
    // 获取歌单
    const result = await iframe.evaluate(() => {
        const elements = document.querySelectorAll('#m-pl-container > li');
        let res = [];
        for (let ele of elements) {
            let img = ele.querySelector('.j-flag').getAttribute('src');
            let name = ele.querySelector('.tit').innerText;
            let count = ele.querySelector('.nb').innerText;
            let author = ele.querySelector('.nm').innerText;
            let address = 'https://music.163.com/#' + ele.querySelector('.msk').getAttribute('href');
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
