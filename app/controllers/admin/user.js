/*----定义后台用户模块的所有方法----*/
//引入model模型
var user=require('../../models/user');

//展示用户列表的方法
exports.index=function(req,res){
    user.fetch(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.render('admin/user/list',{'title':'user','users':data});
        }
    });
};