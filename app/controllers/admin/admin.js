/*----后台操作admin的控制器----*/
//引入model模型
var admin=require('../../models/admin');
//引入underscore模块可以用来更新数据
var underscore=require('underscore');

//验证管理员是否是admin的方法
exports.verifyAdmin=function(req,res,next){
    //判断管理员是否是残疾管理员
    if(req.session.admin.name=='admin'){
        //如果是则next()
        next();
    }else{
        //如果不是则返回错误页面
        res.render('/error',{'message':'The page you are looking for is not found!'});
    }
};

//展示管理员登录界面的方法
exports.login=function(req,res){
    res.render('admin/admin/login',{'title':'login'}); 
};
//执行管理员登录的方法
exports.doLogin=function(req,res){
    //获取到表单提交的数据
    var postadmin=req.body;
    /*
     * 通过findOne方法搜索指定的用户是否存在
     */
    admin.findOne({name:postadmin.name},function(err,data){
        if(data){
            /*
             * 如果用户存在则继续验证密码
             * 调用我们自己在schema中定义的comparePassword()方法进行验证
             */
            data.comparePassword(postadmin.password,function(err,isMatch){
                if(err){
                    console.log(err);
                }else{
                    if(isMatch){
                        /*
                         * 如果登录成功则保存用户信息到req.session并返回成功信息
                         * 注意session是req（请求体）的，
                         * 所以session信息会在发生http请求的时候包含在请求体中
                         */
                        req.session.admin=data;
                        res.json({'isError':false,'message':'登录成功，即将进入首页！！'});
                    }else{
                        //如果密码不匹配则返回错误信息
                        res.json({'isError':true,'message':'密码错误！'});
                    }
                }
            });
        }else{
            //如果用户不存在则返回错误信息
            res.json({'isError':true,'message':'该用户不存在！'});
        }
    });
};
//执行管理员退出操作的方法
exports.logout=function(req,res){
    //删除session
    delete req.session.admin;
    //跳转到登录界面 
    res.redirect('/admin/login');
};

//展示管理员列表的方法
exports.index=function(req,res){
    //调用admin模型的fetch方法遍历数据传递给前台展示
    admin.fetch(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.render('admin/admin/list',{'title':'admin','admins':data});
        }
    })
};

//展示添加管理员页面的方法
exports.create=function(req,res){
    res.render('admin/admin/create',{'title':'admin'}); 
};

//实现添加管理员操作的方法
exports.store=function(req,res){
    //获取到表单传递过来的数据
    var postadmin=req.body;
    var newadmin=new admin({
        'name':postadmin.name,
        'password':postadmin.password,
        'level':0
    });
    //调用save方法保存数据并在回调函数中重定向页面
    newadmin.save(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/admin');
        }; 
    });
};

//获取某条具体记录的方法
exports.edit=function(req,res){
    var id=req.params.id;
    admin.findById(id,function(err,data){
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
    var postadmin=req.body;
    //通过findById获取到要修改的那条数据
    admin.findById(id,function(err,data){
        if(err){
            console.log(err);
        }else{
            /*
             * 通过underscore模块的extend()方法用表单提交过来的新数据替换之前的数据
             * 该方法有两个参数，
             * 第一个参数是要被替换掉的旧的数据
             * 第二个参数是新的数据
             */
            newadmin=underscore.extend(data,postadmin);
            //通过save方法保存数据并在回调函数中进行页面重定向
            newadmin.save(function(err,data){
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
    admin.remove({_id:id},function(err,result){
        if(err){
            console.log(err);
        }else{
            //如果删除成功就给客户端返回一段json数据
            res.json({'message':'delete successfully!'});
        }
    });
};