/*
 * 前台video模块控制器
 * 该控制器定义了所有关于video模块的方法
 */
//引入model模型
var video=require('../../models/video');
var course=require('../../models/course');
var learn=require('../../models/learn');

//显示video列表的方法
exports.index=function(req,res){
    //设置每页的显示条数
    var limit=10;
    
    /*
     * 通过一个三元表达式来设置page
     * 如果page参数存在则page等于参数中的page
     * 如果不存在则默认为1
     */
    var page;
    req.query.page ? page=parseInt(req.query.page) : page=1;
    
    //回调函数
    var callback=function(err,data){
        if(err){
            console.log(err);
        }else{
            
            //一共有多少页就是math.ceil(数据的总长度除以每页显示多少条)
            var pageLength=Math.ceil(data.length/limit);
            //从所有数据中返回当前页应有的数据
            var pageData=data.slice((page-1)*limit,page*limit);
            res.render('home/video/index',{'title':req.query.course,'cid':cid,'learn':req.params.learndata,'videos':pageData,'condition':condition,'pageLength':pageLength,'curPage':page});
        }
    };
    //获取请求参数中的课程id
    var cid=req.query.cid;
    //设置条件
    var condition='cid='+cid+'&'+'course='+req.query.course+'&';
    //查询出数据来
    video.findByCourse(cid,callback);
};

//播放指定video的方法
exports.show=function(req,res,next){
    //获取参数中的id
    var id=req.params.id;
    //通过id获取数据并将数据发送给前台视图
    video.findById(id,function(err,data){
        req.params.video=data;
        next();
    });
}

//播放指定video后操作learn表的方法
exports.querylearn=function(req,res){
    var video=req.params.video;
    //先通过用户的id和当前的课程id查询learn表中该用户有没有学习过该课程
    learn.findByUC(req.session.user._id,video.course,function(err,data){
        if(data==null){
            /*
             * 如果该用户没有学习过该课程
             * 则向learn表中插入一条数据
             */
            var newlearn=new learn({
                'uid':req.session.user._id,
                'cid':video.course,
                'lastque':video.queue,
            });
            newlearn.save(function(err,data){
                if(err){
                    console.log(err);
                }else{
                    /*
                     * 然后更新课程表中的学习人数的字段
                     * 将该字段在原有的基础上加1
                     */
                    course.update({_id:video.course},{$inc:{learner:1}},function(err){
                        console.log(err);
                    });
                }
            })
        }else{
            /*
             * 如果data.length大于0
             * 则证明该用户学习过该课程
             * 那么久更新learn表中的上一次学习课时字段(lastque)
             */
            data.lastque=video.queue;
            data.save(function(err,data){
                if(err){
                    console.log(err);
                }
            });
        }
        //加载当前视频的评论并将数据返回给前台视图
        res.render('home/video/detail',{'title':video.name,'video':video,'comments':req.params.comments}); 
    })
}
