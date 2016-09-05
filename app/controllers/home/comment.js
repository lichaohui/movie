/*
 * 前台comment模块控制器
 * 该控制器定义了所有关于comment模块的方法
 */
//引入model模型
var comment=require('../../models/comment');

//加载某个电影下更多评论的方法
exports.viewMore=function(req,res){
    //获取参数中的值
    var movieId=req.query.movieId;
    var from=req.query.from;
    var limit=req.query.limit;
    comment.findMoreByMovie(movieId,from,limit,function(err,data){
        if(err){
            res.json({'isError':true,'message':'加载失败，请稍后再试！'});
        }else{
            res.send(data);
        }
    });
},

//保存评论的方法
exports.store=function(req,res){
    //获取到表单传递过来的数据
    var postcomment=req.body;
    var newcomment=new comment({
        'movie':postcomment.movie,
        'from':postcomment.from,
        'totalReply':0,
        'content':postcomment.content,
    });
    //调用save方法保存数据并在回调函数中重定向页面
    newcomment.save(function(err,data){
        if(err){
            res.json({'isError':true,'message':'comment failed!'})
        }else{
            comment.findById(data._id,function(err,data){
                res.json({'isError':false,'message':'comment success!','comment':data});
            });
        }; 
    });
};
