// 爬取腾讯视频中播放量超过2亿的电影，作为数据分析的数据基础
// 数据包括：
// 1.名字
// 2.播放量
// 3.主演，可以为空
// 4.是否需要VIP
// 5.一句话描述
// 6.海报
// 7.评分
// 8.播放地址

const puppeteer = require('puppeteer');
const fs = require('fs');

// 爬取地址
const url = 'http://v.qq.com/x/list/movie?pay=-1&offset=';

(async () => {
    const browser = await puppeteer.launch({timeout: 300000, headless: true});
    const page = await browser.newPage();
    let movieList = [];
    for (let i = 0; i < 167; i++) {
        const result = await getPageData(page, i);
        movieList = movieList.concat(result);
    }

    // 保存数据
    fs.writeFile(`${__dirname}/json/腾讯视频.json`, JSON.stringify(movieList), 'utf-8', (err) => {
        if (err) throw err;
    });

    browser.close();
})();

const getPageData = async (page, pageNumber) => {
    await page.goto(`${url}${pageNumber * 30}`);
    const result = await page.evaluate(() => {
        const listElements = document.querySelectorAll('.figures_list .list_item');
        let items = [];
        for (let item of listElements) {
            const name = item.querySelector('.figure_title a').getAttribute('title');
            const count = item.querySelector('.figure_count .num') ? item.querySelector('.figure_count .num').innerText : '';
            const actor = [...item.querySelectorAll('.figure_desc a')].map(ele => ele.getAttribute('title'));
            const score = item.querySelector('.figure_score') ? item.querySelector('.figure_score').innerText.replace(/\s+/g, '') : '无评分';
            const desc = item.querySelector('.figure_info') ? item.querySelector('.figure_info').innerText : '';
            const isVip = item.querySelector('.mark_v') ? true : false;
            const image = 'http' + item.querySelector('a.figure img').getAttribute('src');
            const address = item.querySelector('.figure_title a').getAttribute('href');
            // 处理播放量
            const flag = (count.indexOf('亿') > -1) && (parseInt(count.split('亿')[0]) > 2);
            if (flag) {
                items.push({
                    name,
                    count,
                    actor,
                    score,
                    desc,
                    isVip,
                    image,
                    address,
                });
            }
        }
        return items;
    });
    console.log(`第${pageNumber}页获取数据:${result.length}条！`);
    return result;
}