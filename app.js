//引入express
var express=require("express");
var app=express();
//引入bodyParser用来格式化表单数据
var bodyParser = require('body-parser');
//引入mongoose模块用来操作mongo数据库
var mongoose=require('mongoose');
//引入underscore模块可以用来更新数据
var underscore=require('underscore');
//引入moment模块用来格式化时间
app.locals.moment=require('moment');

//引入model模型
var user=require('./models/user');
var movie=require('./models/movie');

//设置模板引擎
app.set('view engine','jade');
//设置视图的根目录
app.set('views','./views');

//设置资源文件的存放位置
var serveStatic = require('serve-static');
app.use(serveStatic('public'));

//设置表单提交数据的格式化
app.use(bodyParser.urlencoded({extended: true}));

//连接数据库
mongoose.connect('mongodb://localhost/imooc');

//设置服务端口为环境变量总的port，如果不存在就设置为3000
var port=process.env.PORT || 3000;

//启动服务并监听端口
app.listen(port);

console.log('server running at port: '+port);

/*
 * 设置“/movie”前台首页电影路由
 * 通过render方法将jade模板文件编译后返回给前台
 * render()函数有两个参数：
 * 第一个参数是要编译的jade模板文件的路径
 * 第二个参数是附带传递给模板文件的变量，
 * 传递的变量用一个json格式表示
 */
app.get('/movie',function(req,res){
    //调用movie模型的fetch方法遍历数据传递给前台展示
    movie.fetch(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.render('home/movie/index',{'title':'index','movies':data});
        }
    })
});

//设置前台详情页路由
app.get('/movie/detail/:id',function(req,res){
    //获取参数中的id
    var id=req.params.id;
    //通过id获取数据并将数据发送给前台视图
    var data=movie.findById(id,function(err,data){
        res.render('home/movie/detail',{'title':'detail','movie':data});
    });
});

//展示用户注册界面的路由
app.get('/register',function(req,res){
    res.render('home/user/register',{'title':'register'});
});
//实现用户注册功能的路由
app.post('/doregister',function(req,res){
    /*
     * 拿到表单发送过来的数据
     * 表单数据可以通过req.body拿到
     */
    var postuser=req.body;
    //通过表单发送的数据实例化user模型
    var newuser=new user({
        'name':postuser.name,
        'password':postuser.password
    });
    //将数据保存到数据库
    newuser.save(function(err,user){
        
        if(err){
            console.log(err);
        }else{
            res.redirect('/movie');
        }
    });
});

//用户登录的路由
app.get('/login',function(req,res){
    res.render('home/user/login',{'title':'login'});
});


/*----后台路由----*/
//后台列表页的路由
app.get('/admin/movie/list',function(req,res){
    //调用movie模型的fetch方法遍历数据传递给前台展示
    movie.fetch(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.render('admin/movie/list',{'title':'list','movies':data});
        }
    })
});

//展示后台添加页面的路由
app.get('/admin/movie/create',function(req,res){
    res.render('admin/movie/create',{'title':'create'}); 
});
//后台执行添加操作的路由
app.post('/admin/movie/store',function(req,res){
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
            res.redirect('/admin/movie/list');
        }; 
    });
});

//更新某个记录获取该记录的路由
app.get('/admin/movie/edit/:id',function(req,res){
    var id=req.params.id;
    movie.findById(id,function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    })
});
//执行更新操作的路由
app.put('/admin/movie/update/:id',function(req,res){
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
});
//执行删除操作的路由
app.delete('/admin/movie/delete/:id',function(req,res){
    var id=req.params.id;
    movie.remove({_id:id},function(err,result){
        if(err){
            console.log(err);
        }else{
            //如果删除成功就给客户端返回一段json数据
            res.json({'message':'delete successfully!'});
        }
    });
});
