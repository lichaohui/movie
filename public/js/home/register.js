$(function(){
    //异步提交用户输入的手机号或邮箱
    $(".checkunique").click(function(){
        var way=$(this).attr('data-way');
        var pe=$("#"+way).val();
        var captcha=$(this).parentsUntil("form").find('input[name=captcha]').val();
        if(pe==''){
            alert('请输入手机或者邮箱！');
            $("#"+way).focus();
        }else if(captcha==''){
            alert('请输入验证码！');
            $(this).parentsUntil("form").find('input[name=captcha]').focus();
        }else{
            //$()
        }
    })
})