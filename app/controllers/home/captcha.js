//引入ccap模块
var ccap = require('ccap');

//生成验证码
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
                str += Math.random().toString(36).substr(2);
            }
            str=str.substr(0,4);
            //返回生成的字符串
            return str;
        }
    });
    /*
     * 通过captcha的get()方法可以获取一个数组
     * 数组中的第一个元素表示验证码的文字
     * 数组中的第二个元素表示验证码的图片对象
     */
    var ary = captcha.get();
    /* 
     * 获取验证码的文字
     * 并存储到session中
     */
    req.session.captcha=ary[0];
    //向客户端返回验证码图片对象
    res.write(ary[1]); 
    res.end();
};

//检验验证码
exports.verify=function(req,res,next){
    if(req.body.captcha==req.session.captcha){
        //如果输入的验证码正确则进入下一步
        next();
    }else{
        //否则返回错误信息
        res.json({'isError':true,'message':'验证码输入不正确！'});
    }
}
