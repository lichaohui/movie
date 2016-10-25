$(function(){
    //异步提交用户输入的手机号或邮箱
    $(".checkunique").click(function(){
        //通过属性判断用户是通过哪种方式进行注册的
        var way=$(this).attr('data-way');
        var pe=$("#"+way).val();
        var captcha=$(this).parentsUntil(".tab-content").find('input[name=captcha]').val();
        /*
         * 通过字符串is+变量way的方式组装一个字符串，
         * 该字符串就是验check.js文件中验证各个格式的函数名
         * 然后通过eval方法将表示函数名的字符串动态解析成js函数来执行
         * 就实现了动态判断用户输入的是那种类型的数据来调用不同的函数进行验证的功能
         */
        if(eval('is'+way)(pe)==false){
            $("#"+way).focus();
        }else if(captcha==''){
            alert('请输入验证码！');
            $(this).parentsUntil(".tab-content").find('input[name=captcha]').focus();
        }else{
            /*
             * 如果用户输入的数据都合法
             * 则进行表单的异步提交
             * 并将按钮置为不可点击的状态
             */
            $(this).text('请稍后...').attr('disabled',true);
            var url=$(this).parents("form").attr('action');
            $(this).parents("form").ajaxSubmit({
                type:'post',
                url:url,
                success:function(data){
                    if(data.isError){
                        //如果有错误返回则显示错误信息并将按钮置为可点击状态
                        $("#warning-"+way).text(data.message).removeClass('hidden');
                        $(".checkunique").text('下一步 >>').attr("disabled",false);
                    }else{
                        //提交成功后进入下一个注册页面
                        setTimeout(function(){window.location.href="/register1?type="+data.type+'&val='+data.val;},1000);
                    }
                },
            })
        }
    })
})