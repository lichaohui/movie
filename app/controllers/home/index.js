//前台首页控制器
exports.index=function(req,res){
    /*
     * 通过render方法将jade模板文件编译后返回给前台
     * render()函数有两个参数：
     * 第一个参数是要编译的jade模板文件的路径
     * 第二个参数是附带传递给模板文件的变量，
     * 传递的变量用一个json格式表示
     */
    //跳转到首页的时候把存储到session中的用户信息赋值给user变量
    res.render('home/index',{'title':'home'});
}
