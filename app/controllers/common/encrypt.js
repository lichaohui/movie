//对密码进行加密处理的控制器
//引入bcrypt组件
var bcrypt=require('bcrypt');

exports.index=function(req,res){
    /*
     * 使用bcrypt的genSalt生成盐
     * 然后在回调函数中将生成的盐加给密码,
     * 再进行hash加密
     * 有两个参数，
     * 第一个参数是复杂程度，
     * 默认为10
     * 第二个参数是生成salt之后的回调函数
     * 回调函数中的第一个参数是err
     * 第二个参数是生成的salt(盐)
     * 再回调函数中可以用生成以后的盐加给密码进行hash
     */
    bcrypt.genSalt(10,function(err,salt){
        if(err){
            console.log(err);
        }else{
            /*
             * 如果没有错误就对生成的盐和密码进行hash
             * 有三个参数，
             * 第一个参数是密码
             * 第二个参数是生成的salt
             * 第三个参数是回调函数，
             * 回调函数中有两个参数，
             * 第一个参数是err,
             * 第二个参数是hash后生成的值
             */
            bcrypt.hash(req.body.password,salt,function(err,hashresult){
                if(err){
                    console.log(err);
                }else{
                    /*
                     * 如果没有错误
                     * 就把密码和salt经过hash后得出的结果返回
                     */
                    return hashresult;
                }
            });
        }
    })
};