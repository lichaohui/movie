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
                $("#resend").text(time+'秒后可重发');
            }
        },1000);
    }
    //页面初始化的时候就加载倒计时函数
    countDown(10);
})