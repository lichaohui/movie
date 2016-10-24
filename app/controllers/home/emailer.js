//引入nodemailer组件
var nodemailer = require("nodemailer");

exports.send=function(req,res){
    var transporter = nodemailer.createTransport({
        //服务商
        service: '163',
        //认证配置
        auth: {  
            //使用哪个账号来发送邮件
            user: '17076467717@163.com',
            /*
             * 授权码
             * 在邮箱中设置获得，并非邮箱的登录密码
             */
            pass: 'misswife19900519' 
        }  
    });
    var mailOptions = {  
        from: '17076467717@163.com', // 发送者  
        to: '158109640@qq.com', // 接受者,可以同时发送多个,以逗号隔开  
        subject: '学疯网会员验证', // 标题  
        //text: 'Hello world', // 文本  
        html: '<h2>nodemailer基本使用:</h2><h3>' 
    };  
    transporter.sendMail(mailOptions, function (err, info) {  
        if (err) {  
            console.log(err);  
            return;  
        }else{
            console.log('发送成功');  
        }  
    });  
}
