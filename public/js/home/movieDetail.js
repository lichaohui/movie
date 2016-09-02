$(function(){
    $('.reply').click(function(){
        if($(this).siblings('.replyForm').hasClass('hidden')){
            $(this).siblings('.replyForm').removeClass('hidden');
        }else{
            $(this).siblings('.replyForm').addClass('hidden');
        }
    });
    
    //异步提交登录表单
    $("#login").click(function(){
        var url=$("#form").attr('action');
        $("#form").ajaxSubmit({
            type:'post',
            url:url,
            success:function(data){
                alert(data);
                setTimeout(function(){window.location.reload();},1000);
            },
        });
    });
})