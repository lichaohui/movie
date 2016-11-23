$(function(){
    //jquery.validate验证邮箱表单
    $('#emailform').validate({
        rules: {
			email: {
				required: true,
				email:true
			},
			ecode: "required"
		},
		messages: {
			email:{
				required:'请输入邮箱',
				email:'请输入正确格式的邮箱'
			},
			ecode: "请输入邮箱验证码",
		},
    });
    //发送邮箱验证码
    $('#sendecode').click(function(){
        //先检验邮箱是否正确输入
        var email=$('#email').val();
        if(isemail(email)){
            //如果邮箱格式输入正确则发送邮箱验证啊
            $.post('/account/sendmail',{operating:'register',type:'email',email:email},function(data,status){
                if(data.isError){
                    $('#warning').text(data.message).removeClass('hidden');
                }else{
                   $('#warning').text('').addClass('hidden'); $('#success').text(data.message).removeClass('hidden');
                }
            });
        }else{
            //否则提示用户输入正确格式的邮箱
            alert('请输入正确格式的邮箱');
            $('#email').focus();
        }
    });
})