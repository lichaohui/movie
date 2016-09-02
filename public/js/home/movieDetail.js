$(function(){
    /*----ajax请求展示当前电影下的所有评论----*/
    $("#viewComment").click(function(){
        var panel;
        var movieId=$("#movieId").val();
        $.get('/comment',{key:'movie',val:movieId},function(data,status){
            for(var i=0;i<data.length;i++){
                panel='<li class="panel panel-default"><div class="panel-heading">'+data[i].from+'</div><div class="panel-body">'+data[i].content+'</div><div class="panel-footer"><button type="button" class="reply btn btn-default btn-xs">reply</button><form action="/comment/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value='+data[i].from+'><input type="hidden" name="toWho" value='+data[i].toWho+'><input type="hidden" name="toWhichComment" value='+data[i].toWhichComment+'><input type="hidden" name="movie" value='+data[i].movie+'><div class="form-group"><textarea class="form-control" name="content" placeholder="Please input your comment here"></div><div class="form-group"></div>'+user.name+'<button type="submit" class="btn btn-default btn-xs">submit</button></form></div></li>';
                $("#comments").append(panel);
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