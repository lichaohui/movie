/*----定义前台用户模块的所有方法----*/
//引入model模型
var userMsg=require('../../models/usermsg');

//展示用户信息页面的方法
exports.index=function(req,res){
    //获取请求参数中传递的关联用户id
    var uid=req.query.uid;
    //渲染用户信息模板并将uid作为参数传递过去
    res.render('home/user/data',{'title':'基本信息','uid':uid});
};

//编辑某个用户信息的时候获取该用户信息的方法
exports.edit=function(req,res){
    //获取请求参数中的关联用户id
    var uid=req.query.uid;
    console.log(uid);
    //通过findByUid方法获取指定的用户信息并返回json格式给前台
    userMsg.findByUid(uid,function(err,data){
        if(err){
            res.json({'isError':true,'message':'获取用户信息失败，请稍后重试'});
        }else{
            res.json({'isError':false,'usrmsg':data});
        }
    });
};