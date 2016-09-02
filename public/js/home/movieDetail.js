$(function(){
    /*----ajax请求展示当前电影下的所有评论----*/
    $("#viewComment").click(function(){
        var panel;
        $.get('/comment',{key:'movie',val:''},function(data,status){
            for(var i=0;i<data.length;i++){
                panel='<li class="panel panel-default"><div class="panel-heading">'+data[i].from+'</div><div class="panel-body">'+data[i].content+'</div><div class="panel-footer"><button type="button" class="reply btn btn-default btn-xs">reply</button></div></li>'
            }
        })
    });
    
    //展示和收起回复表单
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
                if(data.isError){
                    $("#warning").text(data.message).removeClass('hidden');
                }else{
                    $('#warning').addClass('hidden');
                    $("#success").text(data.message).removeClass('hidden');
                    setTimeout(function(){window.location.reload();},1000);
                }
            },
        });
    });
})