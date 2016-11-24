$(function(){
    //倒计时函数
    function countDown(dom,time){
        var t=window.setInterval(function(){
            time--;
            if(time==0){
                $(dom).attr("disabled",false).text('重新发送');
                window.clearInterval(t);
            }else{
                $(dom).attr('disabled',true).text(time+'秒后可重发');
            }
        },1000);
    }
    
    //jquery.validate验证邮箱表单
    $('#emailform').validate({
        rules: {
			email: {
				required: true,
				email:true
			},
			vcode: "required"
		},
		messages: {
			email:{
				required:'请输入邮箱',
				email:'请输入正确格式的邮箱'
			},
			vcode: "请输入邮箱验证码",
		},
        submitHandler:function(form) {
            $(form).ajaxSubmit({
                type:'post',
                url:'/account/phonemail',
                success:function(data){
                    if(data.isError){
                        $('#success').text('').addClass('hidden'); $('#warning').text(data.message).removeClass('hidden');
                    }else{
                        $('#warning').text('').addClass('hidden'); $('#success').text(data.message).removeClass('hidden');
                        setTimeout(function(){window.location.reload();},1000);
                    }
                }
            });
        }
    });
    //jquery.validate验证手机号表单
    $('#phoneform').validate({
        rules: {
			phone: {
				required: true,
				phone:true
			},
			vcode: "required"
		},
		messages: {
			phone:{
				required:'请输入手机号',
				phone:'请输入正确格式的手机号'
			},
			vcode: "请输入短信验证码",
		},
        submitHandler:function(form) {
            $(form).ajaxSubmit({
                type:'post',
                url:'/account/phonemail',
                success:function(data){
                    if(data.isError){
                        $('#success1').text('').addClass('hidden'); $('#warning1').text(data.message).removeClass('hidden');
                    }else{
                        $('#warning1').text('').addClass('hidden'); $('#success1').text(data.message).removeClass('hidden');
                        setTimeout(function(){window.location.reload();},1000);
                    }
                }
            });
        }
    });
    //jquery.validate验证修改密码表单
    $('#passform').validate({
        rules: {
			oldpass:"required",
			password: "required",
            passwordrepeat:{
                required:true,
                equalTo:'#password'
            }
		},
		messages: {
			oldpass:'请输入原始密码',
            password:'请输入新密码',
            passwordrepeat:{
                required:'请确认密码',
                equalTo:'两次输入的密码不一致'
            }
		},
        submitHandler:function(form) {
            $(form).ajaxSubmit({
                type:'post',
                url:'/account/upass',
                success:function(data){
                    if(data.isError){
                        $('#success2').text('').addClass('hidden'); $('#warning2').text(data.message).removeClass('hidden');
                    }else{
                        $('#warning2').text('').addClass('hidden'); $('#success2').text(data.message).removeClass('hidden');
                        setTimeout(function(){window.location.reload();},1000);
                    }
                }
            });
        }
    });
    //发送邮箱验证码
    $('#sendecode').click(function(){
        var sendecode=$(this);
        //先检验邮箱是否正确输入
        var email=$('#email').val();
        if(isemail(email)){
            //如果邮箱格式输入正确则发送邮箱验证啊
            $.post('/account/sendmail',{operating:'register',type:'email',email:email},function(data,status){
                if(data.isError){
                    $('#success').text('').addClass('hidden'); $('#warning').text(data.message).removeClass('hidden');
                }else{
                    $('#warning').text('').addClass('hidden'); $('#success').text(data.message).removeClass('hidden');
                    countDown(sendecode,60);
                }
            });
        }else{
            //否则提示用户输入正确格式的邮箱
            alert('请输入正确格式的邮箱');
            $('#email').focus();
        }
    });
    //发送短信验证码
    $('#sendpcode').click(function(){
        var sendpcode=$(this);
        //先检验邮箱是否正确输入
        var phone=$('#phone').val();
        if(isphone(phone)){
            //如果邮箱格式输入正确则发送邮箱验证啊
            $.post('/account/sendphone',{operating:'register',type:'phone',phone:phone},function(data,status){
                if(data.isError){
                    $('#success1').text('').addClass('hidden'); $('#warning1').text(data.message).removeClass('hidden');
                }else{
                    $('#warning1').text('').addClass('hidden'); $('#success1').text(data.message).removeClass('hidden');
                    countDown(sendpcode,60);
                }
            });
        }else{
            //否则提示用户输入正确格式的邮箱
            alert('请输入正确格式的手机号');
            $('#phone').focus();
        }
    });
})