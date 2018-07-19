const fs = require('fs');
const gm = require('gm');
const request = require('request')
// gm('./background.jpg')
// .size(function(err, size) {
//     if (!err) {
//         console.log('size', size);
//     }
// })'


// 获取远程图片保存
const url = 'http://p1.music.126.net/wpahk9cQCDtdzJPE52EzJQ==/109951163271025942.jpg?param=140y140';
// gm(request(url)).write('./imagemerge/test.png', function (err) {
//     console.log(err);
//     if (!err) console.log('done');
// });

// 获取背景图片尺寸
gm('./imagemerge/background.jpg')
    .size(function (err, size) {
        if (!err) {
            console.log('尺寸', size);
        }
    });

// 图片拼接
gm()
.command("composite") 
.in("-gravity", "center")
.in('./imagemerge/test.png')
.in('./imagemerge/background.jpg')
.write('./imagemerge/111.jpg', function (err) {
  if (!err) 
    console.log(' hooray! ');
  else
    console.log(err);
});