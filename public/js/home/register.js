$(function(){
    //异步提交用户输入的手机号或邮箱
    $(".checkunique").click(function(){
        //通过属性判断用户是通过哪种方式进行注册的
        var way=$(this).attr('data-way');
        var pe=$("#"+way).val();
        var captcha=$(this).parentsUntil(".tab-content").find('input[name=captcha]').val();
        if(pe==''){
            alert('请输入手机或者邮箱！');
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
            $(this).parentsUntil(".tab-content").ajaxSubmit({
                type:'post',
                url:url,
                success:function(data){
                    if(data.isError){
                        $("#warning").text(data.message).removeClass('hidden');
                    }else{
                        $("#warning").addClass('hidden');
                        $(".checkunique").attr('disabled','disabled');
                        $("#success").text(data.message).removeClass('hidden');
                        //setTimeout(function(){window.location.href="/";},2000);
                    }
                },
            })
        }
    })
})