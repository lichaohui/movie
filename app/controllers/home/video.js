/*
 * 前台video模块控制器
 * 该控制器定义了所有关于video模块的方法
 */
//引入model模型
var video=require('../../models/video');
//引用下comment控制器
var comment=require('../../models/comment');

//显示video列表的方法
exports.index=function(req,res){
    
    //如果没有按分类搜索
    if(req.query.firstcate=="" && req.query.secondcate==""){
        //调用video模型的fetch方法遍历数据传递给前台展示
        video.fetch(function(err,data){
            if(err){
                console.log(err);
            }else{
                res.render('home/video/index',{'title':'video','videos':data});
            }
        });
    }else if(req.query.secondcate==""){
        video.findByFirstcate(req.query.firstcate,function(err,data){
            if(err){
                console.log(err);
            }else{
                res.render('home/video/index',{'title':'video','videos':data});
            }
        });
    }else{
        video.findBySecondcate(req.query.secondcate,function(err,data){
            if(err){
                console.log(err);
            }else{
                res.render('home/video/index',{'title':'video','videos':data});
            }
        });
    }
};

//播放指定video的方法
exports.show=function(req,res){
    //获取参数中的id
    var id=req.params.id;
    //获取当前页面的url地址(不包含协议和域名)
    var url=req.url;
    //通过id获取数据并将数据发送给前台视图
    video.findById(id,function(err,data){
        comment.findByUrl(url,function(err,comments){
            res.render('home/video/detail',{'title':data.name,'video':data,'comments':comments});
        });
    });
}
