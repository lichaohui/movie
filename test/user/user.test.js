//引入crypto模块
var crypto=require('crypto');
//引入bcrypt模块
var bcrypt=require('bcrypt');
//引入should模块
var should=require('should');

//引入app入口文件
var app=require('../../app');
//引入mongose
var mongoose=require('mongoose');
//引入user的model
var user=require('../../app/models/user');

//编写一个获取随机字符串的函数
function getRandomString(len)
{
    (len == len) ? len : len=16;
    //获取一个字符串
    var str=Math.ceil(len/2).toString('hex');
    //返回crypto通过randomBytes方法得到的随机字符串
    return crypto.randomBytes(str);
}

/*
 * 测试脚本里面应该包括一个或多个describe块，
 * 每个describe块应该包括一个或多个it块
 * describe块称为"测试套件"（test suite），
 * 表示一组相关的测试。
 * 它是一个函数，
 * 第一个参数是测试套件的名称（"单元测试"），
 * 第二个参数是一个实际执行的函数。
 */
descripe('单元测试',function(){
    /*
     * descripe可以嵌套使用
     * 在这里就是unit test这个测试中包含了model user这个测试
     */
    descripe('User Model的测试:',function(){
        /*
         * 测试的具体实现中包含了before和after两部分操作
         * before是测试之前的操作
         * after是测试之后的操作
         */
        before(function(done){
            user={
                name:getRandomString(),
                password:'password'
            };
            done();
        });
    });
    
    descripe('如果要添加用户：',function(){
        /*
         * it块称为"测试用例"（test case），
         * 表示一个单独的测试，
         * 是测试的最小单位。
         * 它也是一个函数，
         * 第一个参数是测试用例的名称（"user的名称在数据库中不应该有重复的值"），
         * 第二个参数是一个实际执行的函数。
         */
        it('user的名称在数据库中不应该有重复的值',function(done){
            user.find({name:user.name},function(err,data){
                data.should.have.length(0);
                done();
            })
        })
    });
    
})