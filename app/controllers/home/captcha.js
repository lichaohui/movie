var ccap = require('ccap');
exports.index=function(req,res){
    var captcha = ccap({
        width:100,
        height:34,　
        offset:20,
        quality:100,
        fontsize:30,
        /*
         * 自定义生成字符串，
         * 此方法可不要
         * 如果不要则系统会生成默认的随机字符串
         */
        generate:function(){
            //通过自定义的方式生成一个四位长度的随机字符串
            var str='';
            for(var i=0;i<4;i++){
                str += Math.random().toString(10).substr(2);
            }
            str=str.substr(0,4);
            //将验证码存储到session中
            req.session.captcha=str;
            //返回生成的字符串
            return str;
        }
    });
    var ary = captcha.get();
    //向客户端返回验证码
    res.write(ary[1]); 
    res.end();
}

