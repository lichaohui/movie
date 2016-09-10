//查看评论下更多回复的js脚本
$(function(){
    //加载某条评论下更多回复的方法
    $('#morereply').click(function(){
        var cid=$(this).attr('data-cid');
        var from=$("#replies-list .list-group-item").length;
        $.get('/reply/more',{'cid':cid,'from':from,'limit':3},function(data,status){
            if(data.isError){
                alert(data.message);
            }else{
                if(data.replies.length==0){
                    alert('已经到底了');
                    $('#morereply').attr('disabled',true);
                }else{
                    //判断用户是否登录
                    var isLogin=$('#isLogin').val();
                    if(isLogin=='yes'){
                        for(var i=0;i<data.replies.length;i++){
                            li='<li class="list-group-item"><h5 class="list-group-item-heading"><b>'+data.replies[i].from.name+'</b> replied to <b>'+data.replies[i].toWho.name+'</b><time class="pull-right">'+data.replies[i].meta.created_at+'</time></h5><p class="list-group-item-text">'+data.replies[i].content+'</p><button type="button" class="reply btn btn-default btn-xs" >reply '+data.replies[i].from.name+'</button><form action="/reply/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value=""><input type="hidden" name="toWho" value='+data.replies[i].from._id+'><input type="hidden" name="toWhichComment" value='+cid+'><input type="hidden" name="toWhichReply" value='+data.replies[i]._id+'><div class="form-group"><textarea name="content" placeholder="Please input your comment here" required="" class="form-control"></textarea></div><b></b> <button type="button" class="replyBtn btn btn-primary btn-xs" isToReply="yes">submit</button></form></li>';
                            $("#replies-list").append(li);
                        }
                    }else{
                        for(var i=0;i<data.replies.length;i++){
                            li='<li class="list-group-item"><h5 class="list-group-item-heading"><b>'+data.replies[i].from.name+'</b> replied to <b>'+data.replies[i].toWho.name+'</b><time class="pull-right">'+data.replies[i].meta.created_at+'</time></h5><p class="list-group-item-text">'+data.replies[i].content+'</p></li>';
                            $("#replies-list").append(li);
                        }
                    }
                    $("#hiddenreply").removeClass('hidden');
                }
            }
        });
    });
    
    //收起回复
    $("#hiddenreply").click(function(){
        $("#replies-list .list-group-item:gt(2)").remove();
        $(this).addClass('hidden');
        $("#morereply").attr("disabled",false);
    });
})