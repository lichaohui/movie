/*
 * 前台comment模块控制器
 * 该控制器定义了所有关于comment模块的方法
 */
//引入model模型
var comment=require('../../models/comment');

exports.store=function(req,res,next){
    //获取到表单传递过来的数据
    var postcomment=req.body;
    var newcomment=new comment({
        'movie':postcomment.movie,
        'from':postcomment.from,
        'to':postcomment.to,
        'content':postcomment.content,
    });
    //调用save方法保存数据并在回调函数中重定向页面
    newcomment.save(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.redirect('back');
        }; 
    });
};
