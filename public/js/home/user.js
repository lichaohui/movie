$(function(){
    /*----处理用户登录注册的js脚本----*/
    
    /*----点击提交按钮时候通过jquery.form.js插件异步提交表单----*/
    $("#sub").click(function(){
        if($("#name").val==''||$("#password").val==''){
            $("#warning").text('用户名和密码都不能为空').removeClass('hidden');
        }else{
            var url=$("#form").attr('action');
            $("#form").ajaxSubmit({
                type:'post',
                url:url,
                success:function(data){
                    if(data.isError){
                        $("#warning").text(data.message).removeClass('hidden');
                    }else{
                        $("#warning").addClass('hidden');
                        $("#sub").attr('disabled','disabled');
                        $("#success").text(data.message).removeClass('hidden');
                        setTimeout(function(){window.location.href="/";},2000);
                    }
                },
            });
        }
    });
})