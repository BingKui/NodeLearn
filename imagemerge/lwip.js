const lwip = require('lwip')

// 打开一张图片
lwip.open('./imagemerge/background.jpg', function(err, image) {
    if (!err) {
        console.log('图片为：', image);
    }
});

// 创建一张图片
lwip.create(200, 200, {r:0, g:0, b:0, a:0}, function (err, image) {
    console.log(err);
    if (!err) {
        console.log('创建的图片为：', image);
        image.resize()
    }
});

