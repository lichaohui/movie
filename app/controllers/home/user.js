/*----定义前台用户模块的所有方法----*/
//引入model模型
var user=require('../../models/user');
var usermsg=require('../../models/usermsg');
//引入ecrypt控制器来对密码进行加密
var encrypt=require('../common/encrypt');
//引入underscore模块可以用来更新数据
var underscore=require('underscore');

//显示用户注册页面的方法
exports.register=function(req,res){
    res.render('home/user/register',{'title':'register'});
};

//检查用户注册时提供的手机号或邮箱是否可用的方法
function unique(req,res,next){
    //设置回调函数
    var errMsg;
    var callback=function(err,data){
        if(data.length>0){
            res.json({'isError':true,'message':errMsg});
        }else{
            next();
        }
    };
    //通过switch用户的注册方式来执行不同的查询操作
    switch(req.body.type){
        case 'phone':
            errMsg='该手机号已经被注册过了';
            //如果用户是通过手机注册则验证用户的手机号是否可用
            user.findByPhone(req.body.phone,callback);
        break;
        case 'email':
            errMsg='该邮箱已经被注册过了';
             //如果用户是通过邮箱注册则验证用户的邮箱是否可用
            user.findByEmail(req.body.email,callback);
        break;    
    }
};

//检查用户登录时提供的手机号或邮箱是否存在的方法
function exists(req,res,next){
    //设置回调函数
    var errMsg;
    var callback=function(err,data){
        if(data.length==0){
            res.json({'isError':true,'message':errMsg});
        }else{
            next();
        }
    };
    //通过switch用户的验证方式来执行不同的查询操作
    switch(req.body.type){    
        case 'phone':
            errMsg='该手机号不存在！';
            //如果用户是通过手机注册则验证用户的手机号是否可用
            user.findByPhone(req.body.phone,callback);
        break;
        case 'email':
            errMsg='该邮箱不存在！';
             //如果用户是通过邮箱注册则验证用户的邮箱是否可用
            user.findByEmail(req.body.email,callback);
        break;   
    }
};


/*
 * check方法通过用户不同的操作来验证用户的手机/邮箱等是否合法
 */
exports.check=function(req,res,next){
    switch(req.body.operating){
        case 'register':
            /*
             * 当用户的操作为注册(register)时
             * 就调用unique方法验证用户提交的手机/邮箱是否唯一（还没有被使用过）
             */
            unique(req,res,next);
        break;
        case 'login':
            /*
             * 当用户的操作为登录(login)时
             * 就调用exists方法验证用户提交的手机/邮箱是否存在
             */
            exists(req,res,next);
        break;    
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
    /*
     * 通过表单发送的数据实例化user模型
     */
    var newuser=new user({
        'password':postuser.password,
        'phone':postuser.phone,
        'email':postuser.email,
    });
    //将数据保存到数据库
    newuser.save(function(err,user){
        if(err){
            console.log(err);
        }
        /*
         * 如果user表中的数据保存成功，
         * 则再向usermsg表中插入数据
         * uid是关联user表中的_id
         * name就先给个默认的
         */
        
        var newusermsg=new usermsg({
            uid:user._id,
            name:'无名氏'
        });
        newusermsg.save(function(err,usermsg){
            /*
             * 如果注册成功则保存用户信息到req.session并返回成功信息
             * 注意session是req（请求体）的，
             * 所以session信息会在发生http请求的时候包含在请求体中
             */
            req.session.user=usermsg;
            res.json({'isError':false,'message':'注册成功，即将跳转到首页!'});
        })
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
//显示邮箱/手机验证登录界面的方法
exports.vlogin=function(req,res){
    res.render('home/user/vlogin',{'title':'login'});
};
exports.vlogin1=function(req,res){
    res.render('home/user/vlogin1',{'title':'login','type':req.query.type,'val':req.query.val});
};
//实现用户登录功能的路由
exports.doLogin=function(req,res){
    //获取到表单提交的数据
    var postuser=req.body;
    /*
     * 通过login方法判断指定的用户是否存在
     */
    user.findOne({$or:[{email:postuser.account },{phone:postuser.account}]},function(err,data){
        if(data){
            /*
             * 如果用户存在则继续验证密码
             * 调用我们自己在schema中定义的comparePassword()方法进行验证
             */
            data.comparePassword(postuser.password,function(err,isMatch){
                if(isMatch){
                    /*
                     * 如果登录成功则保存用户信息到req.session并返回成功信息
                     * 注意session是req（请求体）的，
                     * 所以session信息会在发生http请求的时候包含在请求体中
                     */
                    usermsg.findByUid(data._id,function(err,umsg){
                        req.session.user=umsg;
                        res.json({'isError':false,'message':'登录成功，即将载入！'});
                    })
                }else{
                    //如果密码不匹配则返回错误信息
                    res.json({'isError':true,'message':'密码错误！'});
                }
            });
        }else{
            //如果用户不存在则返回错误信息
            res.json({'isError':true,'message':'该用户不存在！'});
        }
    });
};

//比较密码和确认密码是否一致的方法
exports.comparepass=function(req,res,next){
    if(req.body.password==req.body.passwordrepeat){
        //如果密码和确认密码一致则进入下一步
        next();
    }else{
        //如果两次输入的密码不一致则返回错误信息
        res.json({'isError':true,'message':'两次输入的密码不一致，请重新输入密码！'});
    }
};

//实现用户忘记密码后用手机/邮箱验证登录并重置密码的方法
exports.dovlogin=function(req,res){
    //先查询出符合条件的用户
    user.findOne({$or:[{'email':req.body.name},{'phone':req.body.name}]},function(err,data){
        /*
         * 如果用户查询出来了则使用update()方法更新用户的密码
         * 有三个参数：
         * 第一个参数表示要更新哪条记录
         * 第二个参数是json格式，
         * 表示要更新那些字段成什么样子
         * update的回调方法中有一个参数err
         * 表示更新中出的错
         */
        user.update(data,{$set:{'password':req.body.password}},function(err){
            //如果密码更新成功则将data存储到session中并返回成功信息
            usermsg.findByUid(data._id,function(err,umsg){
                req.session.user=umsg;
                res.json({'isError':false,'message':'密码更新成功！即将进入首页！'});
            })
        });
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
    usermsg.findByUid(id,function(err,data){
        res.render('home/user/index',{'title':'我的主页','user':data});
    });
};

//展示某个用户账户信息的方法
exports.show=function(req,res){
    var id=req.params.id;
    user.findById(id,function(err,data){
        res.render('home/user/account',{'title':'账户信息','account':data});
    });
}

//更新用户账户信息的方法
exports.update=function(req,res){
    //拿到表单提交过来的要修改的数据的_id
    var id=req.body.id;
    //通过findById获取到要修改的那条数据
    user.findById(id,function(err,data){
        if(err){
            console.log(err);
        }else{
            /*
             * 通过underscore模块的extend()方法用表单提交过来的新数据替换之前的数据
             * 该方法有两个参数，
             * 第一个参数是要被替换掉的旧的数据
             * 第二个参数是新的数据
             */
            newuser=underscore.extend(data,req.body);
            //通过save方法保存数据并在回调函数中进行页面重定向
            newuser.save(function(err,data){
                if(err){
                    console.log(err);
                }else{
                    res.json({'isError':false,'message':'恭喜！您的账户信息更新成功!'});
                }; 
            });
        }
    });
}
