var ccap = require('ccap');
exports.index=function(req,res){
    var captcha = ccap({
        width:100,
        height:34,　
        offset:20,
        quality:50,
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
            return str.substr(0,4);
        }
    });
    var ary = captcha.get();
    res.write(ary[1]); //
    res.end();
}

