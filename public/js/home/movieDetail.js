$(function(){
    /*----ajax请求展示当前电影下的所有评论,暂时还没用到----*/
    /*$("#viewMoreComment").click(function(){
        $("#comments").empty();
        var panel;
        var movieId=$("#movieId").val();
        $.get('/comment',{key:'movie',val:movieId},function(data,status){
            for(var i=0;i<data.length;i++){
                panel='<li class="panel panel-default"><div class="panel-heading">'+data[i].from+'</div><div class="panel-body">'+data[i].content+'</div><div class="panel-footer"><button type="button" class="reply btn btn-default btn-xs">reply</button><br><br><form action="/comment/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value='+data[i].from+'><input type="hidden" name="toWho" value='+data[i].toWho+'><input type="hidden" name="toWhichComment" value='+data[i].toWhichComment+'><input type="hidden" name="movie" value='+data[i].movie+'><div class="form-group"><textarea class="form-control" name="content" placeholder="Please input your comment here"></textarea></div><div class="form-group">'+user.name+'<button type="submit" class="btn btn-default btn-xs">submit</button></div></form></div></li>';
                $("#comments").append(panel);
            }
        })
    });*/
    
    //展示和收起回复表单
    $(document).on("click",".reply",function(){
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
    
    //异步发表评论
    $("#subComment").click(function(){
        var con=$("#content").val();
        if(con==""){
            alert('请先填写评论内容！');
            $("#content").focus();
        }else{
            $("#commentForm").ajaxSubmit({
                type:'post',
                url:'/comment/store',
                success:function(data){
                    if(data.isError){
                        alert(data.message);
                    }else{
                        alert(user.name);
                        var panel='<li class="panel panel-default"><div class="panel-heading">'+data.comment.from+'</div><div class="panel-body">'+data.comment.content+'</div><div class="panel-footer"><button type="button" class="reply btn btn-default btn-xs">reply</button><form action="/comment/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value='+data.comment.from+'><input type="hidden" name="movie" value='+data.comment.movie+'><input type="hidden" name="toWho" value='+data.comment.from+'><input type="hidden" name="toWhichComment" value='+data.comment._id+'><div class="form-group"><textarea class="form-control" name="content" placeholder="Please input your comment here"></textarea></div><div class="form-group">'+data.comment.from+'<button type="submit" class="btn btn-default btn-xs">submit</button></div></form></div></li>';
                        $("#comments").prepend(panel);
                    }
                }
            })
        }
    });
})