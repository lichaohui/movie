/*----后台操作firstcate的控制器----*/
//引入model模型
var firstcate=require('../../models/firstcate');
//引入underscore模块可以用来更新数据
var underscore=require('underscore');

//展示一级分类列表的方法
exports.index=function(req,res){
    //调用firstcate模型的fetch方法遍历数据传递给前台展示
    firstcate.fetch(function(err,data){
        if(err){
            console.log(err);
        }else{
            if(req.query.isAjax){
                res.send(data);
            }else{
                res.render('admin/firstcate/index',{'title':'firstcate','firstcates':data});
            }
        }
    })
};

//遍历一级分类列表的方法
exports.query=function(req,res,next){
    //调用firstcate模型的fetch方法遍历数据传递给前台展示
    firstcate.fetch(function(err,data){
        if(err){
            console.log(err);
        }else{
            req.session.firstcates=data;
            next();
        }
    })
};

//展示添加一级分类页面的方法
exports.create=function(req,res){
    res.render('admin/firstcate/create',{'title':'firstcate'}); 
};

//实现添加一级分类操作的方法
exports.store=function(req,res){
    //获取到表单传递过来的数据
    var postfirstcate=req.body;
    var newfirstcate=new firstcate({
        'name':postfirstcate.name,
    });
    //调用save方法保存数据并在回调函数中重定向页面
    newfirstcate.save(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/firstcate');
        }; 
    });
};

//获取某条具体记录的方法
exports.edit=function(req,res){
    var id=req.params.id;
    firstcate.findById(id,function(err,data){
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
    var postfirstcate=req.body;
    //通过findById获取到要修改的那条数据
    firstcate.findById(id,function(err,data){
        if(err){
            console.log(err);
        }else{
            /*
             * 通过underscore模块的extend()方法用表单提交过来的新数据替换之前的数据
             * 该方法有两个参数，
             * 第一个参数是要被替换掉的旧的数据
             * 第二个参数是新的数据
             */
            newfirstcate=underscore.extend(data,postfirstcate);
            //通过save方法保存数据并在回调函数中进行页面重定向
            newfirstcate.save(function(err,data){
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
    firstcate.remove({_id:id},function(err,result){
        if(err){
            console.log(err);
        }else{
            //如果删除成功就给客户端返回一段json数据
            res.json({'message':'delete successfully!'});
        }
    });
};