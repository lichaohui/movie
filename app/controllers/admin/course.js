/*----后台操作course的控制器----*/
//引入model模型
var course=require('../../models/course');
//引入underscore模块可以用来更新数据
var underscore=require('underscore');

//展示课程列表的方法
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
            
            res.render('admin/course/list',{'title':'course','courses':pageData,'condition':condition,'pageLength':pageLength,'curPage':page,'isAll':isAll});
        }
    };
    
    //声明一个condition变量用来承载条件
    var condition;
    //声明一个变量用来承载是否显示的全部的二级分类
    var isAll;
    if(req.query.firstcate==null && req.query.secondcate==null){
        isAll=true;
        condition='';
        //调用course模型的fetch方法遍历数据传递给前台展示
        course.fetch(callback);
    }else if(req.query.secondcate==null){
        isAll=false;
        condition='firstcate='+req.query.firstcate+'&';
        course.findByFirstcate(req.query.firstcate,callback);
    }else if(req.query.firstcate==null){
        isAll=true;
        condition='secondcate='+req.query.secondcate+'&';
        course.findBySecondcate(req.query.secondcate,callback);
    }else{
        isAll=false;
        condition='firstcate='+req.query.firstcate+'&secondcate='+req.query.secondcate+'&';
        course.findBySecondcate(req.query.secondcate,callback);
    }
};

//展示添加课程页面的方法
exports.create=function(req,res){
    res.render('admin/course/create',{'title':'course'}); 
};

//实现添加课程操作的方法
exports.store=function(req,res){
    //获取到表单传递过来的数据
    var postcourse=req.body;
    var newcourse=new course({
        'name':postcourse.name,
        'author':postcourse.author,
        'firstcate':postcourse.firstcate,
        'secondcate':postcourse.secondcate,
        'playbill':postcourse.playbill,
        'intro':postcourse.intro,
    });
    //调用save方法保存数据并在回调函数中重定向页面
    newcourse.save(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/course');
        }; 
    });
};

//获取某条具体记录的方法
exports.edit=function(req,res){
    var id=req.params.id;
    course.findById(id,function(err,data){
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
    var postcourse=req.body;
    //通过findById获取到要修改的那条数据
    course.findById(id,function(err,data){
        if(err){
            console.log(err);
        }else{
            /*
             * 通过underscore模块的extend()方法用表单提交过来的新数据替换之前的数据
             * 该方法有两个参数，
             * 第一个参数是要被替换掉的旧的数据
             * 第二个参数是新的数据
             */
            newcourse=underscore.extend(data,postcourse);
            //通过save方法保存数据并在回调函数中进行页面重定向
            newcourse.save(function(err,data){
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
    course.remove({_id:id},function(err,result){
        if(err){
            console.log(err);
        }else{
            //如果删除成功就给客户端返回一段json数据
            res.json({'message':'delete successfully!'});
        }
    });
};