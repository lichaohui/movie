//引入后台控制器文件
var movie=require('../controllers/admin/movie');
var user=require('../controllers/admin/user');

module.exports=function(app){
    /*
     * 定义一个中间件，
     * 所有路由被执行之前都会先执行这个中间件
     */
    app.use(function(req,res,next){
        /*
         * 将session信息存入本地的变量中
         * 这样在模板张就可以使用这些变量了
         */
        app.locals.user=req.session.user; 
        next();
    });

    /*----后台路由----*/
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