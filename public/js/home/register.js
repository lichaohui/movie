$(function(){
    //异步提交用户输入的手机号或邮箱
    $(".checkunique").click(function(){
        //通过属性判断用户是通过哪种方式进行注册的
        var way=$(this).attr('data-way');
        var pe=$("#"+way).val();
        var captcha=$(this).parentsUntil(".tab-content").find('input[name=captcha]').val();
        //alert('is'+way);
        if(('is'+way)(pe)==false){
            alert('请输入正确的手机或者邮箱！');
            $("#"+way).focus();
        }else if(captcha==''){
            alert('请输入验证码！');
            $(this).parentsUntil(".tab-content").find('input[name=captcha]').focus();
        }else{
            /*
             * 如果用户输入的数据都合法
             * 则进行表单的异步提交
             */
            var url=$(this).parents("form").attr('action');
            $(this).parents("form").ajaxSubmit({
                type:'post',
                url:url,
                success:function(data){
                    if(data.isError){
                        $("#warning").text(data.message).removeClass('hidden');
                    }else{
                        setTimeout(function(){window.location.href="/register1";},1000);
                    }
                },
            })
        }
    })
})