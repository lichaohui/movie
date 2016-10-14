//引入ccap模块用来生成图片验证码
var ccap = require('ccap');

exports.index=function(){
    var captcha1 = ccap();
    var captcha2 = ccap(width, height, offset);
    var captcha3 = ccap({
        width:256,//set width,default is 256
        height:60,//set height,default is 60
        offset:40,//set text spacing,default is 40
        quality:100,//set pic quality,default is 50
        generate:function(){//Custom the function to generate captcha text
             //generate captcha text here
             return text;//return the captcha text
        }
    });
}
