/*----定义前台用户模块的所有方法----*/
//引入model模型
var userMsg=require('../../models/usermsg');

//展示某个用户基本信息的方法
exports.index=function(req,res){
    //获取请求参数中传递的关联用户id
    var uid=req.query.uid;
    //通过findByUid方法查询出指定的用户资料
    userMsg.findByUid(uid,function(err,data){
        if(err){
            //如果有错则打印错误
            console.log(err);
        }else{
            //如果没错则渲染页面并将变量传递给前台
            res.render('home/user/data',{'title':'基本信息','data':data});
        }
    });
};