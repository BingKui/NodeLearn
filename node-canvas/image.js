// 通过后台生成图片
// const Canvas = require('canvas');
// const Image = Canvas.Image;
// const canvas = new Canvas(100, 100);
// const ctx = canvas.getContext('2d');
// const img = new Image;
// img.src = 'http://p1.music.126.net/AKxfgEiDkqzohs4MNfDl9Q==/18509178744201088.jpg?param=140y140';
// ctx.drawImage(img, 0, 0);
// ctx.stroke();

// console.log('<img src="' + canvas.toDataURL() + '" />');
var Canvas = require('canvas'),
    Image = Canvas.Image,
    canvas = new Canvas(200, 200),
    ctx = canvas.getContext('2d');

// ctx.font = '30px Impact';
// ctx.rotate(.1);
// ctx.fillText("Awesome!", 50, 100);

// var te = ctx.measureText('Awesome!');
// ctx.strokeStyle = 'rgba(0,0,0,0.5)';
// ctx.beginPath();
// ctx.lineTo(50, 102);
// ctx.lineTo(50 + te.width, 102);
// ctx.stroke();

ctx.beginPath();
img = new Image;
img.src = 'http://p1.music.126.net/AKxfgEiDkqzohs4MNfDl9Q==/18509178744201088.jpg?param=140y140';
ctx.drawImage(img, 0, 0, img.width / 4, img.height / 4);
ctx.stroke();

console.log('<img src="' + canvas.toDataURL() + '" />');