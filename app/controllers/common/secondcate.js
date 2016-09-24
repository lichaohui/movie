/*----后台操作secondcate的控制器----*/
//引入model模型
var secondcate=require('../../models/secondcate');

//查找同个一级分类下所有二级分类的方法
exports.query=function(req,res,next){
    //公共的回调函数
    /*var callback=function(err,data){
        if(err){
            console.log(err);
        }else{
            req.session.firstcate=pid;
            req.session.secondcates=data;
            next();
        }
    };*/
    
    //删除session
    delete req.session.secondcates;
    if(req.query.firstcate==null){
        //如果请求参数中没有一级分类和二级分类则返回所有的二级分类
        secondcate.fetch(function(err,data){
            if(err){
                console.log(err);
            }else{
                req.session.secondcates=data;
                next();
            }
        });
    }else{
        //如果请求参数中有一级分类则返回该一级分类下的所有二级分类
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
    }  
};
