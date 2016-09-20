//引入model模型
var firstcate=require('../../models/firstcate');

//展示一级分类列表的方法
exports.index=function(req,res,next){
    //调用firstcate模型的fetch方法遍历数据传递给前台展示
    firstcate.fetch(function(err,data){
        if(err){
            console.log(err);
        }else{
            app.locals.firstcates=data;
            next();
        }
    })
};
