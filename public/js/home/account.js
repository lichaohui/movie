$(function(){
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
				phone:'请输入正确格式的邮箱'
			},
			vcode: "请输入邮箱动态验证码",
		},
    });
})