//重新发送短信/邮箱验证码的js
$(function(){
    //倒计时函数
    function countDown(time){
        var t=window.setInterval(function(){
            time--;
            if(time==0){
                $("#resend").attr("disabled",false).text('重新发送');
                window.clearInterval(t);
            }else{
                $("#resend").attr('disabled',true).text(time+'秒后可重发');
            }
        },1000);
    }
    //页面初始化的时候就加载倒计时函数
    countDown(60);
    
    //点击重新发送按钮重新发送短信/邮箱验证码
    $("#resend").click(function(){
        var type=$(this).attr('data-type');
        var val=$(this).attr('data-val');
        var url;
        var postdata;
        if(type=='phone'){
            url='rephonecode';
            postdata={'phone':val};
        }else if(type=='email'){
            url='reemailcode';
            postdata={'email':val};
        }
        //如果是手机注册的则通过ajax重发手机短信验证码
        $.post(url,postdata,function(data,status){
            if(data.isError){
                //如果短信重发失败则弹出返回的提示信息
                alert(data.message);
            }else{
                //如果短信重发成功则调用countDown()函数进行重新倒计时
                countDown(60);
            }
        })
    })
})