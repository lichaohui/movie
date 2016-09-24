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
    //设置每页的显示条数
    var limit=2;
    
    /*
     * 通过一个三元表达式来设置page
     * 如果page参数存在则page等于参数中的page
     * 如果不存在则默认为1
     */
    var page;
    req.query.page ? page=req.query.page : page=1;
    
    //回调函数
    var callback=function(err,data){
        if(err){
            console.log(err);
        }else{
            //一共有多少页就是math.ceil(数据的总长度除以每页显示多少条)
            var pageLength=Math.ceil(data.length/limit);
            //从所有数据中返回当前页应有的数据
            var pageData=data.slice((page-1)*limit,page*limit);
            
            res.render('home/video/index',{'title':'video','videos':pageData,'condition':condition,'pageLength':pageLength});
        }
    };
    
    //声明一个condition变量用来承载条件
    var condition;
    if(req.query.firstcate==null && req.query.secondcate==null){
        condition='';
        //调用video模型的fetch方法遍历数据传递给前台展示
        video.fetch(callback);
    }else if(req.query.secondcate==null){
        condition='firstcate='+req.query.firstcate+'&';
        video.findByFirstcate(req.query.firstcate,callback);
    }else{
        condition='firstcate='+req.query.firstcate+'&secondcate='+req.query.secondcate+'&';
        video.findBySecondcate(req.query.secondcate,callback);
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
