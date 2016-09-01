//引入前台控制器文件
var index=require('../controllers/home/index');
var movie=require('../controllers/home/movie');
var user=require('../controllers/home/user');

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
    
    /*
     * 设置“/”前台首页路由
     * 执行index控制器中的index方法
     */
    app.get('/',index.index);

    //前台电影列表页路由
    app.get('/movie',movie.index);

    //设置前台电影详情页路由
    app.get('/movie/detail/:id',movie.show);

    //展示用户注册界面的路由
    app.get('/register',user.register);
    //实现用户注册功能的路由
    app.post('/doregister',user.doRegister);

    //用户登录的路由
    app.get('/login',user.login);
    //实现用户登录功能的路由
    app.post('/dologin',user.doLogin);
    
    //用户登出的路由
    app.get('/logout',user.logout);  
}