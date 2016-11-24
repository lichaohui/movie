$(function(){
    //jquery.validate验证手机验证登录表单
    $('#phoneform').validate({
        rules: {
			phone: {
                required:true,
                phone:true,
            },
            captcha:'required',
		},
		messages: {
            phone:{
                required:'请输入手机号',
                phone:'请输入正确格式的手机号'
            },
            captcha:'请输入验证码',
		},
        submitHandler:function(form) {
            var oldTxt=$('#sub').text();
            $('#sub').text("请稍后..").attr('disabled',true);
            $(form).ajaxSubmit({
                success:function(data){
                    if(data.isError){
                        //如果有错误返回则显示错误信息并将按钮置为可点击状态
                        $("#warning-phone").text(data.message).removeClass('hidden');
                        $("#sub").text('下一步 >>').attr("disabled",false);
                    }else{
                        //提交成功后进入下一个验证登录页面
                        setTimeout(function(){window.location.href="/vlogin1?type="+data.type+'&val='+data.val;},1000);
                    }
                }
            });
        }
    });
    
    //jquery.validate验证邮箱验证登录表单
    $('#emailform').validate({
        rules: {
			email: {
                required:true,
                email:true,
            },
            captcha:'required',
		},
		messages: {
            email:{
                required:'请输入邮箱',
                phone:'请输入正确格式的邮箱'
            },
            captcha:'请输入验证码',
		},
        submitHandler:function(form) {
            var oldTxt=$('#sub1').text();
            $('#sub1').text("请稍后..").attr('disabled',true);
            $(form).ajaxSubmit({
                success:function(data){
                    if(data.isError){
                        //如果有错误返回则显示错误信息并将按钮置为可点击状态
                        $("#warning-email").text(data.message).removeClass('hidden');
                        $("#sub1").text('下一步 >>').attr("disabled",false);
                    }else{
                        //提交成功后进入下一个验证登录页面
                        setTimeout(function(){window.location.href="/vlogin1?type="+data.type+'&val='+data.val;},1000);
                    }
                }
            });
        }
    });
})