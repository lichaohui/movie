//引入ccap模块用来生成图片验证码
var ccap = require('ccap');
var captcha1 = ccap();
var captcha2 = ccap(width, height, offset);

exports.index=function(){
    ccap({
        //set width,default is 256
        width:256,
        //set height,default is 60
        height:60,
        //set text spacing,default is 40
        offset:40,
        //set pic quality,default is 50
        quality:100,
        //Custom the function to generate captcha text
        generate:function(){
            //generate captcha text here
            //return the captcha text
            console.log(text);
            return text;
        }
    });
}
