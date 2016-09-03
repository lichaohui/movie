/*
 * 前台movie模块控制器
 * 该控制器定义了所有关于movie模块的方法
 */
//引入model模型
var movie=require('../../models/movie');
//引用下comment控制器
var comment=require('../../models/comment');

//显示movie列表的方法
exports.index=function(req,res){
    //调用movie模型的fetch方法遍历数据传递给前台展示
    movie.fetch(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.render('home/movie/index',{'title':'movie','movies':data});
        }
    });
};

//播放指定movie的方法
exports.show=function(req,res){
    //获取参数中的id
    var id=req.params.id;
    //获取当前电影下的评论
    comment.fetch('movie','57c3dcae6803fad12c8b4567',function(err,comments){
        console.log("aaaaaa "+comments.length);
        //通过id获取数据并将数据发送给前台视图
        movie.findById(id,function(err,data){
            res.render('home/movie/detail',{'title':'detail','movie':data,'comments':comments});
        });
    });
}
