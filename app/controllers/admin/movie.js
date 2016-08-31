/*----后台操作movie的控制器----*/
//引入model模型
var movie=require('../../models/movie');
//引入underscore模块可以用来更新数据
var underscore=require('underscore');

//展示电影列表的方法
exports.index=function(req,res){
    //调用movie模型的fetch方法遍历数据传递给前台展示
    movie.fetch(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.render('admin/movie/list',{'title':'movie','movies':data});
        }
    })
};

//展示添加电影页面的方法
exports.create=function(req,res){
    res.render('admin/movie/create',{'title':'movie'}); 
};

//实现添加电影操作的方法
exports.store=function(req,res){
    //获取到表单传递过来的数据
    var postmovie=req.body;
    var newmovie=new movie({
        'name':postmovie.name,
        'director':postmovie.director,
        'type':postmovie.type,
        'src':postmovie.src,
        'country':postmovie.country,
        'playbill':postmovie.playbill,
        'intro':postmovie.intro,
    });
    //调用save方法保存数据并在回调函数中重定向页面
    newmovie.save(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/movie');
        }; 
    });
};

//获取某条具体记录的方法
exports.edit=function(req,res){
    var id=req.params.id;
    movie.findById(id,function(err,data){
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
    var postmovie=req.body;
    //通过findById获取到要修改的那条数据
    movie.findById(id,function(err,data){
        if(err){
            console.log(err);
        }else{
            /*
             * 通过underscore模块的extend()方法用表单提交过来的新数据替换之前的数据
             * 该方法有两个参数，
             * 第一个参数是要被替换掉的旧的数据
             * 第二个参数是新的数据
             */
            newmovie=underscore.extend(data,postmovie);
            //通过save方法保存数据并在回调函数中进行页面重定向
            newmovie.save(function(err,data){
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
    movie.remove({_id:id},function(err,result){
        if(err){
            console.log(err);
        }else{
            //如果删除成功就给客户端返回一段json数据
            res.json({'message':'delete successfully!'});
        }
    });
};