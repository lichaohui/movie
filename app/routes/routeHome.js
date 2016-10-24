/*----前台路由----*/

//引入前台控制器文件
var index=require('../controllers/home/index');
var video=require('../controllers/home/video');
var user=require('../controllers/home/user');
var comment=require('../controllers/home/comment');
var reply=require('../controllers/home/reply');
var captcha=require('../controllers/home/captcha');
var alidayu=require('../controllers/home/alidayu');
var vcode=require('../controllers/home/vcode');
var emailer=require('../controllers/home/emailer');

module.exports=function(app){
    /*
     * 设置“/”前台首页路由
     * 执行index控制器中的index方法
     */
    app.get('/',index.index);
    
    //前台视频列表页路由
    app.get('/video',video.index);
    //设置前台视频详情页路由
    app.get('/video/detail/:id',video.show);
    
    //生成图片验证码的路由
    app.get('/captcha',captcha.index);
    //展示用户注册界面的路由
    app.get('/register',user.register);
    //向用户发送手机短信验证码的路由
    app.post('/phonecode',captcha.verify,user.unique,alidayu.send);
    //重新发送手机短信验证码的路由
    app.post('/rephonecode',alidayu.send);
    //测试邮箱发送
    app.get('/emailtest',emailer.send);
    //向用户发送邮箱验证码的路由
    app.post('/emailcode',captcha.verify,user.unique);
    //展示用户第二个注册界面的路由
    app.get('/register1',user.register1);
    //实现用户注册功能的路由
    app.post('/doregister',vcode.verify,user.doRegister);
    //用户登录的路由
    app.get('/login',user.login);
    //实现用户登录功能的路由
    app.post('/dologin',user.doLogin);
    //用户登出的路由
    app.get('/logout',user.logout);  
    //展示用户主页的路由
    app.get('/user/:id',user.index);
    
    //展示某个用户所有评论的路由
    app.get('/comments',comment.index);  
    //展示某个url或者用户下更多评论的路由
    app.get('/comment/more',comment.viewMore);
    //发表评论的路由
    app.post('/comment/store',comment.store);
    //删除评论及该条评论下所有回复的路由
    app.delete('/comment/:id',comment.delete);
    
    //获取某个评论下回复的路由
    app.get('/reply/index',reply.index);
    //获取某个评论下更多回复的路由
    app.get('/reply/more',reply.viewMore);
    //提交回复的路由
    app.post('/reply/store',reply.store);
}
