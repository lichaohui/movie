/*----定义前台用户模块的所有方法----*/
//引入model模型
var user=require('../../models/user');

//显示用户注册页面的方法
exports.register=function(req,res){
    res.render('home/user/register',{'title':'register'});
};

//检查用户提供的手机号和邮箱是否可用的方法
exports.unique=function(req,res,next){
    if(req.body.type=='phone'){
        //如果用户是通过手机注册则验证用户的手机号是否可用
        user.findByPhone(req.body.phone,function(err,data){
            /*
             * 如果有数据被查询出来
             * 则证明用户输入的手机和邮箱已经被使用过了
             * 返回信息给客户端
             */
            if(data.length>0){
                res.json({'isError':true,'message':'该手机号已经被注册过了！'});
            }else{
                //如果手机号可以使用则进入下一步
                next();
            }
        });
    }else if(req.body.type=='email'){
        //如果用户是通过邮箱注册则验证用户的邮箱是否可用
        user.findByEmail(req.body.email,function(err,data){
            if(data.length>0){
                res.json({'isError':true,'message':'该邮箱已经被注册过了！'});
            }else{
                //如果邮箱可以使用则进入下一步
                next();
            }
        })
    }
};

//展示第二个注册页面的方法
exports.register1=function(req,res){
    res.render('home/user/register1',{'title':'register','type':req.query.type,'val':req.query.val});
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
                'password':postuser.password,
                'phone':postuser.phone,
                'email':postuser.email,
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
                    res.json({'isError':false,'message':'注册成功，即将跳转到首页!'});
                }
            });
        }
    });
};

//验证用户是否登录的方法
exports.verifyLogin=function(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.redirect('');
    }
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
     * 通过login方法判断指定的用户是否存在
     */
    user.findOne({$or:[{name:postuser.account},{email:postuser.account },{phone:postuser.account}]},function(err,data){
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
                        res.json({'isError':false,'message':'登录成功，即将载入！'});
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
    //跳转到登录界面 
    res.redirect('/login');
};

//显示用户主页的方法
exports.index=function(req,res){
    var id=req.params.id;
    user.findById(id,function(err,data){
        res.render('home/user/index',{'title':data.name,'user':data});
    });
};
