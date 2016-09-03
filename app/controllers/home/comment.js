/*
 * 前台comment模块控制器
 * 该控制器定义了所有关于comment模块的方法
 */
//引入model模型
var comment=require('../../models/comment');

//展示某个电影或某个用户下所有评论的方法
exports.index=function(req,res){
    var key=req.params.key;
    var val=req.params.val;
    comment.fetch(key,val,function(err,data){
        if(err){
            console.log(err);
        }else{
            res.json(data);
        }
    });
};

//保存评论的方法
exports.store=function(req,res){
    //获取到表单传递过来的数据
    var postcomment=req.body;
    var newcomment=new comment({
        'movie':postcomment.movie,
        'from':postcomment.from,
        'content':postcomment.content,
    });
    //调用save方法保存数据并在回调函数中重定向页面
    newcomment.save(function(err,data){
        if(err){
            res.json({'isError':true,'message':'comment failed!'})
        }else{
            res.json({'isError':false,'message':'comment success!','data':data});
        }; 
    });
};
