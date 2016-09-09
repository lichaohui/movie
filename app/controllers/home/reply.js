/*
 * 前台reply模块控制器
 * 该控制器定义了所有关于reply模块的方法
 */
//引入model模型
var reply=require('../../models/reply');
var comment=require('../../models/comment');

//获取某个评论下回复的方法
exports.index=function(req,res){
    var cid=req.query.cid;
    reply.findByComment(cid,function(err,data){
        if(err){
            res.json({'isError':true,'message':'load failed!'});
        }else{
            res.json({'isError':false,'message':'load success!','replies':data});
        }
    });
};

//加载某个评论下更多回复的方法
exports.viewMore=function(req,res){
    var cid=req.query.cid;
    var from=req.query.from;
    var limit=req.query.limit;
    reply.findMoreByComment(cid,from,limit,function(err,data){
        if(err){
            res.json({'isError':true,'message':'加载失败，请稍后再试！'});
        }else{
            res.json({'isError':false,'message':'加载成功！','replies'：data});
        }
    });
};

//保存回复的方法
exports.store=function(req,res){
    //获取到表单传递过来的数据
    var postreply=req.body;
    var newreply=new reply({
        'from':postreply.from,
        'toWho':postreply.toWho,
        'toWhichComment':postreply.toWhichComment,
        'toWhichReply':postreply.toWhichReply,
        'content':postreply.content,
    });
    //调用save方法保存数据并在回调函数中重定向页面
    newreply.save(function(err,data){
        if(err){
            res.json({'isError':true,'message':'reply failed!'});
        }else{
            //查询出回复的哪条评论然后更新该条评论的回复总是
            comment.findById(data.toWhichComment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    //更新评论的回复条数
                    var newTotal=comment.totalReply+1;
                    comment.totalReply=newTotal;
                    comment.save(function(err){
                        //在save的回调方法查找数据并返回给客户端
                        reply.findById(data._id,function(err,data){
                            res.json({'isError':false,'message':'comment success!','reply':data,'totalReply':newTotal});
                        });
                    })
                }
            });
        }; 
    });
};
