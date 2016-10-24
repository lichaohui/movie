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
        from: '学疯网', // 发送者  
        to: req.body.email, // 接受者,可以同时发送多个,以逗号隔开  
        subject: '学疯网会员验证', // 标题  
        text: '您好，您的验证码是'+req.session.vcode+'，请及时验证', // 文本  
    };  
    transporter.sendMail(mailOptions,function(err,info){  
        if(err){  
            console.log(err);
            res.json({'isError':true,'message':'邮件发送失败，请稍后再试！'});
        }else{
            //如果短信发送成功则返回提示信息
            res.json({'isError':false,'message':'邮箱验证码发送成功！','type':'email','val':req.body.email});
        }  
    });  
}
