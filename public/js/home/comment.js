$(function(){
    //查看回复列表
    $('.viewreply').click(function(){
        $("#totalReply").attr('id','');
        $(this).attr('id','totalReply');
        var cid=$(this).attr('data-cid');
        $("#replies-list").empty();
        $.get('/reply/index',{"cid":cid},function(data,status){
            if(data.isError){
                alert(data.message);
            }else{
                var li;
                if(data.replies.length==0){
                    //如果没有回复则显示一个no reply
                    li='<li class="list-group-item">No reply!</li>';
                    $("#replies-list").append(li);
                }else{
                    for(var i=0;i<data.replies.length;i++){
                        li='<li class="list-group-item"><h5 class="list-group-item-heading"><b>'+data.replies[i].from.name+'</b> replied to '+data.replies[i].toWho.name+'<time class="pull-right">'+data.replies[i].meta.created_at+'</time></h5><p class="list-group-item-text">'+data.replies[i].content+'</p><button type="button" class="reply btn btn-default btn-xs">reply </button><form action="/reply/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value=""><input type="hidden" name="toWho" value='+data.replies[i].from._id+'><input type="hidden" name="toWhichComment" value='+cid+'><input type="hidden" name="toWhichReply" value='+data.replies[i]._id+'><div class="form-group"><textarea name="content" placeholder="Please input your comment here" required="" class="form-control"></textarea></div><b></b> <button type="button" class="replyBtn btn btn-primary btn-xs" isToReply="yes">submit</button></form></li>';
                        $("#replies-list").append(li);
                    }
                }
            }
        });
    });
    
    ////展示和收起回复表单
    $(document).on("click",".reply",function(){
        var userid=$("#userid").val();
        $("[name='from']").val(userid);
        if($(this).siblings('.replyForm').hasClass('hidden')){
            $(this).siblings('.replyForm').removeClass('hidden');
        }else{
            $(this).siblings('.replyForm').addClass('hidden');
        }
    }); 
    
    //异步提交回复
    $(document).on('click',".replyBtn",function(){
        var con=$(this).parent('.replyForm').find("[name='content']").val();
        if(con==""){
            alert("请先填写回复内容！");
            $(this).parent('.replyForm').find("[name='content']").focus();
        }else{
            if($(this).attr('isToReply')=="yes"){
                $(this).parent('.replyForm').ajaxSubmit({
                    type:'post',
                    url:'/reply/store',
                    success:function(data){
                        var rep='<li class="list-group-item"><h5 class="list-group-item-heading"><b>'+data.reply.from.name+'</b> replied to <b>'+data.reply.toWho.name+'</b><time class="pull-right">'+date2str(new Date(), "yyyy-MM-d h:m:s")+'</time></h5><p class="list-group-item-text">'+data.reply.content+'</p><button type="button" class="reply btn btn-default btn-xs">reply '+data.reply.from.name+'</button><form action="/reply/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value=""><input type="hidden" name="toWho" value='+data.reply.from._id+'><input type="hidden" name="toWhichComment" value='+data.reply.toWhichComment+'><input type="hidden" name="toWhichReply" value='+data.reply.toWhichReply+'><div class="form-group"><textarea name="content" placeholder="Please input your comment here" required="" class="form-control"></textarea></div><button type="button" class="replyBtn btn btn-primary btn-xs" istoreply="yes">submit</button></form></li>';
                        $("#replies-list").prepend(rep);
                        $("#totalReply").text('view replies ('+data.totalReply+')');
                    }
                })
            }else{
                $("#replyFlag").attr('id','');
                $(this).parentsUntil('#comments').find('.panel-body').attr('id','replyFlag');
                $("#totalReply").attr('id','');
                $(this).parentsUntil(".panel").find('.viewreply').attr('id','totalReply');
                $(this).parent('.replyForm').ajaxSubmit({
                    type:'post',
                    url:'/reply/store',
                    success:function(data){
                        var rep='<ul class="list-group"><li class="list-group-item"><h5 class="list-group-item-heading"><b>'+data.reply.from.name+' </b>replied to<b> '+data.reply.toWho.name+'</b><time class="pull-right">'+date2str(new Date(), "yyyy-MM-d h:m:s")+'</time></h5><p class="list-group-item-text">'+data.reply.content+'</p></li></ul>';
                        $("#replyFlag").append(rep);
                        $("#totalReply").text('view replies ('+data.totalReply+')');
                    }
                })
            }
        }           
    });
    
    //删除评论及评论下的所有回复
    $(".del").click(function(){
        if(confirm('确定要删除该条评论及评论下的所有回复吗？')){
            var id=$(this).attr('data-cid');
            $.ajax({
                url:'/comment/'+id,
                type:'delete',
                success:function(data,status){
                    alert(data.message);
                    location.reload();
                }
            })
        }
    });
})