//引入alidayu组件
var Alidayu=require('alidayujs');
//应用密匙 见：http://www.alidayu.com/help?spm=a3142.7802526.1.24.iEB4Yc&_t=1#create 
//
exports.send=function(req,res){
    var config = {
        app_key: '23480557',
        secret: '557e270b07fea683368fd69caf5927c9' 
    };
    var alidayu = new Alidayu(config);
    //参数 见：http://open.taobao.com/doc2/apiDetail.htm?apiId=25450 
    var options = {
        sms_free_sign_name: '学疯测试',
        sms_param: {
            code: '1234',
        },
        rec_num: '17076467717', 
        sms_template_code: 'SMS_18210077',
    };
    //发送短信
    alidayu.sms(options,function(err,result){
        if(err){
            console.log('ERROR'+err);
        }
        console.log(result);
    });
}
