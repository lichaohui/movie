/*
 * 前台comment模块控制器
 * 该控制器定义了所有关于comment模块的方法
 */
//引入model模型
var comment=require('../../models/comment');
var reply=require('../../models/reply');

//加载某个url下更多评论的方法
exports.viewMore=function(req,res){
    //获取参数中的值
    var from=req.query.from;
    var limit=req.query.limit;
    var url=req.query.url;
    var uid=req.query.uid;
    if(uid==null){
        //如果uid为空则获取某个url下的评论
        comment.findMoreByUrl(url,from,limit,function(err,data){
            if(err){
                res.json({'isError':true,'message':'加载失败，请稍后再试！'});
            }else{
                res.send(data);
            }
        });
    }else{
        //如果uid不为空则获取的是某个用户的评论
        comment.findMoreByUser(uid,from,limit,function(err,data){
            if(err){
                res.json({'isError':true,'message':'加载失败，请稍后再试！'});
            }else{
                res.send(data);
            }
        });
    }
},  
    
//保存评论的方法
exports.store=function(req,res){
    //获取到表单传递过来的数据
    var postcomment=req.body;
    var newcomment=new comment({
        'url':postcomment.url,
        'pageTitle':postcomment.pageTitle,
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

//获取某个用户所有评论的方法
exports.index=function(req,res){
    var uid=req.query.uid;
    comment.findByUser(uid,function(err,data){
        res.render('home/user/comment',{'title':'我的评论','comments':data});
    });
};

//删除某条评论及评论下所有回复的方法
exports.delete=function(req,res){
    var id=req.params.id;
    comment.findByIdAndRemove(id,function(err,data){
        if(err){
            console.log(err);
        }else{
            reply.remove({'toWhichComment':id},function(err,data){
                res.json({'message':'删除成功!'});
            });
        }
    });
}
