// 精细化获取每个成语的信息
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    const data = await fs.readdirSync(`${__dirname}/temp`);
    for (let i = 0; i < data.length; i++) {
        const filename = data[i];
        if (/:*\.json/g.test(filename)) {
            const arr = await fs.readFileSync(`${__dirname}/temp/${filename}`);
            const list = JSON.parse(arr);
            let result = [];
            for (let j = 0; j < list.length; j++) {
                const item = list[j];
                const one_detail = await getOneDetail(page, item.link);
                result.push(one_detail);
            }
            console.log('成语文件：', filename);
            // 保存详情数据
            fs.writeFile(`${__dirname}/data/${filename}`, JSON.stringify(result), 'utf-8', (err) => {
                if (err) throw err;
            });
        }
    }
    await browser.close();
})()

const getOneDetail = async (page, url) => {
    await page.goto(url);
    await page.setViewport({
        width: 1300,
        height: 2300,
    });
    await page.waitFor(300);
    console.log('开始执行页面：', url);
    return await page.evaluate(() => {
        const dealElements = (eles = []) => {
            const result = [];
            for (let i = 0; i < eles.length; i++) {
                const item = eles[i];
                result.push({
                    idiomName: item.innerText.trim(),
                    idiomLink: `https://hanyu.baidu.com/s${item.getAttribute('href')}`,
                });
            }
            return result;
        }
        const idiomBody = document.querySelector('#idiom-body');
        const idiomAddress = window.location.href;
        if (!idiomBody) {
            return {
                idiomAddress,
            };
        }
        // 成语名称
        const idiomName = idiomBody.querySelector('#term-header #pinyin strong').innerText.trim();
        // 拼音
        const idiomPinyin = idiomBody.querySelector('#term-header #pinyin span').innerText.trim();
        // 地址
        // 意思
        const means = idiomBody.querySelector('#basicmean-wrapper .tab-content p');
        const idiomMeans = means ? means.innerText.trim() : '';
        // 出处
        const from = idiomBody.querySelector('#source-wrapper .tab-content p');
        const idiomFrom = from ? from.innerText.trim() : '';
        // 例子，例句
        const example = idiomBody.querySelector('#liju-wrapper .tab-content p');
        const idiomExample = example ? example.innerText.trim() : '';
        // 近义词
        const idiomSynonym = dealElements(idiomBody.querySelectorAll('#syn_ant_wrapper .tab-content #synonym .block a') || []);
        // 反义词
        const idiomAntonym = dealElements(idiomBody.querySelector('#syn_ant_wrapper .tab-content #antonym .block a') || []);
        // 成语接龙
        const idiomJielong = dealElements(idiomBody.querySelectorAll('#jielong-wrapper .tab-content a') || []);
        return {
            idiomName,
            idiomPinyin,
            idiomAddress,
            idiomMeans,
            idiomFrom,
            idiomExample,
            idiomSynonym,
            idiomAntonym,
            idiomJielong,
        };
    });
}

