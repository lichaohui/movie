/*----定义前台用户模块的所有方法----*/
//引入model模型
var user=require('../../models/user');

//显示用户注册页面的方法
exports.register=function(req,res){
    res.render('home/user/register',{'title':'register'});
};
//执行用户注册操作的方法
exports.doRegister=function(req,res){
    /*
     * 拿到表单发送过来的数据
     * 表单数据可以通过req.body拿到
     */
    var postuser=req.body;
    //先验证数据库中是否有重名的用户存在
    user.find({name:postuser.name},function(err,data){
        if(data.length>0){
            //如果有重名用户存在则返回json格式的错误信息
            res.json({'isError':true,'message':'该用户名已经存在了，请换个用户名重新注册！'});
        }else if(postuser.password!=postuser.passwordrepeat){
            //如果两次输入的密码不一致则返回错误信息
            res.json({'isError':true,'message':'两次输入的密码不一致，请重新输入密码！'});
        }else{
            /*
             * 如果用户名可以使用
             * 就通过表单发送的数据实例化user模型
             */
            var newuser=new user({
                'name':postuser.name,
                'password':postuser.password
            });
            //将数据保存到数据库
            newuser.save(function(err,user){
                if(err){
                    console.log(err);
                }else{
                    /*
                     * 如果注册成功则保存用户信息到req.session并返回成功信息
                     * 注意session是req（请求体）的，
                     * 所以session信息会在发生http请求的时候包含在请求体中
                     */
                    req.session.user=user;
                    /*
                     * 将session信息存入本地的变量中
                     * 这样在模板张就可以使用这些变量了
                     */
                    app.locals.user=req.session.user;
                    res.json({'isError':false,'message':'注册成功，即将跳转到首页!'});
                }
            });
        }
    });
};

//显示用户登录页面的方法
exports.login=function(req,res){
    res.render('home/user/login',{'title':'login'});
};
//实现用户登录功能的路由
exports.doLogin=function(req,res){
    //获取到表单提交的数据
    var postuser=req.body;
    /*
     * 通过findOne方法搜索指定的用户是否存在
     */
    user.findOne({name:postuser.name},function(err,data){
        if(data){
            /*
             * 如果用户存在则继续验证密码
             * 调用我们自己在schema中定义的comparePassword()方法进行验证
             */
            data.comparePassword(postuser.password,function(err,isMatch){
                if(err){
                    console.log(err);
                }else{
                    if(isMatch){
                        /*
                         * 如果登录成功则保存用户信息到req.session并返回成功信息
                         * 注意session是req（请求体）的，
                         * 所以session信息会在发生http请求的时候包含在请求体中
                         */
                        req.session.user=data;
                        /*
                         * 将session信息存入本地的变量中
                         * 这样在模板张就可以使用这些变量了
                         */
                        app.locals.user=req.session.user;
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

//实现用户登出功能的方法
exports.logout=function(req,res){
    //删除session
    delete req.session.user;
    //将本地的user变量置空
    app.locals.user=null;
    //跳转到登录界面 
    res.redirect('/login');
};
