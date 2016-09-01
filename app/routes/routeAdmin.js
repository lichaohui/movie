//引入后台控制器文件
var movie=require('../controllers/admin/movie');
var user=require('../controllers/admin/user');
var admin=require('../controllers/admin/admin')(app);

module.exports=function(app){
    /*
     * 定义一个中间件，
     * 所有路由被执行之前都会先执行这个中间件
     * 这个中间件就用来看管理员是否登录吧
     * 只有登录的管理员才可以进入后台页面
     */
    app.use(admin.verifyLogin);
    
    /*
     * 定义一个
     */

    /*----后台路由----*/
    /*
     * 后台首页的路由，
     * 暂时先跳转到电影的列表页吧
     */
    app.get('/admin',movie.index);
    
    //显示管理员登录界面的路由
    app.get('/admin/login',admin.login);
    //执行管理员登录动作的路由
    app.post('/admin/doLogin',admin.doLogin);
    //管理员退出登录操作的路由
    app.get('/admin/logout',admin.logout);
    
    //显示所有管理员列表的路由
    app.get('/admin/admin',admin.index);
    //显示添加管理员页面的路由
    app.get('/admin/admin/create',admin.create);
    //执行添加管理员操作的路由
    app.post('/admin/admin/store',admin.store);
    //更新管理员时获取指定管理员记录的路由
    app.get('/admin/admin/edit/:id',admin.edit);
    //执行更新管理员操作的路由
    app.put('/admin/admin/update/:id',admin.update);
    //执行删除管理员操作的路由
    app.delete('/admin/admin/delete/:id',admin.delete);
    
    //后台展示用户列表的路由
    app.get('/admin/user',user.index);

    //后台电影列表页的路由
    app.get('/admin/movie',movie.index);
    //展示后台添加电影页面的路由
    app.get('/admin/movie/create',movie.create);
    //后台执行添加电影操作的路由
    app.post('/admin/movie/store',movie.store);
    //更新某个电影记录获取该记录的路由
    app.get('/admin/movie/edit/:id',movie.edit);
    //执行更新电影操作的路由
    app.put('/admin/movie/update/:id',movie.update);
    //执行删除电影操作的路由
    app.delete('/admin/movie/delete/:id',movie.delete);    
}