$(function(){
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
			ecode: "请输入邮箱动态验证码",
		},
    });
})