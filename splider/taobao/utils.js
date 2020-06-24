/**
 * 获取单页数据
 * @param {Object} page 页面对象
 * @param {Number} pageNumber 分页数
 * @param {String} keyWord 关键词
 */
const getOnePageData = async (page, pageNumber, keyWord) => {
    const url = `https://s.taobao.com/search?q=${keyWord}&s=${pageNumber * 44}`;
    // 定于数组存储数据
    await page.goto(url);
    // 设置页面大小
    await page.setViewport({ 
        width: 1100, 
        height: 3000
    });
    // 获取歌单
    const result = await page.evaluate(() => {
        const itemList = document.querySelectorAll('#mainsrp-itemlist .items .item');
        let res = [];
        for (let ele of itemList) {
            // 价格
            const price = ele.querySelector('.price strong').innerText;
            // 付款人数
            const payNumber = parseInt(ele.querySelector('.deal-cnt').innerText);
            // 名称、描述
            const desc = ele.querySelector('div[class="row row-2 title"]').innerText;
            // 店铺名
            const shop = ele.querySelector('.shop a').innerText;
            // 发货地
            const address = ele.querySelector('.location').innerText;
            res.push({
                price,
                desc,
                payNumber,
                shop,
                address,
            });
        }
        return res;
    });
    return result;
}

module.exports = {
    getOnePageData,
};

const data = [{
    "price": "12.90",
    "desc": "三全粽子三全龙舟粽八宝粽200g甜粽子端午2只装",
    "payNumber": 2504,
    "shop": "天猫超市",
    "address": "上海"
}, {
    "price": "159.00",
    "desc": "嘉兴粽子礼盒装定制logo蛋黄鲜肉豆沙甜粽团购批发送礼端午节礼品",
    "payNumber": 831,
    "shop": "兆佳食品专营店",
    "address": "浙江 嘉兴"
}, {
    "price": "189.00",
    "desc": "五芳斋粽子竹篮礼盒华礼嘉兴特产蛋黄鲜肉粽豆沙咸蛋端午送礼团购",
    "payNumber": 4,
    "shop": "五芳斋官方旗舰店",
    "address": "浙江 嘉兴"
}, {
    "price": "18.90",
    "desc": "杨大爷川味香肠粽豌豆腊肉粽子四川特产手肉粽端午伴手礼袋装",
    "payNumber": 110,
    "shop": "杨大爷旗舰店",
    "address": "四川 成都"
}, {
    "price": "49.90",
    "desc": "五芳斋粽子礼盒装鲜肉咸蛋黄大肉粽嘉兴豆沙甜粽端午团购散装礼品",
    "payNumber": 20,
    "shop": "五芳斋官方旗舰店",
    "address": "浙江 嘉兴"
}, {
    "price": "298.00",
    "desc": "海鲜鲍鱼烧肉粽板栗咸蛋黄手工新鲜大粽子端午节送礼品团购礼盒装",
    "payNumber": 928,
    "shop": "草帽路飞食品旗舰店",
    "address": "福建 福州"
}]
console.log(JSON.stringify(data, null, '\t'));
data.sort((a, b) => {
    return parseInt(b.price) - parseInt(a.price);
});
console.log('result', JSON.stringify(data, null, '\t'));