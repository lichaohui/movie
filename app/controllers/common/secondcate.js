/*----后台操作secondcate的控制器----*/
//引入model模型
var secondcate=require('../../models/secondcate');

//查找同个一级分类下所有二级分类的方法
exports.query=function(req,res,next){
    //删除session
    delete req.session.secondcates;
    var pid=req.query.firstcate;
    secondcate.findByParent(pid,function(err,data){
        if(err){
            console.log(err);
        }else{
            req.session.firstcate=pid;
            req.session.secondcates=data;
            next();
        }
    });
};

