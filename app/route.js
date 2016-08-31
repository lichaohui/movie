//引入前台控制器文件
var index=require('./controllers/home/index');
var movie=require('./controllers/home/movie');
var user=require('./controllers/home/user');

//引入后台控制器文件
var adminMovie=require('./controllers/admin/movie');
var adminUser=require('./controllers/admin/user');

module.exports=function(app){
    /*
     * 设置“/”前台首页路由
     * 执行index控制器中的index方法
     */
    app.get('/',index.index);

    //前台电影列表页路由
    app.get('/movie',movie.index);

    //设置前台详情页路由
    app.get('/movie/detail/:id',movie.show);

    //展示用户注册界面的路由
    app.get('/register',user.register);
    //实现用户注册功能的路由
    app.post('/doregister',user.doRegister);

    //用户登录的路由
    app.get('/login',user.login);
    //实现用户登录功能的路由
    app.post('/dologin',user.doLogin);

    /*----后台路由----*/
    //后台展示用户列表的路由
    app.get('/admin/user',adminUser.index);

    //后台电影列表页的路由
    app.get('/admin/movie',adminMovie.index);
    //展示后台添加电影页面的路由
    app.get('/admin/movie/create',adminMovie.create);
    //后台执行添加电影操作的路由
    app.post('/admin/movie/store',adminMovie.store);
    //更新某个电影记录获取该记录的路由
    app.get('/admin/movie/edit/:id',adminMovie.edit);
    //执行更新电影操作的路由
    app.put('/admin/movie/update/:id',adminMovie.update);
    //执行删除电影操作的路由
    app.delete('/admin/movie/delete/:id',adminMovie.delete);    
}