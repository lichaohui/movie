//引入nodemailer组件
var nodemailer = require("nodemailer");

exports.send=function(req,res){
    // 开启一个 SMTP 连接池
    var smtpTransport = nodemailer.createTransport("SMTP",{
      host: "smtp.163.com", // 主机
      secureConnection: true, // 使用 SSL
      port: 465, // SMTP 端口
      auth: {
        user: "17076467717@163.com", // 账号
        pass: "misswife19900214" // 密码
      }
    });
    // 设置邮件内容
    var mailOptions = {
      from: "学疯网", // 发件地址
      to: "158109640@qq.com", // 收件列表
      subject: "学疯网会员验证", // 标题
      html: "<b>thanks a for visiting!</b> 世界，你好！" // html 内容
    }
    // 发送邮件
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
      }else{
        console.log("Message sent: " + response.message);
      }
      smtpTransport.close(); // 如果没用，关闭连接池
    });
}
