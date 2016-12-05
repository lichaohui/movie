$(function(){
    //jquery.validate验证登录表单
    $('#form').validate({
        rules: {
			account: 'required',
			password: "required"
		},
		messages: {
			account:'请输入账号',
			password: "请输入密码",
		},
        submitHandler:function(form) {
            var oldTxt=$('#sub').text();
            $('#sub').text("请稍后..").attr('disabled',true);
            $(form).ajaxSubmit({
                type:'post',
                url:'/dologin',
                success:function(data){
                    if(data.isError){
                        //如果有错误则显示返回的错误信息并将提交按钮重新设置可点击的状态
                        $("#warning").text(data.message).removeClass('hidden');
                        $("#sub").text(oldTxt).attr('disabled',false);
                    }else{
                        //如果成功则显示成功信息并进行页面的跳转
                        $("#warning").addClass('hidden');
                        $("#success").text(data.message).removeClass('hidden');
                        setTimeout(function(){location.reload;},2000);
                    }
                }
            });
        }
    });
})