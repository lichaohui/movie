$(function(){
    //jquery.validate验证表单
    $('#form').validate({
        rules: {
			vcode: 'required',
            password:'required',
            passwordrepeat:{
                required:true,
                'equalTo':'#password'
            }
		},
		messages: {
            vcode:'请输入动态验证码',
            password:'请输入新密码',
            passwordrepeat:{
                required:'请确认新密码',
                equalTo:'两次输入的新密码不一致'
            }
		},
        submitHandler:function(form) {
            var oldTxt=$('#sub').text();
            $('#sub').text("请稍后..").attr('disabled',true);
            $(form).ajaxSubmit({
                success:function(data){
                    if(data.isError){
                        //如果有错误则显示返回的错误信息并将提交按钮重新设置可点击的状态
                        $("#warning").text(data.message).removeClass('hidden');
                        $("#sub").text(oldTxt).attr('disabled',false);
                    }else{
                        //如果成功则显示成功信息并进行页面的跳转
                        $("#warning").addClass('hidden');
                        $("#success").text(data.message).removeClass('hidden');
                        setTimeout(function(){window.location.href="/";},2000);
                    }
                }
            });
        }
    });
})