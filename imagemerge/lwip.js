const lwip = require('lwip')

const dt = {
    "img": "http://p1.music.126.net/wpahk9cQCDtdzJPE52EzJQ==/109951163271025942.jpg?param=140y140",
    "name": "你的青春里有没有属于你的一首歌？",
    "count": "2411万",
    "author": "mayuko然",
    "address": "https://music.163.com/#/playlist?id=2201879658"
};

// 打开一张图片
// lwip.open('./imagemerge/background.jpg', function(err, image) {
//     if (!err) {
//         console.log('图片为：', image);
//     }
// });

// 打开一张图片
lwip.open('./imagemerge/background.jpg', function(err, image) {
    console.log(err)
    if (!err) {
        console.log('图片为：', image);
    }
});

// 创建一张图片
// lwip.create(200, 200, {r:0, g:0, b:0, a:0}, function (err, image) {
//     console.log(err);
//     if (!err) {
//         console.log('创建的图片为：', image);
//         image.resize()
//     }
// });

