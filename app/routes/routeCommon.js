/*----前后台公共的路由----*/
var firstcate=require('../controllers/common/firstcate');
var secondcate=require('../controllers/common/secondcate');

module.exports=function(app){
    /*
     * 定义一个中间件，
     * 所有路由被执行之前都会先执行这个中间件
     */
    app.use(firstcate.query);
    app.use(function(req,res,next){
        /*
         * 将session信息存入本地的变量中
         * 这样在模板张就可以使用这些变量了
         */
        app.locals.user=req.session.user;
        app.locals.firstcates=req.session.firstcates;
        next();
    });
    
    app.get('*/video',secondcate.query);
    app.get('*/video',function(req,res,next){
        app.locals.firstcate=req.session.firstcate;
        app.locals.secondcates=req.session.secondcates;
        next();
    });
}