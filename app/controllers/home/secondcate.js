/*----后台操作secondcate的控制器----*/
//引入model模型
var secondcate=require('../../models/secondcate');

//查找同个一级分类下所有二级分类的方法
exports.query=function(req,res,next){
    var pid=req.query.firstcate;
    secondcate.findByParent(pid,function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log('hello');
            req.session.secondcates=data;
            console.log(data);
            console.log('world');
        }
    });
    next();
};

