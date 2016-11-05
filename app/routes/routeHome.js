/*----前台路由----*/

//引入前台控制器文件
var index=require('../controllers/home/index');
var video=require('../controllers/home/video');
var user=require('../controllers/home/user');
var usermsg=require('../controllers/home/usermsg');
var comment=require('../controllers/home/comment');
var reply=require('../controllers/home/reply');
var captcha=require('../controllers/home/captcha');
var alidayu=require('../controllers/home/alidayu');
var vcode=require('../controllers/home/vcode');
var emailer=require('../controllers/home/emailer');
var encrypt=require('../controllers/common/encrypt');
var alioss=require('../controllers/common/alioss');

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
    app.post('/phonecode',captcha.verify,user.check,vcode.index,alidayu.send);
    //重新发送手机短信验证码的路由
    app.post('/rephonecode',vcode.index,alidayu.send);
    //向用户发送邮箱验证码的路由
    app.post('/emailcode',captcha.verify,user.check,vcode.index,emailer.send);
    //重新发送邮件验证码的路由
    app.post('/reemailcode',vcode.index,emailer.send);
    //展示用户第二个注册界面的路由
    app.get('/register1',user.register1);
    //实现用户注册功能的路由
    app.post('/doregister',vcode.verify,user.comparepass,user.check,user.doRegister);
    //展示用户登录界面的路由
    app.get('/login',user.login);
    //显示邮箱/手机验证登录界面的路由
    app.get('/vlogin',user.vlogin);
    app.get('/vlogin1',user.vlogin1);
    //实现用户登录功能的路由
    app.post('/dologin',user.doLogin);
    //实现用户验证登录并重置密码功能的路由
    app.post('/dovlogin',vcode.verify,user.comparepass,encrypt.index,user.dovlogin);
    //用户登出的路由
    app.get('/logout',user.logout);  
    //展示用户主页的路由
    app.get('/user/:id',user.index);
    //展现用户基本信息页面的路由
    app.get('/usermsg',usermsg.index);
    //编辑某个用户基本信息时获取该用户信息的路由
    app.get('/usermsg/:uid/edit',usermsg.edit);
    //添加某个用户基本信息的路由
    app.post('/usermsg',usermsg.store);
    //更新某个用户基本信息的路由
    app.put('/usermsg/:uid',usermsg.update);
    //从oss删除用户头像资源的路由
    app.delete('/avatar/delete',alioss.delete);
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
