$(function(){
    //异步提交用户输入的手机号
    $("#checkunique").click(function(){
        var phone=$("#phone").val();
        var captcha=$("#captcha").val();
        if(phone==''){
            alert('请输入手机号！');
            $("#phone").focus();
        }else if(captcha==''){
            alert('请输入验证码！');
            $("#captcha").focus();
        }else{
            //$()
        }
    })
})