var ccap = require('ccap');
exports.index=function(req,res){
    var captcha = ccap({
        width:190,
        height:34,　
        offset:30,
        quality:100,
        fontsize:40,
        /*
         * 自定义生成字符串，
         * 此方法可不要
         * 如果不要则系统会生成默认的随机字符串
         */
        /*generate:function(){
            var str = "自定义的字符串";
            return str;
        }*/
    });
    var ary = captcha.get();
    console.log(ary);//字符串
    res.write(ary[1]); //
    res.end();
}

