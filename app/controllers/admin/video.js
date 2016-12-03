/*----后台操作video的控制器----*/
//引入model模型
var video=require('../../models/video');
var course=require('../../models/course');
//引入underscore模块可以用来更新数据
var underscore=require('underscore');

//展示视频列表的方法
exports.index=function(req,res){
    //设置每页的显示条数
    var limit=4;
    
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
            
            res.render('admin/video/list',{'title':'course','cid':cid,'videos':pageData,'condition':condition,'pageLength':pageLength,'curPage':page});
        }
    };
    //获取请求参数中的课程id
    var cid=req.query.cid;
    //设置条件
    var condition='cid='+cid;
    //查询出数据来
    video.findByCourse(cid,callback);
};

//展示添加视频页面的方法
exports.create=function(req,res){
    //查询出要给那个课程添加视频
    course.findById(req.query.cid,function(err,data){
        //然后渲染页面
        res.render('admin/video/create',{'title':'course','course':data}); 
    })
};

//实现添加视频操作的方法
exports.store=function(req,res){
    //获取到表单传递过来的数据
    var postvideo=req.body;
    var newvideo=new video({
        'name':postvideo.name,
        'queue':postvideo.queue,
        'course':postvideo.course,
        'src':postvideo.src,
        'intro':postvideo.intro,
    });
    //调用save方法保存数据并在回调函数中重定向页面
    newvideo.save(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/video?cid='+postvideo.course);
        }; 
    });
};

//获取某条具体记录的方法
exports.edit=function(req,res){
    var id=req.params.id;
    video.findById(id,function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    })
};

//更新某条记录的方法
exports.update=function(req,res){
    //拿到表单提交过来的要修改的数据的_id
    var id=req.params.id;
    //拿到表单提交过来的数据
    var postvideo=req.body;
    //通过findById获取到要修改的那条数据
    video.findById(id,function(err,data){
        if(err){
            console.log(err);
        }else{
            /*
             * 通过underscore模块的extend()方法用表单提交过来的新数据替换之前的数据
             * 该方法有两个参数，
             * 第一个参数是要被替换掉的旧的数据
             * 第二个参数是新的数据
             */
            newvideo=underscore.extend(data,postvideo);
            //通过save方法保存数据并在回调函数中进行页面重定向
            newvideo.save(function(err,data){
                if(err){
                    console.log(err);
                }else{
                    res.send('update successfully!');
                }; 
            });
        }
    });
};

//删除某条记录的方法
exports.delete=function(req,res){
    var id=req.params.id;
    video.remove({_id:id},function(err,result){
        if(err){
            console.log(err);
        }else{
            //如果删除成功就给客户端返回一段json数据
            res.json({'message':'delete successfully!'});
        }
    });
};