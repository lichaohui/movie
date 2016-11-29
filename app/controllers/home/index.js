/*
 * 前台首页控制器
 * 可以通过exports.方法名 的方式定义控制器中的方法
 * 然后路由文件中引入了该控制器后就可以使用这些方法了
 */
exports.index=function(req,res){
    /*
     * 通过render方法将jade模板文件编译后返回给前台
     * render()函数有两个参数：
     * 第一个参数是要编译的jade模板文件的路径
     * 第二个参数是附带传递给模板文件的变量，
     * 传递的变量用一个json格式表示
     */
    res.render('home/index',{'title':'home'});
}
