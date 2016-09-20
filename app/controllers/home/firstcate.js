//引入model模型
var firstcate=require('../../models/firstcate');
//引入underscore模块可以用来更新数据
var underscore=require('underscore');

//展示一级分类列表的方法
exports.index=function(req,res){
    //调用firstcate模型的fetch方法遍历数据传递给前台展示
    firstcate.fetch(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.json({ firstcates: data })
        }
    })
};