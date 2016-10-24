//引入alidayu组件
var Alidayu=require('alidayujs');

exports.send=function(req,res){
    var config = {
        app_key: '23480557',
        secret: '557e270b07fea683368fd69caf5927c9' 
    };
    var alidayu = new Alidayu(config);
    
    //将用户手机号存储到session中以便后期调用
    req.session.phone=req.body.phone;
    //配置短信选项
    var options = {
        sms_free_sign_name: '学疯测试',
        sms_param: {
            code: req.session.vcode,
        },
        rec_num: req.body.phone, 
        sms_template_code: 'SMS_18210077',
    };
    //发送短信
    alidayu.sms(options,function(result){
        if(result.error_response){
            //如果短息发送失败则打印失败信息并返回
            console.log(result);
            res.json({'isError':true,'message':'短信发送失败，请稍后再试！'});
        }else{
            //如果短信发送成功则返回提示信息
            res.json({'isError':false,'message':'短信发送成功！','type':'phone','val':req.body.phone});
        }
    });
}
