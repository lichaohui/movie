//验证手机短信/邮箱动态验证码是否匹配的方法
exports.verify=function(req,res,next){
    if(req.body.vcode==req.session.vcode){
        /*
         * 如果用户输入的验证码和我们发送的验证码相匹配
         * 就直接进行下一步
         */
        next();
    }else{
        /*
         * 否则返回错误信息
         */
        res.json({'isError':true,'message':'动态验证码不正确！'});
    }
}