/*----后台操作secondcate的控制器----*/
//引入model模型
var secondcate=require('../../models/secondcate');
//引入underscore模块可以用来更新数据
var underscore=require('underscore');

//展示二级分类列表的方法
exports.index=function(req,res){
    //设置每页的显示条数
    var limit=1;
    //设置condition变量用来承载条件
    var condition;
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
            res.render('admin/secondcate/index',{'title':'secondcate','secondcates':pageData,'pageLength':pageLength,'curPage':page,'condition':condition});
        }
    };
    
    if(req.query.parent==null){
        /*
         * 如果不是通过父级分类来进行搜索的
         * 那么条件condition就等于''
         * 就查询出所有的二级分类返回给前台
         */
        condition={'value':'','string':''};
        secondcate.fetch(callback);
    }else{
        /*
         * 如果是通过父级分类来进行条件搜索的
         * 就查询出指定父级分类的二级分类返回给前台
         * 并将条件condition设置一下
         */
        condition={
            'value':req.query.parent,
            'string':'parent='+req.query.parent+'&'
        };
        secondcate.findByParent(req.query.parent,callback);
    }
};

//查找同个一级分类下所有二级分类的方法
exports.query=function(req,res){
    var pid=req.query.pid;
    secondcate.findByParent(pid,function(err,data){
        if(err){
            res.json({'isError':true,'message':'加载出错，请稍后再试！'});
        }else{
            res.send(data);
        }
    })
};

//展示添加二级分类页面的方法
exports.create=function(req,res){
    res.render('admin/secondcate/create',{'title':'secondcate'}); 
};

//实现添加二级分类操作的方法
exports.store=function(req,res){
    //获取到表单传递过来的数据
    var postsecondcate=req.body;
    var newsecondcate=new secondcate({
        'name':postsecondcate.name,
        'parentcate':postsecondcate.parentcate
    });
    //调用save方法保存数据并在回调函数中重定向页面
    newsecondcate.save(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/secondcate');
        }; 
    });
};

//获取某条具体记录的方法
exports.edit=function(req,res){
    var id=req.params.id;
    secondcate.findById(id,function(err,data){
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
    var id=req.body.id;
    //拿到表单提交过来的数据
    var postsecondcate=req.body;
    //通过findById获取到要修改的那条数据
    secondcate.findById(id,function(err,data){
        if(err){
            console.log(err);
        }else{
            /*
             * 通过underscore模块的extend()方法用表单提交过来的新数据替换之前的数据
             * 该方法有两个参数，
             * 第一个参数是要被替换掉的旧的数据
             * 第二个参数是新的数据
             */
            newsecondcate=underscore.extend(data,postsecondcate);
            //通过save方法保存数据并在回调函数中进行页面重定向
            newsecondcate.save(function(err,data){
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
    secondcate.remove({_id:id},function(err,result){
        if(err){
            console.log(err);
        }else{
            //如果删除成功就给客户端返回一段json数据
            res.json({'message':'delete successfully!'});
        }
    });
};