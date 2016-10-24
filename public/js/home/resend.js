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
        //拼装一下url
        var url='re'+type+'code';
        //组装下要发送的数据
        var postdata="{'"+type+"':'"+val+"'}";
        //如果是手机注册的则通过ajax重发手机短信验证码
        $.post(url,eval('('+postdata+')'),function(data,status){
            if(data.isError){
                //如果短信重发失败则显示返回的提示信息
                $("#warning").text(data.message).removeClass('hidden');
            }else{
                //如果短信重发成功则调用countDown()函数进行重新倒计时
                countDown(60);
            }
        })
    })
})